class Relation {
    databases;
    constructor(databases) {
        this.databases = databases;
    }
    /**
     * Resolves the relation path in format 'dbName.collectionName'.
     */
    _resolvePath(path) {
        if (!path.includes(".")) {
            throw new Error(`Invalid path format "${path}". Expected format 'dbName.collectionName'.`);
        }
        const sanitizedPath = path.replace(/\\\./g, "\uffff");
        const [dbName, collectionName] = sanitizedPath.split(".", 2).map(part => part.replace(/\uffff/g, "."));
        const db = this.databases[dbName];
        if (!db) {
            throw new Error(`Database "${dbName}" not found.`);
        }
        return { db, collection: collectionName };
    }
    /**
     * Processes relations for a single item.
     */
    async _processItemRelations(item, relations) {
        if (!item || typeof item !== "object")
            return item;
        const result = { ...item };
        for (const [field, relationConfig] of Object.entries(relations)) {
            if (!relationConfig.from || !relationConfig.localField || !relationConfig.foreignField) {
                console.warn(`Skipping invalid relation configuration for field: "${field}"`);
                continue;
            }
            try {
                const { db, collection } = this._resolvePath(relationConfig.from);
                const searchQuery = { [relationConfig.foreignField]: item[relationConfig.localField] };
                const fetchFn = relationConfig.multiple ? db.find.bind(db) : db.findOne.bind(db);
                result[relationConfig.as || field] = await fetchFn(collection, searchQuery) || null;
            }
            catch (error) {
                console.error(`Error processing relation for field "${field}":`, error);
            }
        }
        return result;
    }
    /**
     * Finds multiple items with relations.
     */
    async find(path, search, relations = {}, options = {}) {
        const { db, collection } = this._resolvePath(path);
        const items = await db.find(collection, search, {}, options);
        return Promise.all(items.map(item => this._processItemRelations(item, relations)));
    }
    /**
     * Finds a single item with relations.
     */
    async findOne(path, search, relations = {}) {
        const { db, collection } = this._resolvePath(path);
        const item = await db.findOne(collection, search);
        return item ? this._processItemRelations(item, relations) : null;
    }
}
export default Relation;
