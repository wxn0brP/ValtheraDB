import DataBase from "./database.js";
import Graph from "./graph.js";
import DataBaseRemote from "./client/database.js";
import GraphRemote from "./client/graph.js";
import genId from "./gen.js";
import Relation from "./relation.js";
import CustomFileCpu from "./file/customFileCpu.js";
import ValtheraMemory, { createMemoryValthera } from "./memory.js";
import { autoCreate } from "./autoCreate.js";
export { DataBase as Valthera, Graph, DataBaseRemote as ValtheraRemote, GraphRemote, Relation, genId, CustomFileCpu, ValtheraMemory, createMemoryValthera, autoCreate, };
export type Id = import("./types/Id.js").Id;
export declare namespace ValtheraTypes {
    type Arg = import("./types/arg.js").Arg;
    type Search = import("./types/arg.js").Search;
    type Updater = import("./types/arg.js").Updater;
    type DbFindOpts = import("./types/options.js").DbFindOpts;
    type FindOpts = import("./types/options.js").FindOpts;
    type DbOpts = import("./types/options.js").DbOpts;
    type Data = import("./types/data.js").Data;
    type SearchOptions = import("./types/searchOpts.js").SearchOptions;
}
import type { RelationTypes } from "./types/relation.js";
export type { RelationTypes };
