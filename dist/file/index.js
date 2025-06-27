import update from "./update.js";
import remove from "./remove.js";
import { find, findOne } from "./find.js";
import { appendFileSync } from "fs";
import { stringify } from "../helpers/format.js";
const vFileCpu = {
    add: async (file, data) => {
        const dataString = stringify(data);
        appendFileSync(file, dataString + "\n");
    },
    find,
    findOne,
    update,
    remove,
};
export default vFileCpu;
