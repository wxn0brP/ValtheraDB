import Valthera from "./valthera.js";
import Graph from "./graph.js";
import ValtheraRemote from "./client/valthera.js";
import GraphRemote from "./client/graph.js";
import genId from "./gen.js";
import Relation from "./relation.js";
import CustomFileCpu from "./file/customFileCpu.js";
import ValtheraMemory, { createMemoryValthera } from "./memory.js";
import { ValtheraAutoCreate } from "./autoCreate.js";
import { RelationTypes } from "./types/relation.js";
import { ValtheraCompatible } from "./types/valthera.js";
export { Valthera, Graph, ValtheraRemote, GraphRemote, Relation, genId, CustomFileCpu, ValtheraMemory, createMemoryValthera, ValtheraAutoCreate, };
type GraphCompatible = Graph | GraphRemote;
export type { ValtheraCompatible, RelationTypes, GraphCompatible, };
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
