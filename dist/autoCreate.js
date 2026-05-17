import { ValtheraRemote } from "@wxn0brp/db-client/valthera";
import { forgeTypedValthera } from "@wxn0brp/db-core";
import { Valthera } from "./valthera.js";
/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 *
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export function ValtheraAutoRemoteCreate(cfg) {
    if (typeof cfg === "object" || cfg.startsWith("http"))
        return new ValtheraRemote(cfg);
    return new Valthera(cfg);
}
/**
 * Creates a new instance of forged Valthera.
 *
 * @param folder - The folder path where the database files are stored.
 * @param options - Optional configuration options.
 * @returns A new instance of Valthera.
 */
export function ValtheraCreate(folder, options = {}) {
    return forgeTypedValthera(new Valthera(folder, options));
}
