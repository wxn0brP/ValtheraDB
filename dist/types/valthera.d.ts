import CollectionManager from "../helpers/CollectionManager.js";
import { Arg, Search, Updater } from "./arg.js";
import Data from "./data.js";
import { DbFindOpts, FindOpts } from "./options.js";
import { Transaction } from "./transactions.js";
import { Context } from "./types.js";
export interface ValtheraCompatible {
    c(collection: string): CollectionManager;
    getCollections(): Promise<string[]>;
    checkCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    add<T = Data>(collection: string, data: Arg, id_gen?: boolean): Promise<T>;
    find<T = Data>(collection: string, search: Search, context?: Context, options?: DbFindOpts, findOpts?: FindOpts): Promise<T[]>;
    findOne<T = Data>(collection: string, search: Search, context?: Context, findOpts?: FindOpts): Promise<T | null>;
    findStream<T = Data>(collection: string, search: Search, context?: Context, findOpts?: FindOpts, limit?: number): Promise<AsyncGenerator<T>>;
    update(collection: string, search: Search, updater: Updater, context?: Context): Promise<boolean>;
    updateOne(collection: string, search: Search, updater: Updater, context?: Context): Promise<boolean>;
    remove(collection: string, search: Search, context?: Context): Promise<boolean>;
    removeOne(collection: string, search: Search, context?: Context): Promise<boolean>;
    removeCollection(collection: string): Promise<boolean>;
    transaction(collection: string, transaction: Transaction[]): Promise<boolean>;
    updateOneOrAdd(collection: string, search: Search, updater: Updater, add_arg?: Arg, context?: Context, id_gen?: boolean): Promise<boolean>;
}
