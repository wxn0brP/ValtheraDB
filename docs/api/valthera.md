# ValtheraDB Documentation

## Class: `ValtheraClass`

The main database class. It wraps a storage adapter (`ActionsBase`), queues operations, runs plugins, and emits events.

> The low-level `Valthera` wrapper (dir adapter with a preset format) is available from `@wxn0brp/db/valthera`, but for most use cases prefer `ValtheraCreate()` or `VDB()`.

### Constructor Options

```typescript
new ValtheraClass({
  adapter: ActionsBase | (() => Promise<ActionsBase>),
  executor?: ExecutorInterface,
  executorAware?: boolean, // default: true
  adapterOpts?: AdapterOpts,
})
```

- `adapter` - a ready `ActionsBase` instance, or a factory function that returns one. A factory is called lazily during `init()`.
- `executor` - controls operation queuing. Default: a `SmartExecutor` with a single queue (see [Executor](#executor)).
- `executorAware` - allows the executor to automatically switch to per-collection queues when the adapter supports it.
- `adapterOpts` - forwarded to the adapter on `init()`.

### `AdapterOpts`

Configuration options forwarded to the storage adapter.

```typescript
interface AdapterOpts {
  numberId?: boolean;  // Use numeric auto-incrementing IDs (default: false)
  idKey?: string;      // Custom ID field name (default: "_id")
}
```

**Example:**

```typescript
const db = new ValtheraClass({
  adapter: myAdapter,
  adapterOpts: {
    numberId: true,   // Use numeric IDs (1, 2, 3...)
    idKey: "id",      // Use "id" instead of "_id"
  }
});
```

### `version`

The version of the ValtheraDB core engine.

```typescript
db.version; // matches the installed @wxn0brp/db-core version
```

### `async init(...args)`

Initializes the adapter. Must be called before performing any operations. If the adapter was provided as a factory function, it is called during this step. Calling `init()` on an already-initialized instance is a no-op.

```typescript
await db.init();
```

### `async close(...args)`

Closes the adapter connection. Subsequent operations will not work until `init()` is called again.

```typescript
await db.close();
```

### `async execute<T>(name, query, txHandle?)`

Low-level entry point used internally by all operations. Runs an operation through the plugin chain, the executor, and the event emitter. Useful for advanced tooling and plugins.

- **Parameters:**
  - `name` (`keyof ValtheraCompatible`): Operation name (e.g., `"find"`, `"add"`).
  - `query` (`VQuery` or `string`): The query object, or a collection name for collection-level operations.
  - `txHandle` (`TransactionHandle`, optional): Attaches the operation to a transaction.

### `c<T>(collection)`

Creates or retrieves a `Collection` instance for the given collection name. The collection is cached for reuse.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
- **Returns:**
  - `Collection<T>`: A typed collection instance.

```typescript
const users = db.c("users");
await users.add({ name: "Alice" });
```

**Note:** When using `forgeTypedValthera()` or `ValtheraCreate()`, you can access collections directly as properties (e.g., `db.users`).

### `plugin(plugin, collections?)`

Registers a plugin to intercept database operations. Plugins form a middleware chain that can inspect, modify, or short-circuit queries before they reach the adapter.

- **Parameters:**
  	- `plugin` (`ValtheraPlugin`): The plugin instance to register.
  	- `collections` (`string[] | string`, optional): When set, the plugin only runs for operations on these collections.
- **Returns:**
   	- `() => void`: A function that unregisters the plugin when called.

**Plugin Interface:**

```typescript
interface ValtheraPlugin {
  name: string;
  init?: (db: ValtheraClass) => void;
  execute(ctx: PluginContext): Promise<any>;
  collections?: string[]; // limit the plugin to specific collections
}

interface PluginContext {
  op: string;            // Operation name (e.g., "find", "add", "update")
  kind: PluginOpKind;    // Operation kind: "read" | "write" | "delete" | "collection" | "index" | "meta" | "control"
  collection?: string;   // Collection name (for string-only ops, this is the query itself)
  query: any;            // The query object or string
  next: () => Promise<any>;              // Call the next plugin or adapter
  setOp(op: string, query?: any): void;  // Rewrite the operation (and optionally the query)
  setQuery(query: any): void;            // Rewrite the query for the current operation
}
```

**Example:**

```typescript
const loggingPlugin: ValtheraPlugin = {
  name: "logger",
  async execute(ctx) {
    console.log(`Executing ${ctx.op}`);
    const result = await ctx.next();
    console.log(`Completed ${ctx.op}`);
    return result;
  }
};

const unregister = db.plugin(loggingPlugin);
// Later: unregister() to remove the plugin
```

See [Writing Plugins](../dev/plugin.md) for the full tutorial.

### `async getCollections()`

Gets the names of all available collections in the database.

- **Returns:**
   	- `Promise<string[]>`: A promise that resolves with an array of collection names.

### `ensureCollection(collection)`

Ensures that the specified collection exists. If the collection does not exist, it will be created.

- **Parameters:**
  	- `collection` (`string | VQueryT.Collection`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: The returned value is **adapter-dependent** and must not be relied upon.
- **Notes:**
	- Guarantees that the collection exists after the method resolves.
	- The boolean result has no standardized meaning and should be treated as `void`.

### `issetCollection(collection)`

Checks if a collection exists.

- **Parameters:**
	- `collection` (`string | VQueryT.Collection`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: A promise that resolves to `true` if the collection exists, otherwise `false`.

### `removeCollection(collection)`

Deletes the collection.

- **Parameters:**
   	- `collection` (`string | VQueryT.Collection`): The name of the collection to remove.

- **Returns:**
   	- `Promise<boolean>`: A promise that resolves when the collection is removed.
       - `true`: The collection was successfully removed.
       - `false`: The collection was not found (i.e., it did not exist, so there was nothing to remove).

- **Note:** Cached `Collection` instances for that name are invalidated; a subsequent `c(name)` creates a fresh instance.

### `add(query)`

Adds a document to a collection.

- **Parameters:**
  - `query` (`VQueryT.Add<T>`): The add query (`{ collection, data, id_gen? }`).
- **Returns:** `Promise<T & { _id: string }>` - with the generated ID key (`_id` or custom `idKey`).

### `bulkAdd(query)`

Adds multiple documents to a collection in one call.

- **Parameters:**
  - `query` (`VQueryT.BulkAdd<T>`): `{ collection, datas, id_gen? }`.
- **Returns:** `Promise<T[]>` - added documents with generated IDs.

**Note:** The default implementation loops over `add()` internally; adapters with native bulk inserts override it.

### `find(query)`

Finds documents matching criteria.

- **Parameters:**
  - `query` (`VQueryT.Find<T>`): The find query.
- **Returns:** `Promise<T[]>`

### `findOne(query)`

Finds the first matching document.

- **Parameters:**
  - `query` (`VQueryT.FindOne<T>`): The findOne query.
- **Returns:** `Promise<T | null>`

### `update(query)`

Updates all matching documents.

- **Parameters:**
  - `query` (`VQueryT.Update<T>`): The update query.
- **Returns:** `Promise<T[]>`

### `updateOne(query)`

Updates the first matching document.

- **Parameters:**
  - `query` (`VQueryT.Update<T>`): The update query.
- **Returns:** `Promise<T | null>`

### `remove(query)`

Removes all matching documents.

- **Parameters:**
  - `query` (`VQueryT.Remove<T>`): The remove query.
- **Returns:** `Promise<T[]>`

### `removeOne(query)`

Removes the first matching document.

- **Parameters:**
  - `query` (`VQueryT.Remove<T>`): The remove query.
- **Returns:** `Promise<T | null>`

### `updateOneOrAdd(query)`

Updates one entry or adds a new one if no match is found.

- **Parameters:**
  - `query` (`VQueryT.UpdateOneOrAdd<T>`): The updateOneOrAdd query.
- **Returns:** `Promise<{ data: T; type: "added" | "updated" }>`

### `toggleOne(query)`

Removes one entry if it exists, or adds a new one if it doesn't. Useful for toggling flags.

- **Parameters:**
  - `query` (`VQueryT.ToggleOne<T>`): The toggleOne query.
- **Returns:** `Promise<{ data: T; type: "added" | "removed" }>`

### `count(query)`

Counts matching documents.

- **Parameters:**
  - `query` (`VQueryT.Count<T>`): `{ collection, search }`. Function-based search is **not** supported here.
- **Returns:** `Promise<number>`

**Note:** The default implementation runs `find()` and returns its length; adapters with native counting override it.

### `createIndex(collection, fields, opts)`

Creates an index on a collection. Index support is adapter-dependent.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `fields` (`string[]`): The fields to index.
  - `opts` (`IndexOpts`, optional): Index options (adapter-dependent).
    - `unique` (`boolean`): Whether the index should enforce uniqueness.
    - `name` (`string`): Custom index name.
- **Returns:** `Promise<void>`

**Note:** Not all adapters support indexes. Check your adapter's documentation.

```typescript
await db.createIndex("users", ["email"], { unique: true });
```

### `removeIndex(collection, fields)`

Removes an index from a collection. Index support is adapter-dependent.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `fields` (`string[]`): The indexed fields (same list used in `createIndex`).
- **Returns:** `Promise<void>`

**Note:** The default implementation is a no-op.

### `async capabilities()`

Describes what the underlying adapter supports.

- **Returns:** `Promise<AdapterCapabilities>`

```typescript
interface AdapterCapabilities {
  transactions: boolean; // supports transactions
  indexes: boolean;      // supports real indexes
  persistent: boolean;   // persists data between restarts
}
```

```typescript
const caps = await db.capabilities();
if (caps.transactions) {
  await db.transaction(["accounts"], async tx => { /* ... */ });
}
```

### `transaction(collections, fn)`

See [Transaction Docs](../dev/transaction.md)

## Event Emitter

### `emitter`

Event emitter for subscribing to database operations. Uses VEE (Valthera Event Emitter).

**Type:** `VEE<Events>`

**Events:**
- Operation-specific events: `"find"`, `"findOne"`, `"count"`, `"add"`, `"bulkAdd"`, `"update"`, `"updateOne"`, `"remove"`, `"removeOne"`, `"updateOneOrAdd"`, `"toggleOne"`, `"getCollections"`, `"ensureCollection"`, `"issetCollection"`, `"removeCollection"`, `"createIndex"`, `"removeIndex"`
- Wildcard event: `"*"` (fires for all operations)

**Note:** `capabilities()` reads the adapter directly and does not emit an event.

**Event Handler Signature:**
```typescript
(query: VQuery, result: any, collection?: string) => void
// or for wildcard:
(op: string, query: VQuery, result: any, collection?: string) => void
```

The collection argument is the third parameter for operation-specific handlers (the fourth for the `"*"` handler). It is derived from the query: for `ensureCollection`, `issetCollection`, and `removeCollection` it is the collection name passed as the query, while for `getCollections` it is `undefined`.

**Example - Subscribe to specific operation:**

```typescript
db.emitter.on("find", (query, result, collection) => {
  console.log(`Found ${result.length} items in ${collection}`);
});

db.emitter.on("add", (query, result) => {
  console.log(`Added to ${query.collection}:`, result._id);
});
```

**Example - Subscribe to all operations:**

```typescript
db.emitter.on("*", (op, query, result, collection) => {
  metrics.record(op, collection, Date.now());
});
```

**Example - Audit logging:**

```typescript
db.emitter.on("*", (op, query, result, collection) => {
  if (op === "remove" || op === "removeOne") {
    auditLog.record({
      action: "delete",
      collection,
      timestamp: new Date()
    });
  }
});
```

## Executor

### `executor`

Controls how database operations are queued and executed. Ensures operations are serialized safely.

**Type:** `ExecutorInterface`

**Default:** `SmartExecutor` created as `new SmartExecutor(undefined, false)` - a single queue for all operations. Per-collection queues are enabled automatically during `init()` when the adapter signals `smartExecutor = true` (see below).

### Executor Classes

#### `Executor`

Simple FIFO queue. All operations are executed sequentially.

```typescript
import { Executor } from "@wxn0brp/db-core";

const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new Executor()
});
```

#### `SmartExecutor`

Per-collection queues with automatic cleanup. Operations on different collections can run in parallel.

```typescript
import { SmartExecutor } from "@wxn0brp/db-core";

const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new SmartExecutor(
    ttl,  // default: 300000 (5 min)
    aware // default: true
  )
});
```

**Parameters:**
- `ttl` (default: `300000`): Time-to-live for inactive queues in milliseconds
- `aware` (default: `true`): Whether to isolate queues per collection

**Behavior:**
- When `aware = true`: creates separate queues for each collection, operations on different collections run in parallel
- When `aware = false`: all operations share a single queue (behaves like simple `Executor` but with TTL cleanup)
- Idle queues are automatically removed after `ttl`

**Example - Custom TTL:**

```typescript
const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new SmartExecutor(10 * 60 * 1000, true) // 10 min, per-collection
});
```

**Note:** The automatic `aware` activation in `ValtheraClass` happens only when all of the following are true: no explicit `executor` was passed, `executorAware` is `true` (default), the adapter has `smartExecutor = true`, and the executor is a `SmartExecutor`.

See [Executor Tutorial](../dev/executor.md) for detailed explanation.
