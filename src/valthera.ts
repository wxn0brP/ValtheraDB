import { ValtheraClass } from "@wxn0brp/db-core/db/valthera";
import type { VDB } from "@wxn0brp/db-resolver/v";
import { FileActions } from "@wxn0brp/db-storage-dir";
import { vFileCpu } from "@wxn0brp/db-storage-dir/file/index";
import { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
import type { ValtheraCreate } from ".";

/**
 * Low-level API.
 *
 * Prefer {@link ValtheraCreate} or {@link VDB} for most use cases.
 * This class remains supported for advanced and specialized use cases.
 */
export class Valthera extends ValtheraClass {
	constructor(folder: string, options: DbDirOpts = {}, fileCpu = vFileCpu) {
		options.format ||= "json5:x";
		super({
			...options,
			dbAction: new FileActions(folder, options, fileCpu),
		});
	}
}
