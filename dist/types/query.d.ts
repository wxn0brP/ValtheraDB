import { Context } from "./types.js";
import { Arg, Search, Updater } from "./arg.js";
import { DbFindOpts, FindOpts } from "./options.js";
export interface VQuery {
    collection?: string;
    search?: Search;
    context?: Context;
    dbFindOpts?: DbFindOpts;
    findOpts?: FindOpts;
    data?: Arg;
    id_gen?: boolean;
    limit?: number;
    add_arg?: Arg;
    updater?: Updater;
}
