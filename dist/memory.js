import DataBase from "./database.js";
import CustomFileCpu from "./file/customFileCpu.js";
import genId from "./gen.js";
class MemoryAction {
    folder;
    options;
    fileCpu;
    memory;
    /**
     * Creates a new instance of dbActionC.
     * @constructor
     * @param folder - The folder where database files are stored.
     * @param options - The options object.
     */
    constructor() {
        this.memory = new Map();
        this.fileCpu = new CustomFileCpu(this._readMemory.bind(this), this._writeMemory.bind(this));
    }
    _readMemory(key) {
        if (!this.memory.has(key))
            return [];
        return this.memory.get(key);
    }
    _writeMemory(key, data) {
        this.memory.set(key, data);
    }
    _getCollectionPath(collection) {
        return this.folder + "/" + collection + "/";
    }
    /**
     * Get a list of available databases in the specified folder.
     */
    async getCollections() {
        const collections = Array.from(this.memory.keys());
        return collections;
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        if (this.issetCollection(collection))
            return;
        this.memory.set(collection, []);
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        return this.memory.has(collection);
    }
    /**
     * Add a new entry to the specified database.
     */
    async add(collection, arg, id_gen = true) {
        await this.checkCollection(collection);
        if (id_gen)
            arg._id = arg._id || genId();
        await this.fileCpu.add(collection, arg);
        return arg;
    }
    /**
     * Find entries in the specified database based on search criteria.
     */
    async find(collection, arg, context = {}, options = {}, findOpts = {}) {
        options.reverse = options.reverse || false;
        options.max = options.max || -1;
        await this.checkCollection(collection);
        let data = await this.fileCpu.find(collection, arg, context, findOpts);
        if (options.reverse)
            data.reverse();
        if (options.max !== -1 && data.length > options.max)
            data = data.slice(0, options.max);
        return data;
    }
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne(collection, arg, context = {}, findOpts = {}) {
        await this.checkCollection(collection);
        let data = await this.fileCpu.findOne(collection, arg, context, findOpts);
        return data || null;
    }
    /**
     * Find entries in the specified database based on search criteria and return a stream of results.
     */
    async *findStream(collection, arg, context, findOpts, limit) {
        throw new Error("Method not implemented.");
    }
    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    async update(collection, arg, updater, context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.update(collection, false, arg, updater, context);
    }
    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne(collection, arg, updater, context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.update(collection, true, arg, updater, context);
    }
    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove(collection, arg, context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.remove(collection, false, arg, context);
    }
    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne(collection, arg, context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.remove(collection, true, arg, context);
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection) {
        this.memory.delete(collection);
    }
    /**
     * Executes a list of transactions on the specified database collection.
     * @throws Error - Method not supported in memory.
     */
    transaction(collection, transactions) {
        throw new Error("Method not supported in memory.");
    }
}
export default class ValtheraMemory extends DataBase {
    constructor(...args) {
        super("", { dbAction: new MemoryAction() });
    }
}
export function createMemoryValthera(data) {
    const db = new ValtheraMemory();
    if (!data)
        return db;
    for (const collection of Object.keys(data)) {
        db.dbAction.memory.set(collection, data[collection]);
    }
    return db;
}
