import { RemoteConfig } from "@wxn0brp/db-client/remote";
import { ValtheraRemote } from "@wxn0brp/db-client/valthera";
import { forgeTypedValthera } from "@wxn0brp/db-core";
import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { Data } from "@wxn0brp/db-core/types/data";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import { createFileActions } from "@wxn0brp/db-storage-dir";
import { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
import { Valthera } from "./valthera";

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
export function ValtheraAutoRemoteCreate(cfg: string | RemoteConfig): ValtheraCompatible {
    if (typeof cfg === "object" || cfg.startsWith("http")) return new ValtheraRemote(cfg);
    return new Valthera(cfg);
}

/**
 * Creates a new instance of forged Valthera.
 * 
 * @param folder - The folder path where the database files are stored.
 * @param options - Optional configuration options.
 * @returns A new instance of Valthera.
 */
export function ValtheraCreate<T extends Record<string, Data> = {}>(folder: string, options: DbDirOpts = {}) {
    return forgeTypedValthera<T>(
        new ValtheraClass({
            adapter: createFileActions(folder, options)
        })
    );
}
