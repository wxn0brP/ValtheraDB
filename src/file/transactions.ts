import { existsSync, promises } from "fs";
import { parse, stringify } from "../helpers/format";
import genId from "../helpers/gen";
import { Updater } from "../types/arg";
import { Transaction } from "../types/transactions";
import { Context } from "../types/types";
import hasFieldsAdvanced from "../utils/hasFieldsAdvanced";
import updateObjectAdvanced from "../utils/updateObject";
import { createRL, pathRepair } from "./utils";

async function processTransactions(file: string, transactions: Transaction[]) {
    file = pathRepair(file);
    const tempFile = file + ".tmp";

    const processedTransactions = transactions.map(t => ({
        ...t,
        applied: false
    }));

    if (existsSync(file)) {
        await promises.copyFile(file, tempFile);
    } else {
        await promises.writeFile(file, "");
        await promises.writeFile(tempFile, "");
    }

    await promises.writeFile(file, "");

    const rl = createRL(tempFile);

    for await (const line of rl) {
        const originalLine = line.trim();
        if (!originalLine) continue;

        let data = parse(originalLine);
        let shouldRemove = false;
        let modified = false;

        for (const transaction of processedTransactions) {
            if (shouldRemove) break;

            let matches = false;
            if (typeof transaction.search === 'function') {
                matches = transaction.search(data, transaction.context || {}) || false;
            } else if (typeof transaction.search === 'object') {
                matches = hasFieldsAdvanced(data, transaction.search);
            }

            if (!matches) continue;

            switch (transaction.type) {
                case 'update':
                    if (transaction.updater) {
                        data = applyUpdater(data, transaction.updater, transaction.context || {});
                        modified = true;
                    }
                    break;

                case 'updateOne':
                    if (!transaction.applied && transaction.updater) {
                        data = applyUpdater(data, transaction.updater, transaction.context || {});
                        modified = true;
                        transaction.applied = true;
                    }
                    break;

                case 'updateOneOrAdd':
                    if (!transaction.applied && transaction.updater) {
                        data = applyUpdater(data, transaction.updater, transaction.context || {});
                        modified = true;
                        transaction.applied = true;
                    }
                    break;

                case 'remove':
                    shouldRemove = true;
                    modified = true;
                    break;

                case 'removeOne':
                    if (!transaction.applied) {
                        shouldRemove = true;
                        modified = true;
                        transaction.applied = true;
                    }
                    break;
            }
        }

        if (!shouldRemove) {
            const outputLine = modified ? await stringify(data) : originalLine;
            await promises.appendFile(file, outputLine + "\n");
        }
    }

    for (const transaction of processedTransactions) {
        if (transaction.type === 'updateOneOrAdd' && !transaction.applied) {
            const assignData = [];

            if (typeof transaction.search === 'object' && !Array.isArray(transaction.search)) {
                assignData.push(transaction.search);
            }

            if (transaction.updater && typeof transaction.updater === 'object' && !Array.isArray(transaction.updater)) {
                const newData = {};
                Object.keys(transaction.updater).filter(key => !key.startsWith('$')).forEach(key => newData[key] = transaction.updater[key]);
                assignData.push(newData);
            }

            if (transaction.addArg && typeof transaction.addArg === 'object' && !Array.isArray(transaction.addArg)) {
                assignData.push(transaction.addArg);
            }

            let newData = Object.assign({}, ...assignData);

            if (transaction.updater && typeof transaction.updater === 'object' && !Array.isArray(transaction.updater)) {
                newData = applyUpdater(newData, transaction.updater, transaction.context || {});
            }
            await add(file, newData, transaction.idGen !== false);
        }
    }

    await promises.unlink(tempFile);
}

function applyUpdater(data: any, updater: Updater, context: Context = {}): any {
    if (typeof updater === 'function') {
        const result = updater(data, context);
        return data === null ? result : (result || data);
    }

    if (typeof updater === 'object' && !Array.isArray(updater)) {
        return updateObjectAdvanced(data || {}, updater);
    }

    return data;
}

async function add(file: string, data: Record<string, any>, idGen: boolean) {
    if (idGen && !data._id) data._id = genId();
    await promises.appendFile(file, await stringify(data) + "\n");
}

export default processTransactions;
