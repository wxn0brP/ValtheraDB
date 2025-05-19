import { existsSync, promises } from "fs";
import { pathRepair, createRL } from "./utils.js";
import { parse } from "../helpers/format.js";
import hasFieldsAdvanced from "../utils/hasFieldsAdvanced.js";
import updateFindObject from "../utils/updateFindObject.js";
/**
 * Processes a line of text from a file and checks if it matches the search criteria.
 */
async function findProcesLine(arg, line, context = {}, findOpts = {}) {
    const ob = parse(line);
    let res = false;
    if (typeof arg === "function") {
        if (arg(ob, context))
            res = true;
    }
    else if (typeof arg === "object" && !Array.isArray(arg)) {
        if (hasFieldsAdvanced(ob, arg))
            res = true;
    }
    if (res)
        return updateFindObject(ob, findOpts);
    return null;
}
/**
 * Asynchronously finds entries in a file based on search criteria.
 */
export async function find(file, arg, context = {}, findOpts = {}) {
    file = pathRepair(file);
    return await new Promise(async (resolve) => {
        if (!existsSync(file)) {
            await promises.writeFile(file, "");
            resolve(false);
            return;
        }
        const rl = createRL(file);
        const resF = [];
        for await (const line of rl) {
            if (line == "" || !line)
                continue;
            const res = await findProcesLine(arg, line, context, findOpts);
            if (res)
                resF.push(res);
        }
        ;
        resolve(resF);
        rl.close();
    });
}
/**
 * Asynchronously finds one entry in a file based on search criteria.
 */
export async function findOne(file, arg, context = {}, findOpts = {}) {
    file = pathRepair(file);
    return await new Promise(async (resolve) => {
        if (!existsSync(file)) {
            await promises.writeFile(file, "");
            resolve(false);
            return;
        }
        const rl = createRL(file);
        for await (const line of rl) {
            if (line == "" || !line)
                continue;
            const res = await findProcesLine(arg, line, context, findOpts);
            if (res) {
                resolve(res);
                rl.close();
            }
        }
        ;
        resolve(false);
    });
}
export async function* findStream(file, arg, context = {}, findOpts = {}, limit = -1) {
    file = pathRepair(file);
    if (!existsSync(file)) {
        await promises.writeFile(file, "");
        return;
    }
    const rl = createRL(file);
    try {
        let count = 0;
        for await (const line of rl) {
            if (!line?.trim())
                continue;
            const res = await findProcesLine(arg, line, context, findOpts);
            if (res) {
                yield res;
                count++;
                if (limit > 0 && count >= limit) {
                    rl.close();
                    return;
                }
            }
        }
    }
    finally {
        rl.close();
    }
}
