import DataBase from "./database.js";
import Data from "./types/data.js";
export default class ValtheraMemory extends DataBase {
    constructor(...args: any[]);
}
export declare function createMemoryValthera(data?: {
    [key: string]: Data[];
}): ValtheraMemory;
