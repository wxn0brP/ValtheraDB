import DataBase from "./database";
import Graph from "./graph";
import DataBaseRemote from "./client/database";
import GraphRemote from "./client/graph";
import genId from "./gen";
import Relation from "./relation";
import CustomFileCpu from "./file/customFileCpu";
import ValtheraMemory, { createMemoryValthera } from "./memory";

export {
    DataBase,
    DataBase as Valthera,
    Graph,
    DataBaseRemote,
    DataBaseRemote as ValtheraRemote,
    GraphRemote,
    Relation,
    genId,
    CustomFileCpu,
    ValtheraMemory,
    createMemoryValthera
}

import type Id from "./types/Id";
import type { Arg, Search, Updater } from "./types/arg";
import type { DbFindOpts, FindOpts, DbOpts } from "./types/options";
import type Data from "./types/data";
import type { SearchOptions } from "./types/searchOpts";
import type { RelationTypes } from "./relation";

export type {
    Id,
    Arg,
    Search,
    Updater,
    DbFindOpts,
    FindOpts,
    DbOpts,
    Data,
    SearchOptions,
    RelationTypes
}