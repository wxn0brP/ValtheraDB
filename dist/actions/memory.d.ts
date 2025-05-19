import dbActionBase from "../base/actions.js";
import Valthera from "../db/valthera.js";
import Data from "../types/data.js";
import FileCpu from "../types/fileCpu.js";
import { DbOpts } from "../types/options.js";
import { VQuery } from "../types/query.js";
export declare class MemoryAction extends dbActionBase {
    folder: string;
    options: DbOpts;
    fileCpu: FileCpu;
    memory: Map<string, any[]>;
    constructor();
    _readMemory(key: string): any[];
    _writeMemory(key: string, data: any[]): void;
    _getCollectionPath(collection: string): string;
    getCollections(): Promise<string[]>;
    checkCollection({ collection }: VQuery): Promise<boolean>;
    issetCollection({ collection }: VQuery): Promise<boolean>;
    add({ collection, data, id_gen }: VQuery): Promise<import("../types/arg.js").Arg>;
    find({ collection, search, context, dbFindOpts, findOpts }: VQuery): Promise<Data[]>;
    findOne({ collection, search, context, findOpts }: VQuery): Promise<Data>;
    findStream({ collection, search, context, findOpts, limit }: VQuery): AsyncGenerator<any>;
    update({ collection, search, updater, context }: VQuery): Promise<boolean>;
    updateOne({ collection, search, updater, context }: VQuery): Promise<boolean>;
    remove({ collection, search, context }: VQuery): Promise<boolean>;
    removeOne({ collection, search, context }: VQuery): Promise<boolean>;
    removeCollection({ collection }: VQuery): Promise<boolean>;
    transaction({ collection, transaction }: VQuery): Promise<boolean>;
}
export default class ValtheraMemory extends Valthera {
    constructor(...args: any[]);
}
export declare function createMemoryValthera<T = {
    [key: string]: Data[];
}>(data?: T): ValtheraMemory;
