import { RemoteConfig } from "@wxn0brp/db-client/remote";
import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { Data } from "@wxn0brp/db-core/types/data";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 *
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 * @deprecated
 */
export declare function ValtheraAutoRemoteCreate(cfg: string | RemoteConfig): ValtheraCompatible;
/**
 * Creates a new instance of forged Valthera.
 *
 * The options object is shared by the database and the dir adapter:
 * core options (`executor`, `executorAware`, `adapterOpts`) and dir adapter
 * options (`format`, `maxFileSize`, `delimiter`, `stringifyArgs`) live side by side.
 *
 * @param folder - The folder path where the database files are stored.
 * @param options - Optional database and dir adapter options.
 * @returns A new instance of Valthera.
 *
 * @example
 * const db = ValtheraCreate("./data", { format: "json5", adapterOpts: { idKey: "id" } });
 */
export declare function ValtheraCreate<T extends Record<string, Data> = {}>(folder: string, options?: DbDirOpts): ValtheraClass & { [K in keyof T]: import("@wxn0brp/db-core/helpers/collection").Collection<T[K]>; };
