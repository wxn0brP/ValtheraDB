import CollectionManager from "../helpers/CollectionManager";
import Data from "../types/data";
import { VQuery } from "../types/query";
import { ValtheraCompatibleInternal } from "../types/valthera";
import { version } from "../version";

class ValtheraBase implements ValtheraCompatibleInternal {
    version = version;
    
    c(config: VQuery): CollectionManager {
        throw new Error("Not implemented");
    }

    async getCollections() {
        throw new Error("Not implemented");
        return [];
    }

    async checkCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async issetCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async add<T = Data>(config: VQuery) {
        throw new Error("Not implemented");
        return {} as T;
    }

    async find<T = Data>(config: VQuery) {
        throw new Error("Not implemented");
        return [] as T[];
    }

    async findOne<T = Data>(config: VQuery) {
        throw new Error("Not implemented");
        return {} as T;
    }

    async remove(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async removeCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async removeOne(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async update(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async updateOne(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async updateOneOrAdd(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }
}

export default ValtheraBase;