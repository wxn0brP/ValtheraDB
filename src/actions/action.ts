import { existsSync, mkdirSync, promises, statSync } from "fs";
import dbActionBase from "../base/actions";
import gen from "../helpers/gen";
import Data from "../types/data";
import FileCpu from "../types/fileCpu";
import { DbOpts } from "../types/options";
import { VQuery } from "../types/query";

/**
 * A class representing database actions on files.
 * @class
 */
class dbActionC extends dbActionBase {
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
        super();
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
    async checkCollection({ collection }: VQuery) {
        if (await this.issetCollection(collection)) return;
        const cpath = this._getCollectionPath(collection);
        await promises.mkdir(cpath, { recursive: true });
        return true;
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection({ collection }: VQuery) {
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
    async add({ collection, data, id_gen = true }: VQuery) {
        await this.checkCollection(arguments[0]);
        const cpath = this._getCollectionPath(collection);
        const file = cpath + await getLastFile(cpath, this.options.maxFileSize);

        if (id_gen) data._id = data._id || gen();
        await this.fileCpu.add(file, data);
        return data;
    }

    /**
     * Find entries in the specified database based on search criteria.
     */
    async find({ collection, search, context = {}, dbFindOpts = {}, findOpts = {}}: VQuery) {
        dbFindOpts.reverse = dbFindOpts.reverse || false;
        dbFindOpts.max = dbFindOpts.max || -1;

        await this.checkCollection(arguments[0]);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);
        if (dbFindOpts.reverse) files.reverse();
        let datas = [];

        let totalEntries = 0;

        for (let f of files) {
            let data = await this.fileCpu.find(cpath + f, search, context, findOpts) as Data[];
            if (dbFindOpts.reverse) data.reverse();

            if (dbFindOpts.max !== -1) {
                if (totalEntries + data.length > dbFindOpts.max) {
                    let remainingEntries = dbFindOpts.max - totalEntries;
                    data = data.slice(0, remainingEntries);
                    totalEntries = dbFindOpts.max;
                } else {
                    totalEntries += data.length;
                }
            }

            datas = datas.concat(data);

            if (dbFindOpts.max !== -1 && totalEntries >= dbFindOpts.max) break;
        }
        return datas;
    }

    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne({ collection, search, context = {}, findOpts = {}}: VQuery) {
        await this.checkCollection(arguments[0]);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);

        for (let f of files) {
            let data = await this.fileCpu.findOne(cpath + f, search, context, findOpts) as Data;
            if (data) return data;
        }
        return null;
    }

    async *findStream({ collection, search, context = {}, findOpts = {}, limit = -1 }: VQuery): AsyncGenerator<any> {
        await this.checkCollection(arguments[0]);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);

        let count = 0;
        for (let f of files) {
            for await (const data of this.fileCpu.findStream(cpath + f, search, context, findOpts, limit)) {
                yield data;
                count++;
                if (limit !== -1 && count >= limit) {
                    return;
                }
            }
        }
    }

    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    async update({ collection, search, updater, context = {} }: VQuery) {
        await this.checkCollection(arguments[0]);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.update.bind(this.fileCpu),
            false,
            search,
            updater,
            context
        )
    }

    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne({ collection, search, updater, context = {} }: VQuery) {
        await this.checkCollection(arguments[0]);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.update.bind(this.fileCpu),
            true,
            search,
            updater,
            context
        )
    }

    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove({ collection, search, context = {} }: VQuery) {
        await this.checkCollection(arguments[0]);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.remove.bind(this.fileCpu),
            false,
            search,
            context
        )
    }

    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne({ collection, search, context = {} }: VQuery) {
        await this.checkCollection(arguments[0]);
        return await operationUpdater(
            this._getCollectionPath(collection),
            this.fileCpu.remove.bind(this.fileCpu),
            true,
            search,
            context
        );
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection({ collection }) {
        await promises.rm(this.folder + "/" + collection, { recursive: true, force: true });
        return true;
    }

    /**
     * Apply a series of transactions to a database collection.
     */
    async transaction({ collection, transaction }: VQuery) {
        await this.checkCollection(arguments[0]);
        const files = await getSortedFiles(this._getCollectionPath(collection));

        if (files.length == 0) {
            await promises.writeFile(this._getCollectionPath(collection) + "1.db", "");
            files.push("1.db");
        }

        for (const file of files) {
            await this.fileCpu.transactions(this._getCollectionPath(collection) + file, transaction);
        }

        console.log("Transactions applied successfully.");
        console.log("Files:", files);
        console.log("Transactions:", transaction);
        return true;
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