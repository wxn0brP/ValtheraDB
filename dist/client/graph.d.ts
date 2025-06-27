import { Remote } from "./remote.js";
declare class GraphRemote {
    remote: Remote;
    constructor(remote: Remote | string);
    _request(type: string, params?: any[]): Promise<any>;
    add(collection: string, nodeA: string, nodeB: string): Promise<any>;
    remove(collection: string, nodeA: string, nodeB: string): Promise<any>;
    find(collection: string, node: string): Promise<any>;
    findOne(collection: string, nodeA: string, nodeB: string): Promise<any>;
    getAll(collection: string): Promise<any>;
    getCollections(): Promise<any>;
    checkCollection(collection: string): Promise<any>;
    issetCollection(collection: string): Promise<any>;
    removeCollection(collection: string): Promise<any>;
}
export default GraphRemote;
