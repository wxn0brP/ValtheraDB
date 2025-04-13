import DataBaseRemote from "./client/database.js";
import DataBase from "./database.js";
/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 *
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export function autoCreate(cfg) {
    if (typeof cfg === "object")
        return new DataBaseRemote(cfg);
    if (cfg.startsWith("http"))
        return new DataBaseRemote(cfg);
    return new DataBase(cfg);
}
