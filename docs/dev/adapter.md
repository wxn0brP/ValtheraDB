# ValtheraDB Storage Adapter Tutorial

This guide shows you how to create custom storage adapters for ValtheraDB.

Adapters fall into two classes:

- **CRUD adapters** implement the full `ActionsBase` interface and expose ValtheraDB's document API (`add`, `find`, `update`, `remove`, `count`). They are the default contract and are verified end to end by the compliance suite.
- **Specialized adapters** expose a data model that is not a collection of documents. They still use `ActionsBase` as their boundary, but implement only the operations that map cleanly to their model - often over a fixed shape rather than arbitrary documents - and declare their partial coverage in the compliance suite.

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

> Note: When you replace any layer, you implicitly take responsibility for all layers below it.
> A specialized adapter (Variant D) keeps `ActionsBase` as its boundary but bypasses the layers below it, implementing only the operations its data model supports.

## What `ActionsBase` Gives You by Default

`ActionsBase` ships with default implementations and fields, so a minimal adapter only needs the abstract CRUD and collection methods:

| Member | Default |
|--------|---------|
| `capabilities` | `{ transactions: false, indexes: false, persistent: true }` - override to describe your backend |
| `bulkAdd(query)` | Loops over `add()` per document |
| `count(query)` | Runs `find()` and returns its length |
| `createIndex(config)` / `removeIndex(config)` | No-op |
| `beginTransaction(id, collections)` / `commitTransaction(handle)` / `rollbackTransaction(handle)` | Throw `UnsupportedOperationError` |
| `version` | Set a `src/version.ts` string so it appears in error context |
| `adapterOpts` | `{ numberId: false, idKey: "_id" }` - merged from `ValtheraClass` options |

Override any of these only when your backend has native support (bulk inserts, `countDocuments`, real indexes, transactions).

Use the structured error classes from `@wxn0brp/db-core/errors` instead of bare `Error` throws: `AdapterInitError` in `init()`, `AdapterCloseError` in `close()`, `AdapterError` for driver failures, `QueryValidationError` for invalid input, and `TransactionError` inside transactions. Core wraps unknown errors into `AdapterError`; see [Errors](../api/errors.md).

## Variant A: CustomFileCpu Adapter

**Kind:** CRUD

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

### When to Use Variant A

- ✅ Your data fits in memory (entire file is loaded on each operation)  
- ✅ Simple file formats (JSON, CSV, YAML)  
- ✅ You want minimal code  
- ✅ Prototyping or small-scale applications  
- ❌ Large datasets (GB+)  
- ❌ Need for partial file reads  
- ❌ Complex query optimization  

## Variant B: ActionsBase with FileCpu

**Kind:** CRUD

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

### When to Use Variant B

- ✅ Large files that don't fit in memory  
- ✅ Custom file formats  
- ✅ Streaming reads required  
- ✅ Need control over file organization (sharding, rotation)  
- ❌ Want minimal implementation code  

## Variant C: Full ActionsBase

**Kind:** CRUD

**Best for:** Database systems, remote APIs, complex storage or full control.

**What you get:** Some utilities.

**What you implement:** Everything - full control over storage logic.

### Interface

- [ValtheraDB-core/src/base/actions.ts](https://github.com/wxn0brP/ValtheraDB-core/blob/HEAD/src/base/actions.ts)

### Example: SQLite Adapter

See full implementation:
[ValtheraDB-storage-sqlite/src/index.ts](https://github.com/wxn0brP/ValtheraDB-storage-sqlite/blob/HEAD/src/index.ts)

Key points:

- Extend `ActionsBase`
- Translate Valthera queries to SQL
- Handle prepared statements
- Map SQL results to Valthera format

### Example: MongoDB Adapter

See full implementation:
[ValtheraDB-storage-mongodb/src/actions.ts](https://github.com/wxn0brP/ValtheraDB-storage-mongodb/blob/HEAD/src/actions.ts)

Key points:

- Extend `ActionsBase`
- Translate Valthera queries to MongoDB format
- Manage connection lifecycle (`init()`)

### When to Use Variant C

- ✅ Maximum performance control  
- ✅ External database systems (SQL, NoSQL)  
- ✅ Remote APIs / microservices  
- ✅ Transaction support needed  
- ❌ Simple file-based storage  
- ❌ Quick prototyping  

## Variant D: Specialized Adapter

**Kind:** Specialized

**Package name:** `@wxn0brp/db-spec-<name>` - see [Publishing](./publishing.md) for scopes, keywords, and the resolver contract.

**Best for:** Non-document data models where a collection of documents is the wrong abstraction.

**What you get:** Valthera's API where it maps cleanly to your data model, plus any domain-specific methods you expose. A specialized adapter may answer CRUD calls, but over a fixed shape rather than arbitrary documents - for example an append-only `{ _id, l }` log.

**What you implement:** Only the operations your data model supports. Use `ActionsBase` as the boundary, implement the subset that makes sense, and add domain-specific operations on top.

### When to Use Variant D

- ✅ Your storage is not a collection of documents  
- ✅ The shape of the data itself is the point  
- ✅ Full CRUD would be a semantic lie or a costly mismatch  
- ❌ You need portable business logic across arbitrary backends  
- ❌ You rely on the unified CRUD contract  

### Why Specialized Adapters Exist

The unified document API is a guarantee for CRUD adapters (Variants A, B, C), and it does not change. Specialized adapters are an explicit, opt-in exception for data models that cannot be represented as documents. They keep the same `ActionsBase` boundary and the same opt-in discipline, but state a narrower contract rather than advertise a uniform one that lies about the medium. See [Core Concepts: Two Classes of Adapters](../core_concepts.md#two-classes-of-adapters-crud-and-specialized) for the full rationale.

## Variant Comparison

| Feature | Variant A | Variant B | Variant C | Variant D |
|---------|-----------|-----------|-----------|-----------|
| **Kind** | CRUD | CRUD | CRUD | Specialized |
| **Base Class** | `CustomActionsBase` | `ActionsBase` + `FileCpu` | `ActionsBase` | `ActionsBase` (partial) |
| **Implement** | `read`, `write` | `FileCpu` interface | All CRUD methods | Only supported methods |
| **Memory Usage** | Full file load | Streaming | Depends on impl | Depends on data model |
| **e2e Coverage** | Full | Full | Full (declared skips) | Partial (`skip` config) |
| **Best For** | JSON, CSV, XML | Custom formats | SQL, NoSQL, APIs | Non-document models |

> Compliance coverage is declared in `valthera-e2e/config.json` under `skip.domains` and `skip.tests`. Any adapter may declare skips, CRUD or specialized; the difference is how much it has to skip.

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
import type { AdapterOpts } from "@wxn0brp/db-core/types/options";
```

## Next Steps

- Read [Core Concepts](../core_concepts.md) for ValtheraDB philosophy
- Explore [Updater Operators](../api/updater.md) for advanced updates
- Learn about [Relations](../api/relation.md) for cross-collection queries
- Browse the [Ecosystem](../ecosystem/adapters.md) for ready-made storage adapters
