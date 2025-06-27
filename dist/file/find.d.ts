import { Search } from "../types/arg.js";
import { FindOpts } from "../types/options.js";
import { Context } from "../types/types.js";
/**
 * Asynchronously finds entries in a file based on search criteria.
 */
export declare function find(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any[] | false>;
/**
 * Asynchronously finds one entry in a file based on search criteria.
 */
export declare function findOne(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any | false>;
