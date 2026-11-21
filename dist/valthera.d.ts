import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
/**
 * Low-level API.
 *
 * Prefer {@link ValtheraCreate} or {@link VDB} for most use cases.
 * This class remains supported for advanced and specialized use cases.
 */
export declare class Valthera extends ValtheraClass {
    constructor(folder: string, options?: DbDirOpts, fileCpu?: import("@wxn0brp/db-core/types/fileCpu").FileCpu);
}
