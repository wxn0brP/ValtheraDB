import DataBaseRemote from "../client/database";
import DataBase from "../database";
import { DbFindOpts } from "./options";

export namespace RelationTypes {
    export type Path = [string, string];
    export type FieldPath = string[];

    export interface DBS {
        [key: string]: DataBase | DataBaseRemote
    }

    export interface Relation {
        [key: string]: RelationConfig
    }

    export interface RelationConfig {
        path: Path;
        pk?: string;
        fk?: string;
        as?: string;
        select?: string[];

        findOpts?: DbFindOpts;
        type?: "1" | "1n" | "nm"
        relations?: Relation;
    }
}