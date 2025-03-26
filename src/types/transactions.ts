import { Arg, Search, Updater } from "./arg";
import { Context } from "./types";

export interface Transaction {
    type: 'update' | 'updateOne' | 'updateOneOrAdd' | 'remove' | 'removeOne';
    search: Search;
    updater?: Updater;
    addArg?: Arg;
    idGen?: boolean;
    context?: Context;
}