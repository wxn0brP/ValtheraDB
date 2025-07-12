
import { version } from "../version";
import { UniversalEventEmitter } from "../helpers/eventEmiter";
import dbActionBase from "../base/actions";
import CollectionManager from "../helpers/CollectionManager";
import executorC from "../helpers/executor";
import { Arg, Search, Updater } from "../types/arg";
import Data from "../types/data";
import { DbOpts, DbFindOpts, FindOpts } from "../types/options";
import { VContext } from "../types/types";
import { ValtheraCompatible } from "../types/valthera";

type DbActionsFns = keyof {
    [K in keyof dbActionBase as dbActionBase[K] extends (...args: any[]) => any ? K : never]: any;
}

/**
 * Represents a database management class for performing CRUD operations.
 * @class
 */
class ValtheraClass implements ValtheraCompatible {
    dbAction: dbActionBase;
    executor: executorC;
    emiter: UniversalEventEmitter;
    version = version;

    constructor(options: DbOpts = {}) {
        this.dbAction = options.dbAction || new dbActionBase();
        this.executor = options.executor || new executorC();
        this.emiter = new UniversalEventEmitter();
    }

    private async execute<T>(name: DbActionsFns, ...args: any[]) {
        const result = await this.executor.addOp(this.dbAction[name].bind(this.dbAction), ...args) as T;
        if (this.emiter.listenerCount(name) !== 0) this.emiter.emit(name, args, result);
        if (this.emiter.listenerCount("*") !== 0) this.emiter.emit("*", name, args, result);
        return result;
    }

    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection: string) {
        return new CollectionManager(this, collection);
    }

    /**
     * Get the names of all available databases.
     */
    async getCollections() {
        return await this.execute<string[]>("getCollections");
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection: string) {
        return await this.execute<boolean>("checkCollection", { collection });
    }

    /**
     * Check if a collection exists.
     */
    async issetCollection(collection: string) {
        return await this.execute<boolean>("issetCollection", { collection });
    }

    /**
     * Add data to a database.
     */
    async add<T = Data>(collection: string, data: Arg, id_gen: boolean = true) {
        return await this.execute<T>("add", { collection, data, id_gen });
    }

    /**
     * Find data in a database.
     */
    async find<T = Data>(collection: string, search: Search, context: VContext = {}, dbFindOpts: DbFindOpts = {}, findOpts: FindOpts = {}) {
        return await this.execute<T[]>("find", { collection, search, context, dbFindOpts, findOpts });
    }

    /**
     * Find one data entry in a database.
     */
    async findOne<T = Data>(collection: string, search: Search, context: VContext = {}, findOpts: FindOpts = {}) {
        return await this.execute<T | null>("findOne", { collection, search, context, findOpts });
    }

    /**
     * Update data in a database.
     */
    async update(collection: string, search: Search, updater: Updater, context = {}) {
        return await this.execute<boolean>("update", { collection, search, updater, context });
    }

    /**
     * Update one data entry in a database.
     */
    async updateOne(collection: string, search: Search, updater: Updater, context: VContext = {}) {
        return await this.execute<boolean>("updateOne", { collection, search, updater, context });
    }

    /**
     * Remove data from a database.
     */
    async remove(collection: string, search: Search, context: VContext = {}) {
        return await this.execute<boolean>("remove", { collection, search, context });
    }

    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection: string, search: Search, context: VContext = {}) {
        return await this.execute<boolean>("removeOne", { collection, search, context });
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection: string, search: Search, updater: Updater, add_arg: Arg = {}, context: VContext = {}, id_gen: boolean = true) {
        return await this.execute<boolean>("updateOneOrAdd", { collection, search, updater, add_arg, context, id_gen });
    }

    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(collection: string) {
        return await this.execute<boolean>("removeCollection", { collection });
    }
}

export default ValtheraClass;