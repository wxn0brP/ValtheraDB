import { Remote } from "@wxn0brp/db-client/remote";
import { Data } from "@wxn0brp/db-core/types/data";
import { DbOpts } from "@wxn0brp/db-core/types/options";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 *
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export declare function ValtheraAutoRemoteCreate(cfg: string | Remote): ValtheraCompatible;
/**
 * Creates a new instance of forged Valthera.
 *
 * @param folder - The folder path where the database files are stored.
 * @param options - Optional configuration options.
 * @returns A new instance of Valthera.
 */
export declare function ValtheraCreate<T extends Record<string, Data> = {}>(folder: string, options?: DbOpts): import("@wxn0brp/db-core").ValtheraClass & { [K in keyof T]: import("@wxn0brp/db-core/helpers/collection").Collection<T[K]>; };
