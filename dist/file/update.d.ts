import { Context } from "../types/types.js";
import { Search, Updater } from "../types/arg.js";
declare function updateWorker(file: string, one: boolean, search: Search, updater: Updater, context?: Context): Promise<boolean>;
export default updateWorker;
