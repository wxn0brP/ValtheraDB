import dbActionC from "./action.js";
import DataBase from "./database.js";
import { Arg, Search, Updater } from "./types/arg.js";
import Data from "./types/data.js";
import FileCpu from "./types/fileCpu.js";
import { DbFindOpts, DbOpts, FindOpts } from "./types/options.js";
import { SearchOptions } from "./types/searchOpts.js";
import { Transaction } from "./types/transactions.js";
import { Context } from "./types/types.js";
export declare class MemoryAction implements dbActionC {
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
    constructor();
    _readMemory(key: string): any[];
    _writeMemory(key: string, data: any[]): void;
    _getCollectionPath(collection: string): string;
    /**
     * Get a list of available databases in the specified folder.
     */
    getCollections(): Promise<string[]>;
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    checkCollection(collection: string): Promise<void>;
    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string): Promise<boolean>;
    /**
     * Add a new entry to the specified database.
     */
    add(collection: string, arg: Arg, id_gen?: boolean): Promise<Arg>;
    /**
     * Find entries in the specified database based on search criteria.
     */
    find(collection: string, arg: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<Data[]>;
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    findOne(collection: string, arg: SearchOptions, context?: Context, findOpts?: FindOpts): Promise<Data>;
    /**
     * Find entries in the specified database based on search criteria and return a stream of results.
     */
    findStream(collection: string, arg: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<any>;
    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    update(collection: string, arg: Search, updater: Updater, context?: {}): Promise<boolean>;
    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    updateOne(collection: string, arg: Search, updater: Updater, context?: Context): Promise<boolean>;
    /**
     * Remove entries from the specified database based on search criteria.
     */
    remove(collection: string, arg: Search, context?: Context): Promise<boolean>;
    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    removeOne(collection: string, arg: Search, context?: Context): Promise<boolean>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(collection: string): Promise<void>;
    /**
     * Executes a list of transactions on the specified database collection.
     * @throws Error - Method not supported in memory.
     */
    transaction(collection: string, transactions: Transaction[]): Promise<void>;
}
export default class ValtheraMemory extends DataBase {
    constructor(...args: any[]);
}
export declare function createMemoryValthera<T = {
    [key: string]: Data[];
}>(data?: T): ValtheraMemory;
