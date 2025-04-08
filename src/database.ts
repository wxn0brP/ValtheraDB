import dbActionC from "./action";
import executorC from "./executor";
import CollectionManager from "./CollectionManager";
import { DbFindOpts, DbOpts, FindOpts } from "./types/options";
import { Arg, Search, Updater } from "./types/arg";
import Data from "./types/data";
import { Context } from "./types/types";
import FileCpu from "./types/fileCpu";
import vFileCpu from "./file";
import { Transaction } from "./types/transactions";
import { EventEmitter } from "events";

type DbActionsFns = keyof {
    [K in keyof dbActionC as dbActionC[K] extends (...args: any[]) => any ? K : never]: any;
}

/**
 * Represents a database management class for performing CRUD operations.
 * @class
 */
class DataBase {
    dbAction: dbActionC;
    executor: executorC;
    emiter: EventEmitter;

    constructor(folder: string, options: DbOpts = {}, fileCpu?: FileCpu) {
        if(!fileCpu) fileCpu = vFileCpu;
        this.dbAction = options.dbAction || new dbActionC(folder, options, fileCpu);
        this.executor = options.executor || new executorC();
        this.emiter = new EventEmitter();
    }

    private async execute<T>(name: DbActionsFns, ...args: any[]) {
        const result = await this.executor.addOp(this.dbAction[name].bind(this.dbAction), ...args) as T;
        if (this.emiter.listeners(name).length !== 0) this.emiter.emit(name, args, result);
        if (this.emiter.listeners("*").length !== 0) this.emiter.emit("*", name, args, result);
        return result;
    }

    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection: string) {
        return new CollectionManager(this, collection);
    }

    /**
     * Get the names of all available databases.
     */
    async getCollections() {
        return await this.execute<string[]>("getCollections");
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection: string) {
        return await this.execute<boolean>("checkCollection", collection);
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection(collection: string) {
        return await this.execute<boolean>("issetCollection", collection);
    }

    /**
     * Add data to a database.
     */
    async add<T = Data>(collection: string, data: Arg, id_gen: boolean = true) {
        return await this.execute<T>("add", collection, data, id_gen);
    }

    /**
     * Find data in a database.
     */
    async find<T = Data>(collection: string, search: Search, context: Context = {}, options: DbFindOpts = {}, findOpts: FindOpts = {}) {
        return await this.execute<T[]>("find", collection, search, context, options, findOpts);
    }

    /**
     * Find one data entry in a database.
     */
    async findOne<T = Data>(collection: string, search: Search, context: Context = {}, findOpts: FindOpts = {}) {
        return await this.execute<T | null>("findOne", collection, search, context, findOpts);
    }

    /**
     * Find data in a database as a stream.
     */
    async findStream<T = Data>(collection: string, search: Search, context: Context = {}, findOpts: FindOpts = {}, limit: number = -1) {
        return await this.execute<AsyncGenerator<T>>("findStream", collection, search, context, findOpts, limit);
    }

    /**
     * Update data in a database.
     */
    async update(collection: string, search: Search, updater: Updater, context = {}) {
        return await this.execute<boolean>("update", collection, search, updater, context);
    }

    /**
     * Update one data entry in a database.
     */
    async updateOne(collection: string, search: Search, updater: Updater, context: Context = {}) {
        return await this.execute<boolean>("updateOne", collection, search, updater, context);
    }

    /**
     * Remove data from a database.
     */
    async remove(collection: string, search: Search, context: Context = {}) {
        return await this.execute<boolean>("remove", collection, search, context);
    }

    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection: string, search: Search, context: Context = {}) {
        return await this.execute<boolean>("removeOne", collection, search, context);
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection: string, search: Search, updater: Updater, add_arg: Arg = {}, context: Context = {}, id_gen: boolean = true) {
        const res = await this.updateOne(collection, search, updater, context);
        if (!res) {
            const assignData = [];
            function assignDataPush(data: any) {
                if (typeof data !== "object" || Array.isArray(data)) return;
                const obj = {};
                for (const key of Object.keys(data)) {
                    if (key.startsWith("$")) {
                        Object.keys(data[key]).forEach((k) => {
                            obj[k] = data[key][k];
                        })
                    } else
                    obj[key] = data[key];
                }
                assignData.push(obj);
            }
            
            assignDataPush(search);
            assignDataPush(updater);
            assignDataPush(add_arg);
            await this.add(collection, Object.assign({}, ...assignData), id_gen);
        }
        return res as boolean;
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection: string) {
        return await this.execute<boolean>("removeCollection", collection);
    }

    /**
     * Execute a transaction.
     */
    async transaction(collection: string, transaction: Transaction[]) {
        return await this.execute<boolean>("transaction", collection, transaction);
    }
}

export default DataBase;