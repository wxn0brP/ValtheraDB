import CollectionManager from "../helpers/CollectionManager.js";
import { Remote } from "./remote.js";
import { Arg, Search, Updater } from "../types/arg.js";
import { DbFindOpts, FindOpts } from "../types/options.js";
import { Context } from "../types/types.js";
import Data from "../types/data.js";
import { Transaction } from "../types/transactions.js";
import { ValtheraCompatible } from "../types/valthera.js";
declare class ValtheraRemote implements ValtheraCompatible {
    remote: Remote;
    constructor(remote: Remote | string);
    _request<T>(type: string, params?: any[]): Promise<T>;
    c(collection: string): CollectionManager;
    getCollections(): Promise<string[]>;
    checkCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    add<T = Data>(collection: string, data: Arg, id_gen?: boolean): Promise<T>;
    find<T = Data>(collection: string, search: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<T[]>;
    findOne<T = Data>(collection: string, search: Search, context?: Context, findOpts?: FindOpts): Promise<T>;
    findStream<T = Data>(collection: string, search: Search, context?: Context, findOpts?: FindOpts, limit?: number): Promise<AsyncGenerator<T, any, any>>;
    update(collection: string, search: Search, updater: Updater, context?: Context): Promise<boolean>;
    updateOne(collection: string, search: Search, updater: Updater, context?: Context): Promise<boolean>;
    remove(collection: string, search: Search, context?: Context): Promise<boolean>;
    removeOne(collection: string, search: Search, context?: Context): Promise<boolean>;
    updateOneOrAdd(collection: string, search: Search, arg: Search, add_arg?: Arg, context?: Context, id_gen?: boolean): Promise<boolean>;
    removeCollection(name: string): Promise<boolean>;
    transaction(collection: string, transaction: Transaction[]): Promise<boolean>;
}
export default ValtheraRemote;
