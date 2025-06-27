import dbActionBase from "../base/actions.js";
import Data from "../types/data.js";
import FileCpu from "../types/fileCpu.js";
import { DbOpts } from "../types/options.js";
import { VQuery } from "../types/query.js";
/**
 * A class representing database actions on files.
 * @class
 */
declare class dbActionC extends dbActionBase {
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
    removeCollection({ collection }: {
        collection: any;
    }): Promise<boolean>;
}
export default dbActionC;
