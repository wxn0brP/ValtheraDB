import GraphRemote from "@wxn0brp/db-client/graph";
import { ValtheraAutoCreate } from "./autoCreate";
import Graph from "./graph";
import { Valthera } from "./valthera";

/** @deprecated */
type GraphCompatible = Graph | GraphRemote;
export * from "@wxn0brp/db-core";
export * from "@wxn0brp/db-client";
export {
    Graph, GraphCompatible, GraphRemote,
    Valthera, ValtheraAutoCreate
};

export type Id = import("@wxn0brp/db-core/types/Id").Id;