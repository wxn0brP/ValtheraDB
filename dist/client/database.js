import ky from "ky";
import CollectionManager from "../CollectionManager.js";
import serializeFunctions from "./function.js";
/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 * @class
 */
class DataBaseRemote {
    remote;
    constructor(remote) {
        this.remote = remote;
    }
    /**
     * Make a request to the remote database.
     */
    async _request(type, params = []) {
        const processed = serializeFunctions(params);
        const data = {
            db: this.remote.name,
            params: processed.data,
            keys: processed.keys
        };
        const res = await ky.post(this.remote.url + "/db/" + type, {
            json: data,
            headers: {
                "Authorization": this.remote.auth
            },
            throwHttpErrors: false
        }).json();
        if (res.err)
            throw new Error(res.msg);
        return res.result;
    }
    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection) {
        return new CollectionManager(this, collection);
    }
    /**
     * Get the names of all available databases.
     */
    async getCollections() {
        return await this._request("getCollections", []);
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        return await this._request("checkCollection", [collection]);
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        return await this._request("issetCollection", [collection]);
    }
    /**
     * Add data to a database.
     */
    async add(collection, data, id_gen = true) {
        return await this._request("add", [collection, data, id_gen]);
    }
    /**
     * Find data in a database.
     */
    async find(collection, search, context = {}, options = {}, findOpts = {}) {
        return await this._request("find", [collection, search, context, options, findOpts]);
    }
    /**
     * Find one data entry in a database.
     */
    async findOne(collection, search, context = {}, findOpts = {}) {
        return await this._request("findOne", [collection, search, context, findOpts]);
    }
    /**
     * Find data in a database as a stream.
     */
    async findStream(collection, search, context = {}, dbFindOpts = {}, findOpts = {}) {
        throw new Error("Method not implemented.");
    }
    /**
     * Update data in a database.
     */
    async update(collection, search, updater, context = {}) {
        return await this._request("update", [collection, search, updater, context]);
    }
    /**
     * Update one data entry in a database.
     */
    async updateOne(collection, search, updater, context = {}) {
        return await this._request("updateOne", [collection, search, updater, context]);
    }
    /**
     * Remove data from a database.
     */
    async remove(collection, search, context = {}) {
        return await this._request("remove", [collection, search, context]);
    }
    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection, search, context = {}) {
        return await this._request("removeOne", [collection, search, context]);
    }
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection, search, arg, add_arg = {}, context = {}, id_gen = true) {
        return await this._request("updateOneOrAdd", [collection, search, arg, add_arg, context, id_gen]);
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(name) {
        return await this._request("removeCollection", [name]);
    }
    /**
     * Execute a transaction.
     */
    async transaction(collection, transaction) {
        return await this._request("transaction", [collection, transaction]);
    }
}
export default DataBaseRemote;
