import DataBase from "./database.js";
import DataBaseRemote from "./client/database.js";
import { Arg, Search, Updater } from "./types/arg.js";
import { DbFindOpts, FindOpts } from "./types/options.js";
import { Context } from "./types/types.js";
import Data from "./types/data.js";

class CollectionManager{
    db: DataBase | DataBaseRemote;
    collection: string;

    constructor(db: DataBase | DataBaseRemote, collection: string){
        this.db = db;
        this.collection = collection;
    }

    /**
     * Add data to a database.
     */
    async add<T=Data>(data: Arg, id_gen: boolean=true){
        return await this.db.add(this.collection, data, id_gen) as T;
    }

    /**
     * Find data in a database.
     */
    async find<T=Data>(search: Search, context: Context={}, options: DbFindOpts={}, findOpts: FindOpts={}){
        return await this.db.find(this.collection, search, context, options, findOpts) as T[];
    }

    /**
     * Find one data entry in a database.
     */
    async findOne<T=Data>(search: Search, context: Context={}, findOpts: FindOpts={}){
        return await this.db.findOne(this.collection, search, context, findOpts) as (T|null);
    }

    /**
     * Update data in a database.
     */
    async update(search: Search, updater: Updater, context: Context={}){
        return await this.db.update(this.collection, search, updater, context) as boolean;
    }

    /**
     * Update one data entry in a database.
     */
    async updateOne(search: Search, updater: Updater, context: Context={}){
        return await this.db.updateOne(this.collection, search, updater, context) as boolean;
    }

    /**
     * Remove data from a database.
     */
    async remove(search: Search, context: Context={}){
        return await this.db.remove(this.collection, search, context) as boolean;
    }

    /**
     * Remove one data entry from a database.
     */
    async removeOne(search: Search, context: Context={}){
        return await this.db.removeOne(this.collection, search, context) as boolean;
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(search: Search, updater: Updater, add_arg: Arg={}, context: Context={}, id_gen: boolean=true){
        return await this.db.updateOneOrAdd(this.collection, search, updater, add_arg, context, id_gen) as boolean;
    }
}

export default CollectionManager;
