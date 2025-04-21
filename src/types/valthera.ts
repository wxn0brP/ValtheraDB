import CollectionManager from "../CollectionManager";
import { Arg, Search, Updater } from "./arg";
import Data from "./data";
import { DbFindOpts, FindOpts } from "./options";
import { Transaction } from "./transactions";
import { Context } from "./types";

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
