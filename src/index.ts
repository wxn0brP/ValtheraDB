import DataBase from "./database";
import Graph from "./graph";
import DataBaseRemote from "./client/database";
import GraphRemote from "./client/graph";
import genId from "./gen";
import Relation from "./relation";
import CustomFileCpu from "./file/customFileCpu";
import ValtheraMemory, { createMemoryValthera } from "./memory";

export {
    DataBase as Valthera,
    Graph,
    DataBaseRemote as ValtheraRemote,
    GraphRemote,
    Relation,
    genId,
    CustomFileCpu,
    ValtheraMemory,
    createMemoryValthera
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

import type { RelationTypes } from "./types/relation";
export type { RelationTypes };