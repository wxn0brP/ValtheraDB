import update from "./update";
import remove from "./remove";
import { find, findOne } from "./find";
import { appendFileSync } from "fs";
import { Arg } from "@wxn0brp/db-core/types/arg";
import { stringifyData } from "../format";
import FileCpu from "@wxn0brp/db-core/types/fileCpu";

const vFileCpu: FileCpu = {
    add: async (file: string, data: Arg) => {
        const dataString = stringifyData(data);
        appendFileSync(file, dataString + "\n");
    },
    find,
    findOne,
    update,
    remove,
}

export default vFileCpu;