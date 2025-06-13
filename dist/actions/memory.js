import dbActionBase from "../base/actions.js";
import Valthera from "../db/valthera.js";
import CustomFileCpu from "../file/customFileCpu.js";
import genId from "../helpers/gen.js";
export class MemoryAction extends dbActionBase {
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
        super();
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
    async checkCollection({ collection }) {
        if (this.issetCollection(collection))
            return;
        this.memory.set(collection, []);
        return true;
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection({ collection }) {
        return this.memory.has(collection);
    }
    /**
     * Add a new entry to the specified database.
     */
    async add({ collection, data, id_gen = true }) {
        await this.checkCollection(arguments[0]);
        if (id_gen)
            data._id = data._id || genId();
        await this.fileCpu.add(collection, data);
        return data;
    }
    /**
     * Find entries in the specified database based on search criteria.
     */
    async find({ collection, search, context = {}, dbFindOpts = {}, findOpts = {} }) {
        dbFindOpts.reverse = dbFindOpts.reverse || false;
        dbFindOpts.max = dbFindOpts.max || -1;
        await this.checkCollection(arguments[0]);
        let data = await this.fileCpu.find(collection, search, context, findOpts);
        if (dbFindOpts.reverse)
            data.reverse();
        if (dbFindOpts.max !== -1 && data.length > dbFindOpts.max)
            data = data.slice(0, dbFindOpts.max);
        return data;
    }
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne({ collection, search, context = {}, findOpts = {} }) {
        await this.checkCollection(arguments[0]);
        let data = await this.fileCpu.findOne(collection, search, context, findOpts);
        return data || null;
    }
    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    async update({ collection, search, updater, context = {} }) {
        await this.checkCollection(arguments[0]);
        return await this.fileCpu.update(collection, false, search, updater, context);
    }
    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne({ collection, search, updater, context = {} }) {
        await this.checkCollection(arguments[0]);
        return await this.fileCpu.update(collection, true, search, updater, context);
    }
    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove({ collection, search, context = {} }) {
        await this.checkCollection(arguments[0]);
        return await this.fileCpu.remove(collection, false, search, context);
    }
    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne({ collection, search, context = {} }) {
        await this.checkCollection(arguments[0]);
        return await this.fileCpu.remove(collection, true, search, context);
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection({ collection }) {
        this.memory.delete(collection);
        return true;
    }
}
export default class ValtheraMemory extends Valthera {
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
