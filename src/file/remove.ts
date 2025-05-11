import { existsSync, promises, appendFileSync } from "fs";
import { pathRepair, createRL } from "./utils";
import { parse } from "../helpers/format";
import hasFieldsAdvanced from "../utils/hasFieldsAdvanced";
import { Search } from "../types/arg";
import { Context } from "../types/types";

/**
 * Removes entries from a file based on search criteria.
 */
async function removeWorker(file: string, one: boolean, search: Search, context: Context = {}) {
    file = pathRepair(file);
    if (!existsSync(file)) {
        await promises.writeFile(file, "");
        return false;
    }
    await promises.copyFile(file, file + ".tmp");
    await promises.writeFile(file, "");

    const rl = createRL(file + ".tmp");

    let removed = false;
    for await (let line of rl) {
        if (one && removed) {
            appendFileSync(file, line + "\n");
            continue;
        }

        const data = parse(line);

        if (typeof search === "function") {
            if (search(data, context)) {
                removed = true;
                continue;
            }
        } else if (typeof search === "object" && !Array.isArray(search)) {
            if (hasFieldsAdvanced(data, search)) {
                removed = true;
                continue;
            }
        }

        appendFileSync(file, line + "\n");
    }
    await promises.writeFile(file + ".tmp", "");
    return removed;
}

export default removeWorker;