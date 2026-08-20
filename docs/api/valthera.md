# ValtheraDB Documentation

## Class: `Valthera`

### Constructor Options

```typescript
new ValtheraClass({
  adapter: ActionsBase | (() => Promise<ActionsBase>),
  executor?: Executor,
  adapterOpts?: AdapterOpts,
  // Legacy (deprecated):
  numberId?: boolean,   // use adapterOpts.numberId
  idKey?: string,       // use adapterOpts.idKey
})
```

The `adapter` can be either an `ActionsBase` instance or a factory function that returns one. When a factory function is used, it is called lazily during `init()`.

### `AdapterOpts`

Configuration options for the storage adapter.

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

**Note:** The legacy `numberId` and `idKey` options at the top level are deprecated. Use `adapterOpts` instead.

### `version`

The version of the ValtheraDB core engine.

```typescript
db.version; // e.g., "0.11.6"
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

### `plugin(plugin)`

Registers a plugin to intercept database operations. Plugins form a middleware chain that can inspect, modify, or short-circuit queries before they reach the adapter.

- **Parameters:**
  	- `plugin` (`ValtheraPlugin`): The plugin instance to register.
- **Returns:**
   	- `() => void`: A function that unregisters the plugin when called.

**Plugin Interface:**

```typescript
interface ValtheraPlugin {
  name: string;
  init?: (db: ValtheraClass) => void;
  execute(ctx: PluginContext): Promise<any>;
}

interface PluginContext {
  op: string;        // Operation name (e.g., "find", "add", "update")
  query: any;        // The query object or string
  next: () => Promise<any>; // Call next plugin or adapter
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

### `async getCollections()`

Gets the names of all available collections in the database.

- **Returns:**
   	- `Promise<string[]>`: A promise that resolves with an array of collection names.

### `async ensureCollection(collection)`

Ensures that the specified collection exists. If the collection does not exist, it will be created.

- **Parameters:**
  	- `collection` (`string`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: The returned value is **adapter-dependent** and must not be relied upon.
- **Notes:**
	- Guarantees that the collection exists after the method resolves.
	- The boolean result has no standardized meaning and should be treated as `void`.

### `async issetCollection(collection)`

Checks if a collection exists.

- **Parameters:**
	- `collection` (`string`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: A promise that resolves to `true` if the collection exists, otherwise `false`.

### `async removeCollection(collection)`

Deletes the collection.

- **Parameters:**
   	- `collection` (`string`): The name of the collection to remove.

- **Returns:**
   	- `Promise<boolean>`: A promise that resolves when the collection is removed.
       - `true`: The collection was successfully removed.
       - `false`: The collection was not found (i.e., it did not exist, so there was nothing to remove).

### `add(query)`

Adds a document to a collection.

- **Parameters:**
  - `query` (`VQueryT.Add<T>`): The add query.
- **Returns:** `Promise<T & { _id: string }>`

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

## Event Emitter

### `emitter`

Event emitter for subscribing to database operations. Uses VEE (Valthera Event Emitter).

**Type:** `VEE<Events>`

**Events:**
- Operation-specific events: `"find"`, `"add"`, `"update"`, `"updateOne"`, `"remove"`, `"removeOne"`, `"findOne"`, `"updateOneOrAdd"`, `"toggleOne"`, `"getCollections"`, `"ensureCollection"`, `"issetCollection"`, `"removeCollection"`
- Wildcard event: `"*"` (fires for all operations)

**Event Handler Signature:**
```typescript
(query: VQuery, result: any) => void
// or for wildcard:
(op: string, query: VQuery, result: any) => void
```

**Example - Subscribe to specific operation:**

```typescript
db.emitter.on("find", (query, result) => {
  console.log(`Found ${result.length} items in ${query.collection}`);
});

db.emitter.on("add", (query, result) => {
  console.log(`Added to ${query.collection}:`, result._id);
});
```

**Example - Subscribe to all operations:**

```typescript
db.emitter.on("*", (op, query, result) => {
  metrics.record(op, query.collection, Date.now());
});
```

**Example - Audit logging:**

```typescript
db.emitter.on("*", (op, query, result) => {
  if (op === "remove" || op === "removeOne") {
    auditLog.record({
      action: "delete",
      collection: query.collection,
      timestamp: new Date()
    });
  }
});
```

**Note:** `db.emiter` is a deprecated alias for `db.emitter` (typo preserved for backward compatibility).

## Executor

### `executor`

Controls how database operations are queued and executed. Ensures operations on the same collection are serialized.

**Type:** `ExecutorInterface`

**Default:** `SmartExecutor` (per-collection queuing with TTL)

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
    aware // default: false
  )
});
```

**Parameters:**
- `ttl` (default: `300000`): Time-to-live for inactive queues in milliseconds
- `aware` (default: `false`): Whether to isolate queues per collection

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

**Note:** When an adapter has `smartExecutor = true`, `ValtheraClass` automatically enables `aware` mode on the `SmartExecutor`.

See [Executor Tutorial](../dev/executor.md) for detailed explanation.
