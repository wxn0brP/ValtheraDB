import Data from "@wxn0brp/db-core/types/data";
import Valthera from "./valthera.js";
/**
 * A class representing a graph database.
 * @class
 * @deprecated
 */
declare class Graph {
    db: Valthera;
    constructor(databaseFolder: string);
    /**
     * Adds an edge between two nodes.
     */
    add(collection: string, nodeA: string, nodeB: string): Promise<{
        a: string;
        b: string;
    }>;
    /**
     * Removes an edge between two nodes.
     */
    remove(collection: string, nodeA: string, nodeB: string): Promise<boolean>;
    /**
     * Finds all edges with either node equal to `node`.
     */
    find(collection: string, node: string): Promise<Data[]>;
    /**
     * Finds one edge with either node equal to `nodeA` and the other equal to `nodeB`.
     */
    findOne(collection: string, nodeA: string, nodeB: string): Promise<Data>;
    /**
     * Gets all edges in the database.
     */
    getAll(collection: string): Promise<Data[]>;
    /**
     * Get the names of all available databases.
     */
    getCollections(): Promise<string[]>;
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    ensureCollection(collection: string): Promise<void>;
    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string): Promise<boolean>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(collection: string): void;
}
export default Graph;
