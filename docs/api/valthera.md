# ValtheraDB Documentation

## Class: `Valthera`

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
    ttl = 5 * 60 * 1000,  // 5 minutes
    aware = true           // per-collection isolation
  )
});
```

**Parameters:**
- `ttl` (default: `300000`): Time-to-live for inactive queues in milliseconds
- `aware` (default: `true`): Whether to isolate queues per collection

**Behavior:**
- Creates separate queues for each collection
- Automatically cleans up idle queues after `ttl`
- If `aware = false`, all operations share a single queue

**Example - Custom TTL:**

```typescript
const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new SmartExecutor(10 * 60 * 1000) // 10 minutes
});
```

See [Executor Tutorial](../dev/executor.md) for detailed explanation.
