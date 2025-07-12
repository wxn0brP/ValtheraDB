import { VContext } from "./types";
import { Arg, Search, Updater } from "./arg";
import { DbFindOpts, FindOpts } from "./options";

export interface VQuery {
    collection?: string;
    search?: Search;
    context?: VContext;
    dbFindOpts?: DbFindOpts;
    findOpts?: FindOpts;
    data?: Arg;
    id_gen?: boolean;
    limit?: number;
    add_arg?: Arg;
    updater?: Updater;
}