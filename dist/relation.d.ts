import DataBase from "./database.js";
import { Search } from "./types/arg.js";
import { DbFindOpts } from "./types/options.js";
export interface Databases {
    [key: string]: DataBase;
}
export interface RelationConfig {
    from: string;
    localField: string;
    foreignField: string;
    as?: string;
    multiple?: boolean;
}
declare class Relation {
    private databases;
    constructor(databases: Databases);
    /**
     * Resolves the relation path in format 'dbName.collectionName'.
     */
    private _resolvePath;
    /**
     * Processes relations for a single item.
     */
    private _processItemRelations;
    /**
     * Finds multiple items with relations.
     */
    find(path: string, search: Search, relations?: Record<string, RelationConfig>, options?: DbFindOpts): Promise<Record<string, any>[]>;
    /**
     * Finds a single item with relations.
     */
    findOne(path: string, search: Search, relations?: Record<string, RelationConfig>): Promise<Record<string, any> | null>;
}
export default Relation;
