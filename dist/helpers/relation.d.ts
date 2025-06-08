import { Search } from "../types/arg.js";
import { DbFindOpts } from "../types/options.js";
import { RelationTypes } from "../types/relation.js";
declare class Relation {
    dbs: RelationTypes.DBS;
    constructor(dbs: RelationTypes.DBS);
    findOne(path: RelationTypes.Path, search: Search, relations: RelationTypes.Relation, select?: string[][] | Record<string, any>): Promise<any>;
    find(path: RelationTypes.Path, search: Search, relations: RelationTypes.Relation, select?: string[][] | Record<string, any>, findOpts?: DbFindOpts): Promise<any[]>;
}
export default Relation;
