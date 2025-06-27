import Valthera from "./valthera.js";
import Data from "../types/data.js";
declare class Graph {
    db: Valthera;
    constructor(databaseFolder: string);
    add(collection: string, nodeA: string, nodeB: string): Promise<Data>;
    remove(collection: string, nodeA: string, nodeB: string): Promise<boolean>;
    find(collection: string, node: string): Promise<Data[]>;
    findOne(collection: any, nodeA: any, nodeB: any): Promise<Data>;
    getAll(collection: any): Promise<Data[]>;
    getCollections(): Promise<string[]>;
    checkCollection(collection: any): Promise<void>;
    issetCollection(collection: any): Promise<boolean>;
    removeCollection(collection: any): void;
}
export default Graph;
