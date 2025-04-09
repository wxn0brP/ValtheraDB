import DataBaseRemote from "../client/database.js";
import DataBase from "../database.js";
import { DbFindOpts } from "./options.js";
export declare namespace RelationTypes {
    type Path = [string, string];
    type FieldPath = string[];
    interface DBS {
        [key: string]: DataBase | DataBaseRemote;
    }
    interface Relation {
        [key: string]: RelationConfig;
    }
    interface RelationConfig {
        path: Path;
        pk?: string;
        fk?: string;
        as?: string;
        select?: string[];
        findOpts?: DbFindOpts;
        type?: "1" | "1n" | "nm";
        relations?: Relation;
    }
}
