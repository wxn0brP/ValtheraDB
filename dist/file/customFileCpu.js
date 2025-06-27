import hasFieldsAdvanced from "../utils/hasFieldsAdvanced.js";
import updateFindObject from "../utils/updateFindObject.js";
import { pathRepair } from "./utils.js";
class CustomFileCpu {
    _readFile;
    _writeFile;
    constructor(readFile, writeFile) {
        this._readFile = readFile;
        this._writeFile = writeFile;
    }
    async add(file, data) {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        entries.push(data);
        await this._writeFile(file, entries);
    }
    async find(file, arg, context = {}, findOpts = {}) {
        file = pathRepair(file);
        const entries = await this._readFile(file);
        const results = entries.filter(entry => typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg));
        return results.length ? results.map(res => updateFindObject(res, findOpts)) : [];
    }
    async findOne(file, arg, context = {}, findOpts = {}) {
        file = pathRepair(file);
        const entries = await this._readFile(file);
        const result = entries.find(entry => typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg));
        return result ? updateFindObject(result, findOpts) : false;
    }
    async remove(file, one, arg, context = {}) {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        let removed = false;
        entries = entries.filter(entry => {
            if (removed && one)
                return true;
            let match = typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg);
            if (match) {
                removed = true;
                return false;
            }
            return true;
        });
        if (!removed)
            return false;
        await this._writeFile(file, entries);
        return true;
    }
    async update(file, one, arg, updater, context = {}) {
        file = pathRepair(file);
        let entries = await this._readFile(file);
        let updated = false;
        entries = entries.map(entry => {
            if (updated && one)
                return entry;
            let match = typeof arg === "function" ? arg(entry, context) : hasFieldsAdvanced(entry, arg);
            if (match) {
                updated = true;
                return typeof updater === "function" ? updater(entry, context) : { ...entry, ...updater };
            }
            return entry;
        });
        if (!updated)
            return false;
        await this._writeFile(file, entries);
        return true;
    }
}
export default CustomFileCpu;
