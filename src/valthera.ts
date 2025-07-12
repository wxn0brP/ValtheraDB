import ValtheraClass from "@wxn0brp/db-core/db/valthera"
import executorC from "@wxn0brp/db-core/helpers/executor";
import FileCpu from "@wxn0brp/db-core/types/fileCpu";
import { DbOpts } from "@wxn0brp/db-core/types/options";
import dbActionC from "@wxn0brp/db-plugin-dir/action";
import vFileCpu from "@wxn0brp/db-plugin-dir/file/index";

export class Valthera extends ValtheraClass {
    constructor(folder: string, options: DbOpts = {}, fileCpu?: FileCpu) {
        super(options);
        if(!fileCpu) fileCpu = vFileCpu;
        this.dbAction = options.dbAction || new dbActionC(folder, options, fileCpu);
        this.executor = options.executor || new executorC();
    }
}

export default Valthera;