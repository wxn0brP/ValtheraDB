import dbActionC from "./action.js";
import executorC from "./executor.js";
import CollectionManager from "./CollectionManager.js";
import vFileCpu from "./file/index.js";
import { EventEmitter } from "events";
/**
 * Represents a database management class for performing CRUD operations.
 * @class
 */
class Valthera {
    dbAction;
    executor;
    emiter;
    constructor(folder, options = {}, fileCpu) {
        if (!fileCpu)
            fileCpu = vFileCpu;
        this.dbAction = options.dbAction || new dbActionC(folder, options, fileCpu);
        this.executor = options.executor || new executorC();
        this.emiter = new EventEmitter();
    }
    async execute(name, ...args) {
        const result = await this.executor.addOp(this.dbAction[name].bind(this.dbAction), ...args);
        if (this.emiter.listeners(name).length !== 0)
            this.emiter.emit(name, args, result);
        if (this.emiter.listeners("*").length !== 0)
            this.emiter.emit("*", name, args, result);
        return result;
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
        return await this.execute("getCollections");
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        return await this.execute("checkCollection", collection);
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        return await this.execute("issetCollection", collection);
    }
    /**
     * Add data to a database.
     */
    async add(collection, data, id_gen = true) {
        return await this.execute("add", collection, data, id_gen);
    }
    /**
     * Find data in a database.
     */
    async find(collection, search, context = {}, options = {}, findOpts = {}) {
        return await this.execute("find", collection, search, context, options, findOpts);
    }
    /**
     * Find one data entry in a database.
     */
    async findOne(collection, search, context = {}, findOpts = {}) {
        return await this.execute("findOne", collection, search, context, findOpts);
    }
    /**
     * Find data in a database as a stream.
     */
    async findStream(collection, search, context = {}, findOpts = {}, limit = -1) {
        return await this.execute("findStream", collection, search, context, findOpts, limit);
    }
    /**
     * Update data in a database.
     */
    async update(collection, search, updater, context = {}) {
        return await this.execute("update", collection, search, updater, context);
    }
    /**
     * Update one data entry in a database.
     */
    async updateOne(collection, search, updater, context = {}) {
        return await this.execute("updateOne", collection, search, updater, context);
    }
    /**
     * Remove data from a database.
     */
    async remove(collection, search, context = {}) {
        return await this.execute("remove", collection, search, context);
    }
    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection, search, context = {}) {
        return await this.execute("removeOne", collection, search, context);
    }
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection, search, updater, add_arg = {}, context = {}, id_gen = true) {
        const res = await this.updateOne(collection, search, updater, context);
        if (!res) {
            const assignData = [];
            function assignDataPush(data) {
                if (typeof data !== "object" || Array.isArray(data))
                    return;
                const obj = {};
                for (const key of Object.keys(data)) {
                    if (key.startsWith("$")) {
                        Object.keys(data[key]).forEach((k) => {
                            obj[k] = data[key][k];
                        });
                    }
                    else
                        obj[key] = data[key];
                }
                assignData.push(obj);
            }
            assignDataPush(search);
            assignDataPush(updater);
            assignDataPush(add_arg);
            await this.add(collection, Object.assign({}, ...assignData), id_gen);
        }
        return res;
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection) {
        return await this.execute("removeCollection", collection);
    }
    /**
     * Execute a transaction.
     */
    async transaction(collection, transaction) {
        return await this.execute("transaction", collection, transaction);
    }
}
export default Valthera;
