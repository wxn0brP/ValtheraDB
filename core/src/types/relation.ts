import { DbFindOpts } from "./options";
import { ValtheraCompatible } from "./valthera";

export namespace RelationTypes {
    export type Path = [string, string];
    export type FieldPath = string[];

    export interface DBS {
        [key: string]: ValtheraCompatible
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
        type?: "1" | "11" | "1n" | "nm"
        relations?: Relation;

        through?: {
            table: string;
            db?: string;
            pk: string; // local -> pivot
            fk: string; // remote -> pivot
        };
    }
}