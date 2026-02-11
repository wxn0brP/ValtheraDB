import { Remote } from "@wxn0brp/db-client/remote";
import { ValtheraRemote } from "@wxn0brp/db-client/valthera";
import { forgeTypedValthera } from "@wxn0brp/db-core";
import { Data } from "@wxn0brp/db-core/types/data";
import { DbOpts } from "@wxn0brp/db-core/types/options";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import { Valthera } from "./valthera";

/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 * 
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export function ValtheraAutoRemoteCreate(cfg: string | Remote): ValtheraCompatible {
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
export function ValtheraCreate<T extends Record<string, Data> = {}>(folder: string, options: DbOpts = {}) {
    return forgeTypedValthera<T>(new Valthera(folder, options));
}
