import gen from "./gen";
import { Arg, Search, Updater } from "./types/arg";
import { DbFindOpts, DbOpts, FindOpts } from "./types/options";
import { Context } from "./types/types";
import { SearchOptions } from "./types/searchOpts";
import Data from "./types/data";
import {
    existsSync,
    mkdirSync,
    statSync,
    promises
} from "fs";
import FileCpu from "./types/fileCpu";
import { Transaction } from "./types/transactions";

/**
 * A class representing database actions on files.
 * @class
 */
class dbActionC {
    folder: string;
    options: DbOpts;
    fileCpu: FileCpu;

    /**
     * Creates a new instance of dbActionC.
     * @constructor
     * @param folder - The folder where database files are stored.
     * @param options - The options object.
     */
    constructor(folder: string, options: DbOpts, fileCpu: FileCpu) {
        this.folder = folder;
        this.options = {
            maxFileSize: 2 * 1024 * 1024, //2 MB
            ...options,
        };
        this.fileCpu = fileCpu;

        if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
    }

    _getCollectionPath(collection: string) {
        return this.folder + "/" + collection + "/";
    }

    /**
     * Get a list of available databases in the specified folder.
     */
    async getCollections() {
        const allCollections = await promises.readdir(this.folder, { recursive: true, withFileTypes: true });
        const collections = allCollections
            .filter(dirent => dirent.isDirectory())
            .map(dirent => {
                if (dirent.parentPath === this.folder) return dirent.name;
                return dirent.parentPath.replace(this.folder + "/", "") + "/" + dirent.name
            });

        return collections;
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection: string) {
        if (await this.issetCollection(collection)) return;
        const cpath = this._getCollectionPath(collection);
        await promises.mkdir(cpath, { recursive: true });
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection(collection: string) {
        const path = this._getCollectionPath(collection);
        try {
            await promises.access(path);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Add a new entry to the specified database.
     */
    async add(collection: string, arg: Arg, id_gen: boolean = true) {
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const file = cpath + await getLastFile(cpath, this.options.maxFileSize);

        if (id_gen) arg._id = arg._id || gen();
        await this.fileCpu.add(file, arg);
        return arg;
    }

    /**
     * Find entries in the specified database based on search criteria.
     */
    async find(collection: string, arg: Search, context: Context = {}, options: DbFindOpts = {}, findOpts: FindOpts = {}) {
        options.reverse = options.reverse || false;
        options.max = options.max || -1;

        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);
        if (options.reverse) files.reverse();
        let datas = [];

        let totalEntries = 0;

        for (let f of files) {
            let data = await this.fileCpu.find(cpath + f, arg, context, findOpts) as Data[];
            if (options.reverse) data.reverse();

            if (options.max !== -1) {
                if (totalEntries + data.length > options.max) {
                    let remainingEntries = options.max - totalEntries;
                    data = data.slice(0, remainingEntries);
                    totalEntries = options.max;
                } else {
                    totalEntries += data.length;
                }
            }

            datas = datas.concat(data);

            if (options.max !== -1 && totalEntries >= options.max) break;
        }
        return datas;
    }

    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne(collection: string, arg: SearchOptions, context: Context = {}, findOpts: FindOpts = {}) {
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);

        for (let f of files) {
            let data = await this.fileCpu.findOne(cpath + f, arg, context, findOpts) as Data;
            if (data) return data;
        }
        return null;
    }

    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    async update(collection: string, arg: Search, updater: Updater, context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.update.bind(this.fileCpu),
            false,
            arg,
            updater,
            context
        )
    }

    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne(collection: string, arg: Search, updater: Updater, context: Context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.update.bind(this.fileCpu),
            true,
            arg,
            updater,
            context
        )
    }

    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove(collection: string, arg: Search, context: Context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.remove.bind(this.fileCpu),
            false,
            arg,
            context
        )
    }

    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne(collection: string, arg: Search, context: Context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.remove.bind(this.fileCpu),
            true,
            arg,
            context
        );
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection: string) {
        await promises.rm(this.folder + "/" + collection, { recursive: true, force: true });
    }

    /**
     * Apply a series of transactions to a database collection.
     */
    async transaction(collection: string, transactions: Transaction[]) {
        await this.checkCollection(collection);
        const files = await getSortedFiles(this._getCollectionPath(collection));

        if (files.length == 0) {
            await promises.writeFile(this._getCollectionPath(collection) + "1.db", "");
            files.push("1.db");
        }

        for (const file of files) {
            await this.fileCpu.transactions(this._getCollectionPath(collection) + file, transactions);
        }

        console.log("Transactions applied successfully.");
        console.log("Files:", files);
        console.log("Transactions:", transactions);
    }
}

/**
 * Get the last file in the specified directory.
 */
async function getLastFile(path: string, maxFileSize: number = 1024 * 1024) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    const files = await getSortedFiles(path);

    if (files.length == 0) {
        await promises.writeFile(path + "/1.db", "");
        return "1.db";
    }

    const last = files[files.length - 1];
    const info = path + "/" + last;

    if (statSync(info).size < maxFileSize) return last;

    const num = parseInt(last.replace(".db", ""), 10) + 1;
    await promises.writeFile(path + "/" + num + ".db", "");
    return num + ".db";
}

/**
 * Get all files in a directory sorted by name.
 */
async function getSortedFiles(folder: string): Promise<string[]> {
    const files = await promises.readdir(folder, { withFileTypes: true });

    return files
        .filter(file => file.isFile() && !file.name.endsWith(".tmp"))
        .map(file => file.name)
        .filter(name => /^\d+\.db$/.test(name))
        .sort((a, b) => {
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            return numA - numB;
        });
}

async function operationUpdater(
    cpath: string,
    worker: (file: string, one: boolean, ...args: any[]) => Promise<boolean>,
    one: boolean,
    ...args: any[]
) {
    const files = await getSortedFiles(cpath);

    let update = false;
    for (const file of files) {
        const updated = await worker(cpath + file, one, ...args);
        update = update || updated;
        if (one && updated) break;
    }
    return update;
}

export default dbActionC;