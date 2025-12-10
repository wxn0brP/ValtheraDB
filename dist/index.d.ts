import GraphRemote from "@wxn0brp/db-client/graph";
import { ValtheraAutoCreate } from "./autoCreate.js";
import Graph from "./graph.js";
import { Valthera } from "./valthera.js";
/** @deprecated */
type GraphCompatible = Graph | GraphRemote;
export * from "@wxn0brp/db-core";
export * from "@wxn0brp/db-client";
export { Graph, GraphCompatible, GraphRemote, Valthera, ValtheraAutoCreate };
export type Id = import("@wxn0brp/db-core/types/Id").Id;
