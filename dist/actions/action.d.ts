import dbActionBase from "../base/actions.js";
import Data from "../types/data.js";
import FileCpu from "../types/fileCpu.js";
import { DbOpts } from "../types/options.js";
import { VQuery } from "../types/query.js";
declare class dbActionC extends dbActionBase {
    folder: string;
    options: DbOpts;
    fileCpu: FileCpu;
    constructor(folder: string, options: DbOpts, fileCpu: FileCpu);
    _getCollectionPath(collection: string): string;
    getCollections(): Promise<string[]>;
    checkCollection({ collection }: VQuery): Promise<boolean>;
    issetCollection({ collection }: VQuery): Promise<boolean>;
    add({ collection, data, id_gen }: VQuery): Promise<import("../types/arg.js").Arg>;
    find({ collection, search, context, dbFindOpts, findOpts }: VQuery): Promise<Data[]>;
    findOne({ collection, search, context, findOpts }: VQuery): Promise<Data>;
    update({ collection, search, updater, context }: VQuery): Promise<boolean>;
    updateOne({ collection, search, updater, context }: VQuery): Promise<boolean>;
    remove({ collection, search, context }: VQuery): Promise<boolean>;
    removeOne({ collection, search, context }: VQuery): Promise<boolean>;
    removeCollection({ collection }: {
        collection: any;
    }): Promise<boolean>;
}
export default dbActionC;
