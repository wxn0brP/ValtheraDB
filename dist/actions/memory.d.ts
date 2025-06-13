import dbActionBase from "../base/actions.js";
import Valthera from "../db/valthera.js";
import Data from "../types/data.js";
import FileCpu from "../types/fileCpu.js";
import { DbOpts } from "../types/options.js";
import { VQuery } from "../types/query.js";
export declare class MemoryAction extends dbActionBase {
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
    checkCollection({ collection }: VQuery): Promise<boolean>;
    /**
     * Check if a collection exists.
     */
    issetCollection({ collection }: VQuery): Promise<boolean>;
    /**
     * Add a new entry to the specified database.
     */
    add({ collection, data, id_gen }: VQuery): Promise<import("../types/arg.js").Arg>;
    /**
     * Find entries in the specified database based on search criteria.
     */
    find({ collection, search, context, dbFindOpts, findOpts }: VQuery): Promise<Data[]>;
    /**
     * Find the first matching entry in the specified database based on search criteria.
     */
    findOne({ collection, search, context, findOpts }: VQuery): Promise<Data>;
    /**
     * Update entries in the specified database based on search criteria and an updater function or object.
     */
    update({ collection, search, updater, context }: VQuery): Promise<boolean>;
    /**
     * Update the first matching entry in the specified database based on search criteria and an updater function or object.
     */
    updateOne({ collection, search, updater, context }: VQuery): Promise<boolean>;
    /**
     * Remove entries from the specified database based on search criteria.
     */
    remove({ collection, search, context }: VQuery): Promise<boolean>;
    /**
     * Remove the first matching entry from the specified database based on search criteria.
     */
    removeOne({ collection, search, context }: VQuery): Promise<boolean>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection({ collection }: VQuery): Promise<boolean>;
}
export default class ValtheraMemory extends Valthera {
    constructor(...args: any[]);
}
export declare function createMemoryValthera<T = {
    [key: string]: Data[];
}>(data?: T): ValtheraMemory;
