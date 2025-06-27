import { Search } from "../types/arg.js";
import { FindOpts } from "../types/options.js";
import { Context } from "../types/types.js";
export declare function find(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any[] | false>;
export declare function findOne(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any | false>;
