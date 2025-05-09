import gen from "./gen.js";
import { existsSync, mkdirSync, statSync, promises } from "fs";
/**
 * A class representing database actions on files.
 * @class
 */
class dbActionC {
    folder;
    options;
    fileCpu;
    /**
     * Creates a new instance of dbActionC.
     * @constructor
     * @param folder - The folder where database files are stored.
     * @param options - The options object.
     */
    constructor(folder, options, fileCpu) {
        this.folder = folder;
        this.options = {
            maxFileSize: 2 * 1024 * 1024, //2 MB
            ...options,
        };
        this.fileCpu = fileCpu;
        if (!existsSync(folder))
            mkdirSync(folder, { recursive: true });
    }
    _getCollectionPath(collection) {
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
            if (dirent.parentPath === this.folder)
                return dirent.name;
            return dirent.parentPath.replace(this.folder + "/", "") + "/" + dirent.name;
        });
        return collections;
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        if (await this.issetCollection(collection))
            return;
        const cpath = this._getCollectionPath(collection);
        await promises.mkdir(cpath, { recursive: true });
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        const path = this._getCollectionPath(collection);
        try {
            await promises.access(path);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Add a new entry to the specified database.
     */
    async add(collection, arg, id_gen = true) {
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const file = cpath + await getLastFile(cpath, this.options.maxFileSize);
        if (id_gen)
            arg._id = arg._id || gen();
        await this.fileCpu.add(file, arg);
        return arg;
    }
    /**
     * Find entries in the specified database based on search criteria.
     */
    async find(collection, arg, context = {}, options = {}, findOpts = {}) {
        options.reverse = options.reverse || false;
        options.max = options.max || -1;
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);
        if (options.reverse)
            files.reverse();
        let datas = [];
        let totalEntries = 0;
        for (let f of files) {
            let data = await this.fileCpu.find(cpath + f, arg, context, findOpts);
            if (options.reverse)
                data.reverse();
            if (options.max !== -1) {
                if (totalEntries + data.length > options.max) {
                    let remainingEntries = options.max - totalEntries;
                    data = data.slice(0, remainingEntries);
                    totalEntries = options.max;
                }
                else {
                    totalEntries += data.length;
                }
            }
            datas = datas.concat(data);
            if (options.max !== -1 && totalEntries >= options.max)
                break;
        }
        return datas;
    }
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne(collection, arg, context = {}, findOpts = {}) {
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);
        for (let f of files) {
            let data = await this.fileCpu.findOne(cpath + f, arg, context, findOpts);
            if (data)
                return data;
        }
        return null;
    }
    async *findStream(collection, arg, context = {}, findOpts = {}, limit = -1) {
        await this.checkCollection(collection);
        const cpath = this._getCollectionPath(collection);
        const files = await getSortedFiles(cpath);
        let count = 0;
        for (let f of files) {
            for await (const data of this.fileCpu.findStream(cpath + f, arg, context, findOpts, limit)) {
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
    async update(collection, arg, updater, context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(this._getCollectionPath(collection), this.fileCpu.update.bind(this.fileCpu), false, arg, updater, context);
    }
    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne(collection, arg, updater, context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(this._getCollectionPath(collection), this.fileCpu.update.bind(this.fileCpu), true, arg, updater, context);
    }
    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove(collection, arg, context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(this._getCollectionPath(collection), this.fileCpu.remove.bind(this.fileCpu), false, arg, context);
    }
    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne(collection, arg, context = {}) {
        await this.checkCollection(collection);
        return await operationUpdater(this._getCollectionPath(collection), this.fileCpu.remove.bind(this.fileCpu), true, arg, context);
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection) {
        await promises.rm(this.folder + "/" + collection, { recursive: true, force: true });
    }
    /**
     * Apply a series of transactions to a database collection.
     */
    async transaction(collection, transactions) {
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
async function getLastFile(path, maxFileSize = 1024 * 1024) {
    if (!existsSync(path))
        mkdirSync(path, { recursive: true });
    const files = await getSortedFiles(path);
    if (files.length == 0) {
        await promises.writeFile(path + "/1.db", "");
        return "1.db";
    }
    const last = files[files.length - 1];
    const info = path + "/" + last;
    if (statSync(info).size < maxFileSize)
        return last;
    const num = parseInt(last.replace(".db", ""), 10) + 1;
    await promises.writeFile(path + "/" + num + ".db", "");
    return num + ".db";
}
/**
 * Get all files in a directory sorted by name.
 */
async function getSortedFiles(folder) {
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
async function operationUpdater(cpath, worker, one, ...args) {
    const files = await getSortedFiles(cpath);
    let update = false;
    for (const file of files) {
        const updated = await worker(cpath + file, one, ...args);
        update = update || updated;
        if (one && updated)
            break;
    }
    return update;
}
export default dbActionC;
