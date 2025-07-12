import { existsSync, promises } from "fs";
import { createRL } from "./utils";
import { Search, Updater } from "@wxn0brp/db-core/types/arg";
import { VContext } from "@wxn0brp/db-core/types/types";
import hasFieldsAdvanced from "@wxn0brp/db-core/utils/hasFieldsAdvanced";
import updateObjectAdvanced from "@wxn0brp/db-core/utils/updateObject";
import { parseData, stringifyData } from "../format";
import { pathRepair } from "@wxn0brp/db-core/customFileCpu";

/**
 * Updates a file based on search criteria and an updater function or object.
 */
async function updateWorker(file: string, one: boolean, search: Search, updater: Updater, context: VContext = {}) {
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

        const data = parseData(line);
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
            line = await stringifyData(updateObj);
            updated = true;
        }

        await promises.appendFile(file, line + "\n");
    }
    await promises.writeFile(file + ".tmp", "");
    return updated;
}

export default updateWorker;