import DataBaseRemote from "./client/database";
import { Remote } from "./client/remote";
import DataBase from "./database";

export function autoCreate(cfg: string | Remote) {
    if (typeof cfg === "object") return new DataBaseRemote(cfg);
    if (cfg.startsWith("http")) return new DataBaseRemote(cfg);
    return new DataBase(cfg);
}