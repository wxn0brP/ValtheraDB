import { Search, Updater } from "./arg.js";
import Data from "./data.js";
import { FindOpts } from "./options.js";
import { Context } from "./types.js";
interface FileCpu {
    add(file: string, data: Data): Promise<void>;
    find(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any[] | false>;
    findOne(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any | false>;
    remove(file: string, one: boolean, arg: Search, context?: Context): Promise<boolean>;
    update(file: string, one: boolean, arg: Search, updater: Updater, context?: Context): Promise<boolean>;
}
export default FileCpu;
