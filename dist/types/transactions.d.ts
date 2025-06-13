import { Arg, Search, Updater } from "./arg.js";
import { Context } from "./types.js";
export interface Transaction {
    type: 'update' | 'updateOne' | 'updateOneOrAdd' | 'remove' | 'removeOne';
    search: Search;
    updater?: Updater;
    addArg?: Arg;
    idGen?: boolean;
    context?: Context;
}
