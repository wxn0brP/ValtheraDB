import CollectionManager from "../helpers/CollectionManager.js";
import Data from "../types/data.js";
import { VQuery } from "../types/query.js";
import { ValtheraCompatibleInternal } from "../types/valthera.js";
declare class ValtheraBase implements ValtheraCompatibleInternal {
    version: string;
    c(config: VQuery): CollectionManager;
    getCollections(): Promise<any[]>;
    checkCollection(config: VQuery): Promise<boolean>;
    issetCollection(config: VQuery): Promise<boolean>;
    add<T = Data>(config: VQuery): Promise<T>;
    find<T = Data>(config: VQuery): Promise<T[]>;
    findOne<T = Data>(config: VQuery): Promise<T>;
    remove(config: VQuery): Promise<boolean>;
    removeCollection(config: VQuery): Promise<boolean>;
    removeOne(config: VQuery): Promise<boolean>;
    update(config: VQuery): Promise<boolean>;
    updateOne(config: VQuery): Promise<boolean>;
    updateOneOrAdd(config: VQuery): Promise<boolean>;
}
export default ValtheraBase;
