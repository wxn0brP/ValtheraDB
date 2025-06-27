import { EventEmitter } from "events";
import dbActionC from "../actions/action.js";
import CollectionManager from "../helpers/CollectionManager.js";
import executorC from "../helpers/executor.js";
import { Arg, Search, Updater } from "../types/arg.js";
import Data from "../types/data.js";
import FileCpu from "../types/fileCpu.js";
import { DbFindOpts, DbOpts, FindOpts } from "../types/options.js";
import { Context } from "../types/types.js";
import { ValtheraCompatible } from "../types/valthera.js";
/**
 * Represents a database management class for performing CRUD operations.
 * @class
 */
declare class Valthera implements ValtheraCompatible {
    dbAction: dbActionC;
    executor: executorC;
    emiter: EventEmitter;
    version: string;
    constructor(folder: string, options?: DbOpts, fileCpu?: FileCpu);
    private execute;
    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection: string): CollectionManager;
    /**
     * Get the names of all available databases.
     */
    getCollections(): Promise<string[]>;
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    checkCollection(collection: string): Promise<boolean>;
    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string): Promise<boolean>;
    /**
     * Add data to a database.
     */
    add<T = Data>(collection: string, data: Arg, id_gen?: boolean): Promise<T>;
    /**
     * Find data in a database.
     */
    find<T = Data>(collection: string, search: Search, context?: Context, dbFindOpts?: DbFindOpts, findOpts?: FindOpts): Promise<T[]>;
    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(collection: string, search: Search, context?: Context, findOpts?: FindOpts): Promise<T>;
    /**
     * Update data in a database.
     */
    update(collection: string, search: Search, updater: Updater, context?: {}): Promise<boolean>;
    /**
     * Update one data entry in a database.
     */
    updateOne(collection: string, search: Search, updater: Updater, context?: Context): Promise<boolean>;
    /**
     * Remove data from a database.
     */
    remove(collection: string, search: Search, context?: Context): Promise<boolean>;
    /**
     * Remove one data entry from a database.
     */
    removeOne(collection: string, search: Search, context?: Context): Promise<boolean>;
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd(collection: string, search: Search, updater: Updater, add_arg?: Arg, context?: Context, id_gen?: boolean): Promise<boolean>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(collection: string): Promise<boolean>;
}
export default Valthera;
