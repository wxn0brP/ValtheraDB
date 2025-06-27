import { version } from "../version.js";
class ValtheraBase {
    version = version;
    c(config) {
        throw new Error("Not implemented");
    }
    async getCollections() {
        throw new Error("Not implemented");
        return [];
    }
    async checkCollection(config) {
        throw new Error("Not implemented");
        return false;
    }
    async issetCollection(config) {
        throw new Error("Not implemented");
        return false;
    }
    async add(config) {
        throw new Error("Not implemented");
        return {};
    }
    async find(config) {
        throw new Error("Not implemented");
        return [];
    }
    async findOne(config) {
        throw new Error("Not implemented");
        return {};
    }
    async remove(config) {
        throw new Error("Not implemented");
        return false;
    }
    async removeCollection(config) {
        throw new Error("Not implemented");
        return false;
    }
    async removeOne(config) {
        throw new Error("Not implemented");
        return false;
    }
    async update(config) {
        throw new Error("Not implemented");
        return false;
    }
    async updateOne(config) {
        throw new Error("Not implemented");
        return false;
    }
    async updateOneOrAdd(config) {
        throw new Error("Not implemented");
        return false;
    }
}
export default ValtheraBase;
