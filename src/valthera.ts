import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { FileActions } from "@wxn0brp/db-storage-dir";
import { vFileCpu } from "@wxn0brp/db-storage-dir/file/index";
import { DbDirOpts } from "@wxn0brp/db-storage-dir/types";

export class Valthera extends ValtheraClass {
    constructor(folder: string, options: DbDirOpts = {}, fileCpu = vFileCpu) {
        super({
            ...options,
            dbAction: new FileActions(folder, options, fileCpu)
        });
    }
}
