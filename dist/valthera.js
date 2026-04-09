import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { FileActions } from "@wxn0brp/db-storage-dir";
import { vFileCpu } from "@wxn0brp/db-storage-dir/file/index";
export class Valthera extends ValtheraClass {
    constructor(folder, options = {}, fileCpu = vFileCpu) {
        super({
            ...options,
            dbAction: new FileActions(folder, options, fileCpu)
        });
    }
}
