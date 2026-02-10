import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { Executor } from "@wxn0brp/db-core/helpers/executor";
import { FileActions } from "@wxn0brp/db-storage-dir";
import { vFileCpu } from "@wxn0brp/db-storage-dir/file/index";
export class Valthera extends ValtheraClass {
    constructor(folder, options = {}, fileCpu) {
        super(options);
        if (!fileCpu)
            fileCpu = vFileCpu;
        this.dbAction = options.dbAction || new FileActions(folder, options, fileCpu);
        this.executor = options.executor || new Executor();
    }
}
