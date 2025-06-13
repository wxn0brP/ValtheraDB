import { Arg, Search, Updater } from "../types/arg.js";
import { DbFindOpts, FindOpts } from "../types/options.js";
import { Context } from "../types/types.js";
import Data from "../types/data.js";
import { ValtheraCompatible } from "../types/valthera.js";
declare class CollectionManager {
    private db;
    private collection;
    constructor(db: ValtheraCompatible, collection: string);
    add<T = Data>(data: Arg, id_gen?: boolean): Promise<T>;
    find<T = Data>(search: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<T[]>;
    findOne<T = Data>(search: Search, context?: Context, findOpts?: FindOpts): Promise<T>;
    findStream<T = Data>(search: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<T>;
    update(search: Search, updater: Updater, context?: Context): Promise<boolean>;
    updateOne(search: Search, updater: Updater, context?: Context): Promise<boolean>;
    remove(search: Search, context?: Context): Promise<boolean>;
    removeOne(search: Search, context?: Context): Promise<boolean>;
    updateOneOrAdd(search: Search, updater: Updater, add_arg?: Arg, context?: Context, id_gen?: boolean): Promise<boolean>;
}
export default CollectionManager;
