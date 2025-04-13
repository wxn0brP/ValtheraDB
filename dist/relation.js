async function processRelations(dbs, cfg, data) {
    if (!data)
        return;
    for (const [key, relation] of Object.entries(cfg)) {
        const { pk = "_id", fk = "_id", type = "1" } = relation;
        if (type === "1") {
            const db = dbs[relation.path[0]];
            const collection = relation.path[1];
            const item = await db.findOne(collection, { [fk]: data[pk] }, {}, { select: relation.select || null });
            const field = relation.as || key;
            if (!item) {
                data[field] = null;
                continue;
            }
            if (relation.relations) {
                await processRelations(dbs, relation.relations, item);
            }
            data[field] = item;
        }
        else if (type === "1n") {
            const db = dbs[relation.path[0]];
            const collection = relation.path[1];
            const items = await db.find(collection, { [fk]: data[pk] }, {}, relation.findOpts || {}, { select: relation.select || null });
            const field = relation.as || key;
            if (relation.relations) {
                await Promise.all(items.map(item => processRelations(dbs, relation.relations, item)));
            }
            data[field] = items;
        }
        else if (type === "nm") {
            const db = dbs[relation.path[0]];
            const collection = relation.path[1];
            const items = await db.find(collection, {}, {}, {}, { select: relation.select || null });
            const field = relation.as || key;
            if (relation.relations) {
                await Promise.all(items.map(item => processRelations(dbs, relation.relations, item)));
            }
            data[field] = items;
        }
        else {
            throw new Error(`Unknown relation type: ${relation.type}`);
        }
    }
}
function selectDataSelf(data, select) {
    if (!data)
        return null;
    if (!select || select.length === 0)
        return data;
    if (Array.isArray(data))
        return data.map(item => selectDataSelf(item, select));
    return selectDataSelf(data[select[0]], select.slice(1));
}
function selectData(data, select) {
    if (!select)
        return data;
    if (!data && select.length === 0)
        return null;
    const newData = {};
    for (const field of select) {
        const key = field.map(f => f.replaceAll(".", "\\.")).join(".");
        newData[key] = selectDataSelf(data, field);
    }
    return newData;
}
class Relation {
    dbs;
    constructor(dbs) {
        this.dbs = dbs;
    }
    async findOne(path, search, relations, select) {
        const db = this.dbs[path[0]];
        const data = await db.findOne(path[1], search);
        await processRelations(this.dbs, relations, data);
        const result = selectData(data, select);
        return Object.keys(result).length === 0 ? null : result;
    }
    async find(path, search, relations, select, findOpts = {}) {
        const db = this.dbs[path[0]];
        const data = await db.find(path[1], search, {}, findOpts);
        await Promise.all(data.map(item => processRelations(this.dbs, relations, item)));
        return data.map(item => selectData(item, select));
    }
}
export default Relation;
