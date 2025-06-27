import { setDataUsingUpdateOneOrAdd } from "../helpers/updateOneOrAdd.js";
class dbActionBase {
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
    async update(config) {
        throw new Error("Not implemented");
        return false;
    }
    async updateOne(config) {
        throw new Error("Not implemented");
        return false;
    }
    async remove(config) {
        throw new Error("Not implemented");
        return false;
    }
    async removeOne(config) {
        throw new Error("Not implemented");
        return false;
    }
    async removeCollection(config) {
        throw new Error("Not implemented");
        return false;
    }
    async updateOneOrAdd(config) {
        const res = await this.updateOne(config);
        if (!res) {
            setDataUsingUpdateOneOrAdd(config);
            await this.add(config);
        }
        return res;
    }
}
export default dbActionBase;
