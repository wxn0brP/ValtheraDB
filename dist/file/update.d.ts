import { Context } from "../types/types.js";
import { Search, Updater } from "../types/arg.js";
/**
 * Updates a file based on search criteria and an updater function or object.
 */
declare function updateWorker(file: string, one: boolean, search: Search, updater: Updater, context?: Context): Promise<boolean>;
export default updateWorker;
