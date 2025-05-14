import { Search } from "../types/arg.js";
import { Context } from "../types/types.js";
/**
 * Removes entries from a file based on search criteria.
 */
declare function removeWorker(file: string, one: boolean, search: Search, context?: Context): Promise<boolean>;
export default removeWorker;
