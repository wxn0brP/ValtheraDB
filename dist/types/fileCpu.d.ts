import { Search, Updater } from "./arg.js";
import Data from "./data.js";
import { FindOpts } from "./options.js";
import { Transaction } from "./transactions.js";
import { Context } from "./types.js";
interface FileCpu {
    add(file: string, data: Data): Promise<void>;
    find(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any[] | false>;
    findOne(file: string, arg: Search, context?: Context, findOpts?: FindOpts): Promise<any | false>;
    findStream(file: string, arg: Search, context?: Context, findOpts?: FindOpts, limit?: number): AsyncGenerator<any>;
    remove(file: string, one: boolean, arg: Search, context?: Context): Promise<boolean>;
    update(file: string, one: boolean, arg: Search, updater: Updater, context?: Context): Promise<boolean>;
    transactions(file: string, transactions: Transaction[]): Promise<void>;
}
export default FileCpu;
