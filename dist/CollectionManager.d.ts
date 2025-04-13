import DataBase from "./database.js";
import DataBaseRemote from "./client/database.js";
import { Arg, Search, Updater } from "./types/arg.js";
import { DbFindOpts, FindOpts } from "./types/options.js";
import { Context } from "./types/types.js";
import Data from "./types/data.js";
declare class CollectionManager {
    db: DataBase | DataBaseRemote;
    collection: string;
    constructor(db: DataBase | DataBaseRemote, collection: string);
    /**
     * Add data to a database.
     */
    add<T = Data>(data: Arg, id_gen?: boolean): Promise<T>;
    /**
     * Find data in a database.
     */
    find<T = Data>(search: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<T[]>;
    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(search: Search, context?: Context, findOpts?: FindOpts): Promise<T>;
    /**
     * Find data in a database as a stream.
     */
    findStream<T = Data>(search: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<T>;
    /**
     * Update data in a database.
     */
    update(search: Search, updater: Updater, context?: Context): Promise<boolean>;
    /**
     * Update one data entry in a database.
     */
    updateOne(search: Search, updater: Updater, context?: Context): Promise<boolean>;
    /**
     * Remove data from a database.
     */
    remove(search: Search, context?: Context): Promise<boolean>;
    /**
     * Remove one data entry from a database.
     */
    removeOne(search: Search, context?: Context): Promise<boolean>;
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd(search: Search, updater: Updater, add_arg?: Arg, context?: Context, id_gen?: boolean): Promise<boolean>;
}
export default CollectionManager;
