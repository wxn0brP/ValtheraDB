import { Remote } from "@wxn0brp/db-client/remote";
import ValtheraRemote from "@wxn0brp/db-client/valthera";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import Valthera from "./valthera";

/**
 * Creates a database instance based on the provided configuration.
 * If the configuration is an object, it creates a DataBaseRemote instance.
 * If the configuration is a string starting with "http", it also creates a DataBaseRemote instance.
 * Otherwise, it creates a DataBase instance.
 * 
 * @param cfg - The configuration object or string for the database.
 * @returns A new instance of DataBaseRemote or DataBase.
 */
export function ValtheraAutoCreate(cfg: string | Remote): ValtheraCompatible {
    if (typeof cfg === "object" || cfg.startsWith("http")) return new ValtheraRemote(cfg);
    return new Valthera(cfg);
}