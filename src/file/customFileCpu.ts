import { Context } from "../types/types";
import { Search, Updater } from "../types/arg";
import Data from "../types/data";
import FileCpu from "../types/fileCpu";
import { FindOpts } from "../types/options";
import hasFieldsAdvanced from "../utils/hasFieldsAdvanced";
import updateFindObject from "../utils/updateFindObject";
import { pathRepair } from "./utils";
import { Transaction } from "../types/transactions";

export type WriteFile = (file: string, data: any[]) => Promise<void>
export type ReadFile = (file: string) => Promise<any[]>

class CustomFileCpu implements FileCpu {
    _readFile: ReadFile;
    _writeFile: WriteFile;

    constructor(readFile: ReadFile, writeFile: WriteFile) {
        this._readFile = readFile;
        this._writeFile = writeFile;
    }

    async add(file: string, data: Data): Promise<void> {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        entries.push(data);
        await this._writeFile(file, entries);
    }

    async find(file: string, arg: Search, context: Context = {}, findOpts: FindOpts = {}): Promise<any[] | false> {
        file = pathRepair(file);
        const entries = await this._readFile(file);
        const results = entries.filter(entry =>
            typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg)
        );
        return results.length ? results.map(res => updateFindObject(res, findOpts)) : [];
    }

    async findOne(file: string, arg: Search, context: Context = {}, findOpts: FindOpts = {}): Promise<any | false> {
        file = pathRepair(file);
        const entries = await this._readFile(file);
        const result = entries.find(entry =>
            typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg)
        );
        return result ? updateFindObject(result, findOpts) : false;
    }

    async* findStream(file: string, arg: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<any> {
        throw new Error("Method not implemented.");
    }

    async remove(file: string, one: boolean, arg: Search, context: Context = {}): Promise<boolean> {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        let removed = false;

        entries = entries.filter(entry => {
            if (removed && one) return true;

            let match = typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg);

            if (match) {
                removed = true;
                return false;
            }

            return true;
        });

        if (!removed) return false;

        await this._writeFile(file, entries);
        return true;
    }

    async update(file: string, one: boolean, arg: Search, updater: Updater, context: Context = {}): Promise<boolean> {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        let updated = false;

        entries = entries.map(entry => {
            if (updated && one) return entry;

            let match = typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg);

            if (match) {
                updated = true;
                return typeof updater === "function" ? updater(entry, context) : { ...entry, ...updater };
            }

            return entry;
        });

        if (!updated) return false;

        await this._writeFile(file, entries);
        return true;
    }

    transactions(file: string, transactions: Transaction[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default CustomFileCpu;