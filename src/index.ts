import Valthera from "./db/valthera";
import Graph from "./db/graph";
import ValtheraRemote from "./client/valthera";
import GraphRemote from "./client/graph";
import genId from "./helpers/gen";
import Relation from "./helpers/relation";
import CustomFileCpu from "./file/customFileCpu";
import ValtheraMemory, { createMemoryValthera } from "./actions/memory";
import { ValtheraAutoCreate } from "./helpers/autoCreate";
import { RelationTypes } from "./types/relation";
import { ValtheraCompatible } from "./types/valthera";

export {
    Valthera,
    Graph,
    ValtheraRemote,
    GraphRemote,
    Relation,
    genId,
    CustomFileCpu,
    ValtheraMemory,
    createMemoryValthera,
    ValtheraAutoCreate,
}

type GraphCompatible = Graph | GraphRemote;

export type {
    ValtheraCompatible,
    RelationTypes,
    GraphCompatible,
}

export type Id = import("./types/Id").Id;
export namespace ValtheraTypes {
    export type Arg = import("./types/arg").Arg;
    export type Search = import("./types/arg").Search;
    export type Updater = import("./types/arg").Updater;
    export type DbFindOpts = import("./types/options").DbFindOpts;
    export type FindOpts = import("./types/options").FindOpts;
    export type DbOpts = import("./types/options").DbOpts;
    export type Data = import("./types/data").Data;
    export type SearchOptions = import("./types/searchOpts").SearchOptions;
}
