# Writing Plugins

Plugins let you intercept and modify database operations before they reach the storage adapter.
They're perfect for logging, caching, validation, or adding custom behavior across all operations.

## Plugin Interface

A plugin is an object with three properties:

```typescript
interface ValtheraPlugin {
  name: string;
  init?: (db: ValtheraClass) => void;
  execute(ctx: PluginContext): Promise<any>;
}
```

- **`name`**: Unique identifier for the plugin
- **`init`** (optional): Called once when the plugin is registered
- **`execute`**: Called for every database operation

## Context Object

The `execute` method receives a context object:

```typescript
interface PluginContext {
  op: string;        // Operation name: "find", "add", "update", etc.
  query: any;        // The query object (or collection name string for some ops)
  next: () => Promise<any>; // Call the next plugin or adapter
}
```

The `op` field can be any of:

- `getCollections`, `ensureCollection`, `issetCollection`, `removeCollection`
- `add`, `find`, `findOne`, `update`, `updateOne`, `remove`, `removeOne`
- `updateOneOrAdd`, `toggleOne`

## Basic Plugin Structure

Here's the minimal plugin structure:

```typescript
import { ValtheraPlugin } from "@wxn0brp/db";

const myPlugin: ValtheraPlugin = {
  name: "my-plugin",
  
  async execute(ctx) {
    // Before the operation
    console.log(`About to execute: ${ctx.op}`);
    
    // Call next() to continue the chain
    const result = await ctx.next();
    
    // After the operation
    console.log(`Finished: ${ctx.op}`);
    
    return result;
  }
};
```

## Registering Plugins

Use the `plugin()` method to register:

```typescript
const db = ValtheraCreate("./my-db");

const unregister = db.plugin(myPlugin);

// Later, to remove the plugin:
unregister();
```

The `plugin()` method returns a function that removes the plugin when called.

## Execution Order

Plugins form a chain. When you call a database operation:

1. The first plugin's `execute` is called
2. It can call `ctx.next()` to invoke the second plugin
3. The second plugin calls `ctx.next()` to invoke the third
4. ...and so on until the adapter is reached
5. Results flow back through the chain

**Example with multiple plugins:**

```typescript
db.plugin(pluginA);
db.plugin(pluginB);
db.plugin(pluginC);

await db.collection("users").find({});
// Execution order: A -> B -> C -> adapter -> C -> B -> A
```

## Practical Examples

### Logging Plugin

Log all operations with timing:

```typescript
const loggingPlugin: ValtheraPlugin = {
  name: "logger",
  
  async execute(ctx) {
    const start = Date.now();
    console.log(`[START] ${ctx.op}`, ctx.query);
    
    const result = await ctx.next();
    
    const duration = Date.now() - start;
    console.log(`[END] ${ctx.op} (${duration}ms)`);
    
    return result;
  }
};
```

### Operation Blocker

Prevent certain operations:

```typescript
const readOnlyPlugin: ValtheraPlugin = {
  name: "read-only",
  
  async execute(ctx) {
    const writeOps = ["add", "update", "updateOne", "remove", "removeOne"];
    
    if (writeOps.includes(ctx.op)) {
      throw new Error(`Operation ${ctx.op} is not allowed in read-only mode`);
    }
    
    return ctx.next();
  }
};
```

## Modifying Queries

Plugins can modify queries before they reach the adapter:

```typescript
const softDeletePlugin: ValtheraPlugin = {
  name: "soft-delete",
  
  async execute(ctx) {
    // Add deleted filter to all find operations
    if (ctx.op === "find" || ctx.op === "findOne") {
      ctx.query.search ||= {};
      ctx.query.search.deleted = { $ne: true };
    }
    
    return ctx.next();
  }
};
```

## Modifying Results

Transform results after the adapter returns them:

```typescript
const transformPlugin: ValtheraPlugin = {
  name: "transformer",
  
  async execute(ctx) {
    const result = await ctx.next();
    
    if (ctx.op === "find" && Array.isArray(result)) {
      return result.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`
      }));
    }
    
    return result;
  }
};
```
