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
import { ValtheraTypes } from "./types/export";

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
    ValtheraTypes
}

export type Id = import("./types/Id").Id;