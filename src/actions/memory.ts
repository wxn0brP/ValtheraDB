import Valthera from "../db/valthera";
import CustomFileCpu from "../file/customFileCpu";
import genId from "../helpers/gen";
import { Arg, Search, Updater } from "../types/arg";
import Data from "../types/data";
import FileCpu from "../types/fileCpu";
import { DbFindOpts, DbOpts, FindOpts } from "../types/options";
import { SearchOptions } from "../types/searchOpts";
import { Transaction } from "../types/transactions";
import { Context } from "../types/types";
import dbActionC from "./action";

export class MemoryAction implements dbActionC {
    folder: string;
    options: DbOpts;
    fileCpu: FileCpu;
    memory: Map<string, any[]>;

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

    _readMemory(key: string) {
        if (!this.memory.has(key)) return [];
        return this.memory.get(key);
    }

    _writeMemory(key: string, data: any[]) {
        this.memory.set(key, data);
    }

    _getCollectionPath(collection: string) {
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
    async checkCollection(collection: string) {
        if (this.issetCollection(collection)) return;
        this.memory.set(collection, []);
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection(collection: string) {
        return this.memory.has(collection);
    }

    /**
     * Add a new entry to the specified database.
     */
    async add(collection: string, arg: Arg, id_gen: boolean = true) {
        await this.checkCollection(collection);

        if (id_gen) arg._id = arg._id || genId();
        await this.fileCpu.add(collection, arg);
        return arg;
    }

    /**
     * Find entries in the specified database based on search criteria.
     */
    async find(collection: string, arg: Search, context: Context = {}, options: DbFindOpts = {}, findOpts: FindOpts = {}) {
        options.reverse = options.reverse || false;
        options.max = options.max || -1;

        await this.checkCollection(collection);

        let data = await this.fileCpu.find(collection, arg, context, findOpts) as Data[];
        if (options.reverse) data.reverse();

        if (options.max !== -1 && data.length > options.max)
            data = data.slice(0, options.max);

        return data;
    }

    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    async findOne(collection: string, arg: SearchOptions, context: Context = {}, findOpts: FindOpts = {}) {
        await this.checkCollection(collection);
        let data = await this.fileCpu.findOne(collection, arg, context, findOpts) as Data;
        return data || null;
    }

    /**
     * Find entries in the specified database based on search criteria and return a stream of results.
     */
    async *findStream(collection: string, arg: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    async update(collection: string, arg: Search, updater: Updater, context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.update(collection, false, arg, updater, context);
    }

    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    async updateOne(collection: string, arg: Search, updater: Updater, context: Context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.update(collection, true, arg, updater, context);
    }

    /**
     * Remove entries from the specified database based on search criteria.
     */
    async remove(collection: string, arg: Search, context: Context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.remove(collection, false, arg, context);
    }

    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    async removeOne(collection: string, arg: Search, context: Context = {}) {
        await this.checkCollection(collection);
        return await this.fileCpu.remove(collection, true, arg, context);
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection: string) {
        this.memory.delete(collection);
    }

    /**
     * Executes a list of transactions on the specified database collection.
     * @throws Error - Method not supported in memory.
     */
    transaction(collection: string, transactions: Transaction[]): Promise<void> {
        throw new Error("Method not supported in memory.");
    }
}

export default class ValtheraMemory extends Valthera {
    constructor(...args: any[]) {
        super("", { dbAction: new MemoryAction() });
    }
}

export function createMemoryValthera<T = { [key: string]: Data[] }>(data?: T) {
    const db = new ValtheraMemory();
    if (!data) return db;

    for (const collection of Object.keys(data)) {
        (db.dbAction as MemoryAction).memory.set(collection, data[collection]);
    }

    return db;
}