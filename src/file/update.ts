import { existsSync, promises } from "fs";
import { pathRepair, createRL } from "./utils";
import { parse, stringify } from "../helpers/format";
import hasFieldsAdvanced from "../utils/hasFieldsAdvanced";
import updateObjectAdvanced from "../utils/updateObject";
import { Context } from "../types/types";
import { Search, Updater } from "../types/arg";

/**
 * Updates a file based on search criteria and an updater function or object.
 */
async function updateWorker(file: string, one: boolean, search: Search, updater: Updater, context: Context = {}) {
    file = pathRepair(file);
    if (!existsSync(file)) {
        await promises.writeFile(file, "");
        return false;
    }
    await promises.copyFile(file, file + ".tmp");
    await promises.writeFile(file, "");

    const rl = createRL(file + ".tmp");

    let updated = false;
    for await (let line of rl) {
        if (one && updated) {
            await promises.appendFile(file, line + "\n");
            continue;
        }

        const data = parse(line);
        let ob = false;

        if (typeof search === "function") {
            ob = search(data, context) || false;
        } else if (typeof search === "object" && !Array.isArray(search)) {
            ob = hasFieldsAdvanced(data, search);
        }

        if (ob) {
            let updateObj = data;
            if (typeof updater === "function") {
                const updateObjValue = updater(data, context);
                if (updateObjValue) updateObj = updateObjValue;
            } else if (typeof updater === "object" && !Array.isArray(updater)) {
                updateObj = updateObjectAdvanced(data, updater);
            }
            line = await stringify(updateObj);
            updated = true;
        }

        await promises.appendFile(file, line + "\n");
    }
    await promises.writeFile(file + ".tmp", "");
    return updated;
}

export default updateWorker;