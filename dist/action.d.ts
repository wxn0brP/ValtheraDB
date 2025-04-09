import { Arg, Search, Updater } from "./types/arg.js";
import { DbFindOpts, DbOpts, FindOpts } from "./types/options.js";
import { Context } from "./types/types.js";
import { SearchOptions } from "./types/searchOpts.js";
import Data from "./types/data.js";
import FileCpu from "./types/fileCpu.js";
import { Transaction } from "./types/transactions.js";
/**
 * A class representing database actions on files.
 * @class
 */
declare class dbActionC {
    folder: string;
    options: DbOpts;
    fileCpu: FileCpu;
    /**
     * Creates a new instance of dbActionC.
     * @constructor
     * @param folder - The folder where database files are stored.
     * @param options - The options object.
     */
    constructor(folder: string, options: DbOpts, fileCpu: FileCpu);
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
    find(collection: string, arg: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<any[]>;
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    findOne(collection: string, arg: SearchOptions, context?: Context, findOpts?: FindOpts): Promise<Data>;
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
     * Apply a series of transactions to a database collection.
     */
    transaction(collection: string, transactions: Transaction[]): Promise<void>;
}
export default dbActionC;
