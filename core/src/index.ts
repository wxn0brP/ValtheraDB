import genId from "./helpers/gen";
import Relation from "./helpers/relation";
import { RelationTypes } from "./types/relation";
import { ValtheraCompatible } from "./types/valthera";
import { ValtheraTypes } from "./types/export";
import CustomFileCpu from "./customFileCpu";
import ValtheraClass from "./db/valthera";
import ValtheraMemory, { createMemoryValthera } from "./db/memory";

export {
    ValtheraClass,
    ValtheraMemory,
    createMemoryValthera,
    Relation,
    genId,
    CustomFileCpu,
}

export type {
    ValtheraCompatible,
    RelationTypes,
    ValtheraTypes
}

export type Id = import("./types/Id").Id;