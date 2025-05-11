import update from "./update";
import remove from "./remove";
import { find, findOne, findStream } from "./find";
import FileCpu from "../types/fileCpu";
import { appendFileSync } from "fs";
import { Arg } from "../types/arg";
import { stringify } from "../helpers/format";
import transactions from "./transactions";

const vFileCpu: FileCpu = {
    add: async (file: string, data: Arg) => {
        const dataString = stringify(data);
        appendFileSync(file, dataString + "\n");
    },
    find,
    findOne,
    findStream,
    update,
    remove,
    transactions
}

export default vFileCpu;