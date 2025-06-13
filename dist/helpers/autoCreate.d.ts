import { Remote } from "../client/remote.js";
import { ValtheraCompatible } from "../types/valthera.js";
/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 *
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export declare function ValtheraAutoCreate(cfg: string | Remote): ValtheraCompatible;
