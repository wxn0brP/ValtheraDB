import Data from "../types/data";
import { VQuery } from "../types/query";

class dbActionBase {
    async getCollections() {
        throw new Error("Not implemented");
        return [] as string[];
    }

    async checkCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async issetCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async add(config: VQuery) {
        throw new Error("Not implemented");
        return {} as Data;
    }

    async find(config: VQuery) {
        throw new Error("Not implemented");
        return [] as Data[];
    }

    async findOne(config: VQuery): Promise<Data | null> {
        throw new Error("Not implemented");
        return {} as Data;
    }

    async *findStream(config: VQuery): AsyncGenerator<any> {
        throw new Error("Not implemented");
        return {} as AsyncGenerator<Data>;
    }

    async update(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async updateOne(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async remove(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async removeOne(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async removeCollection(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }

    async transaction(config: VQuery) {
        throw new Error("Not implemented");
        return false;
    }
}

export default dbActionBase;