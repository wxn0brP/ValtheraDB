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

/**
 * Represents a database management class for performing CRUD operations.
 * @class
 */
class DataBase {
    dbAction: dbActionC;
    executor: executorC;

    constructor(folder: string, options: DbOpts = {}, fileCpu?: FileCpu) {
        if(!fileCpu) fileCpu = vFileCpu;
        this.dbAction = options.dbAction || new dbActionC(folder, options, fileCpu);
        this.executor = options.executor || new executorC();
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
        return await this.executor.addOp(this.dbAction.getCollections.bind(this.dbAction)) as string[];
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection: string) {
        return await this.executor.addOp(this.dbAction.checkCollection.bind(this.dbAction), collection) as boolean;
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection(collection: string) {
        return await this.executor.addOp(this.dbAction.issetCollection.bind(this.dbAction), collection) as boolean;
    }

    /**
     * Add data to a database.
     */
    async add<T = Data>(collection: string, data: Arg, id_gen: boolean = true) {
        return await this.executor.addOp(this.dbAction.add.bind(this.dbAction), collection, data, id_gen) as T;
    }

    /**
     * Find data in a database.
     */
    async find<T = Data>(collection: string, search: Search, context: Context = {}, options: DbFindOpts = {}, findOpts: FindOpts = {}) {
        return await this.executor.addOp(this.dbAction.find.bind(this.dbAction), collection, search, context, options, findOpts) as T[];
    }

    /**
     * Find one data entry in a database.
     */
    async findOne<T = Data>(collection: string, search: Search, context: Context = {}, findOpts: FindOpts = {}) {
        return await this.executor.addOp(this.dbAction.findOne.bind(this.dbAction), collection, search, context, findOpts) as (T | null);
    }

    /**
     * Update data in a database.
     */
    async update(collection: string, search: Search, updater: Updater, context = {}) {
        return await this.executor.addOp(this.dbAction.update.bind(this.dbAction), collection, search, updater, context) as boolean;
    }

    /**
     * Update one data entry in a database.
     */
    async updateOne(collection: string, search: Search, updater: Updater, context: Context = {}) {
        return await this.executor.addOp(this.dbAction.updateOne.bind(this.dbAction), collection, search, updater, context) as boolean;
    }

    /**
     * Remove data from a database.
     */
    async remove(collection: string, search: Search, context: Context = {}) {
        return await this.executor.addOp(this.dbAction.remove.bind(this.dbAction), collection, search, context) as boolean;
    }

    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection: string, search: Search, context: Context = {}) {
        return await this.executor.addOp(this.dbAction.removeOne.bind(this.dbAction), collection, search, context) as boolean;
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection: string, search: Search, updater: Updater, add_arg: Arg = {}, context: Context = {}, id_gen: boolean = true) {
        const res = await this.updateOne(collection, search, updater, context);
        if (!res) {
            const assignData = [];
            if (typeof search === "object" && !Array.isArray(search)) assignData.push(search);
            if (typeof updater === "object" && !Array.isArray(updater)) assignData.push(updater);
            if (typeof add_arg === "object" && !Array.isArray(add_arg)) assignData.push(add_arg);
            await this.add(collection, Object.assign({}, ...assignData), id_gen);
        }
        return res as boolean;
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection: string) {
        return await this.executor.addOp(this.dbAction.removeCollection.bind(this.dbAction), collection) as boolean;
    }

    /**
     * Execute a transaction.
     */
    async transaction(collection: string, transaction: Transaction[]) {
        return await this.executor.addOp(this.dbAction.transaction.bind(this.dbAction), collection, transaction) as boolean;
    }
}

export default DataBase;