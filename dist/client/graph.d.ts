import { Remote } from "./remote.js";
/**
 * A class representing a graph database.
 * Uses a remote database.
 * @class
 */
declare class GraphRemote {
    remote: Remote;
    /**
     * Create a new database instance.
     */
    constructor(remote: Remote | string);
    /**
     * Make a request to the remote database.
     */
    _request(type: string, params?: any[]): Promise<any>;
    /**
     * Adds an edge between two nodes.
     */
    add(collection: string, nodeA: string, nodeB: string): Promise<any>;
    /**
     * Removes an edge between two nodes.
     */
    remove(collection: string, nodeA: string, nodeB: string): Promise<any>;
    /**
     * Finds all edges with either node equal to `node`.
     */
    find(collection: string, node: string): Promise<any>;
    /**
     * Finds one edge with either node equal to `nodeA` and the other equal to `nodeB`.
     */
    findOne(collection: string, nodeA: string, nodeB: string): Promise<any>;
    /**
     * Get all edges in the collection.
     */
    getAll(collection: string): Promise<any>;
    /**
     * Get the names of all available databases.
     */
    getCollections(): Promise<any>;
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    checkCollection(collection: string): Promise<any>;
    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string): Promise<any>;
    /**
     * Remove the specified collection.
     */
    removeCollection(collection: string): Promise<any>;
}
export default GraphRemote;
