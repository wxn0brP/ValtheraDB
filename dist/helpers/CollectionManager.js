class CollectionManager {
    db;
    collection;
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    /**
     * Add data to a database.
     */
    async add(data, id_gen = true) {
        return await this.db.add(this.collection, data, id_gen);
    }
    /**
     * Find data in a database.
     */
    async find(search, context = {}, options = {}, findOpts = {}) {
        return await this.db.find(this.collection, search, context, options, findOpts);
    }
    /**
     * Find one data entry in a database.
     */
    async findOne(search, context = {}, findOpts = {}) {
        return await this.db.findOne(this.collection, search, context, findOpts);
    }
    /**
     * Update data in a database.
     */
    async update(search, updater, context = {}) {
        return await this.db.update(this.collection, search, updater, context);
    }
    /**
     * Update one data entry in a database.
     */
    async updateOne(search, updater, context = {}) {
        return await this.db.updateOne(this.collection, search, updater, context);
    }
    /**
     * Remove data from a database.
     */
    async remove(search, context = {}) {
        return await this.db.remove(this.collection, search, context);
    }
    /**
     * Remove one data entry from a database.
     */
    async removeOne(search, context = {}) {
        return await this.db.removeOne(this.collection, search, context);
    }
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(search, updater, add_arg = {}, context = {}, id_gen = true) {
        return await this.db.updateOneOrAdd(this.collection, search, updater, add_arg, context, id_gen);
    }
}
export default CollectionManager;
