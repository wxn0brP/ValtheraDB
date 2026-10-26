import { ValtheraRemote } from "@wxn0brp/db-client/valthera";
import { forgeTypedValthera } from "@wxn0brp/db-core";
import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { createFileAdapter } from "@wxn0brp/db-storage-dir";
import { Valthera } from "./valthera.js";
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
export function ValtheraAutoRemoteCreate(cfg) {
    if (typeof cfg === "object" || cfg.startsWith("http"))
        return new ValtheraRemote(cfg);
    return new Valthera(cfg);
}
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
export function ValtheraCreate(folder, options = {}) {
    return forgeTypedValthera(new ValtheraClass({
        ...options,
        adapter: createFileAdapter(folder, options),
    }));
}
