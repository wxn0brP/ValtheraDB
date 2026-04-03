# ValtheraDB Storage Adapter Tutorial

This guide shows you how to create custom storage adapters for ValtheraDB. Adapters are organized into **levels** based on complexity - start from the level that matches your needs.

## Architecture Overview

ValtheraDB uses a layered adapter architecture:

```
|-------------------------------------|
|        ValtheraClass (API)          |
|   add, find, update, remove...      |
|-------------------------------------|
                  |
|-------------------------------------|
|   ActionsBase / CustomActionsBase   |
|        Collection management        |
|-------------------------------------|
                  |
|-------------------------------------|
|              FileCpu                |
|     Low-level file operations       |
|-------------------------------------|
                  |
|-------------------------------------|
|     Your Storage Implementation     |
|   (CSV, SQLite, XML, JSON, etc.)    |
|-------------------------------------|
```

> Note: When you replace any layer, you implicitly take responsibility for all layers below it

## Level 1: CustomFileCpu Adapter (Easiest)

**Best for:** Simple file-based storage (JSON, CSV, line-delimited formats)

**What you get:** All CRUD operations support.

**What you implement:** Just `read` and `write` functions and collection management.

### Example: CSV Adapter

See full implementation:

[ValtheraDB-storage-csv/src/action.ts](https://github.com/wxn0brP/ValtheraDB-storage-csv/blob/HEAD/src/action.ts)

Key points:

- Extend `CustomActionsBase`
- Initialize `this.fileCpu = new CustomFileCpu(this.read.bind(this), this.write.bind(this))`
- Implement `read()` - parse file to array of objects
- Implement `write()` - write array of objects to file
- Implement collection management methods (`ensureCollection`, `issetCollection`, etc.)

### When to Use Level 1

✅ Your data fits in memory (entire file is loaded on each operation)  
✅ Simple file formats (JSON, CSV, YAML)  
✅ You want minimal code  
✅ Prototyping or small-scale applications  

❌ Large datasets (GB+)  
❌ Need for partial file reads  
❌ Complex query optimization  

## Level 2: ActionsBase with FileCpu (Intermediate)

**Best for:** File-based storage with custom file formats, streaming, or large datasets.

**What you get:** Query utilities. `updateOneOrAdd` and `toggleOne` support.

**What you implement:** Full `FileCpu` interface + file management logic and collection management.

### Interface

- [ValtheraDB-core/src/types/fileCpu.ts](https://github.com/wxn0brP/ValtheraDB-core/blob/HEAD/src/types/fileCpu.ts)

### Example: Line-Delimited JSON Adapter (dir)

See full implementation:

- [ValtheraDB-storage-dir/src/file/index.ts](https://github.com/wxn0brP/ValtheraDB-storage-dir/blob/HEAD/src/file/index.ts) - FileCpu implementation
- [ValtheraDB-storage-dir/src/action.ts](https://github.com/wxn0brP/ValtheraDB-storage-dir/blob/HEAD/src/action.ts) - ActionsBase implementation

Key points:

- Implement `FileCpu` interface with streaming support
- Extend `ActionsBase` for collection management
- Use `findUtil()` for multi-file queries
- Handle file rotation (max file size)

### When to Use Level 2

✅ Large files that don't fit in memory  
✅ Custom file formats  
✅ Streaming reads required  
✅ Need control over file organization (sharding, rotation)  

❌ Want minimal implementation code  

## Level 3: Full ActionsBase (Advanced)

**Best for:** Database systems, remote APIs, complex storage or full control.

**What you get:** Some utilities.

**What you implement:** Everything - full control over storage logic.

### Interface

- [ValtheraDB-core/src/base/actions.ts](https://github.com/wxn0brP/ValtheraDB-core/blob/HEAD/src/base/actions.ts)

### Example: SQLite Adapter

See full implementation: [ValtheraDB-storage-sqlite/src/index.ts](https://github.com/wxn0brP/ValtheraDB-storage-sqlite/blob/HEAD/src/index.ts)

Key points:

- Extend `ActionsBase`
- Translate Valthera queries to SQL
- Handle prepared statements
- Map SQL results to Valthera format

### Example: MongoDB Adapter

See full implementation: [ValtheraDB-storage-mongodb/src/actions.ts](https://github.com/wxn0brP/ValtheraDB-storage-mongodb/blob/HEAD/src/actions.ts)

Key points:

- Extend `ActionsBase`
- Translate Valthera queries to MongoDB format
- Manage connection lifecycle (`init()`)

### When to Use Level 3

✅ Maximum performance control  
✅ External database systems (SQL, NoSQL)  
✅ Remote APIs / microservices  
✅ Transaction support needed  

❌ Simple file-based storage  
❌ Quick prototyping  

## Level Comparison

| Feature | Level 1 | Level 2 | Level 3 |
|---------|---------|---------|---------|
| **Base Class** | `CustomActionsBase` | `ActionsBase` + `FileCpu` | `ActionsBase` |
| **Implement** | `read`, `write` | `FileCpu` interface | All CRUD methods |
| **Memory Usage** | Full file load | Streaming | Depends on impl |
| **Best For** | JSON, CSV, XML | Custom formats | High performance, SQL, NoSQL, APIs |
| **Code Lines** | ~50-80 | ~150-250 | 300+ |

## Utility Functions Reference

### From `@wxn0brp/db-core`

```typescript
// ID generation
import { genId } from "@wxn0brp/db-core";
import { addId } from "@wxn0brp/db-core/helpers/addId";

// Query helpers
import { hasFieldsAdvanced } from "@wxn0brp/db-core/utils/hasFieldsAdvanced";
import { updateFindObject } from "@wxn0brp/db-core/utils/updateFindObject";
import { updateObjectAdvanced } from "@wxn0brp/db-core/utils/updateObject";

// Find utility for multi-file searches
import { findUtil } from "@wxn0brp/db-core/utils/action";

// Types
import type { FileCpu } from "@wxn0brp/db-core/types/fileCpu";
import type { Data, DataInternal } from "@wxn0brp/db-core/types/data";
import type { VQueryT } from "@wxn0brp/db-core/types/query";
```

## Next Steps

- Read [Core Concepts](core_concepts.md) for ValtheraDB philosophy
- Explore [Updater Operators](updater.md) for advanced updates
- Learn about [Relations](relation.md) for cross-collection queries
