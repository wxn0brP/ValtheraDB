import { VQuery } from "../types/query";

function assignDataPush(data: any) {
    if (typeof data !== "object" || Array.isArray(data)) return;
    const obj = {};
    for (const key of Object.keys(data)) {
        if (key.startsWith("$")) {
            Object.keys(data[key]).forEach((k) => {
                obj[k] = data[key][k];
            })
        } else
            obj[key] = data[key];
    }
    return obj;
}

export function setDataUsingUpdateOneOrAdd(query: VQuery) {
    query.data = Object.assign(
        {},
        assignDataPush(query.search),
        assignDataPush(query.updater),
        assignDataPush(query.add_arg)
    );
}