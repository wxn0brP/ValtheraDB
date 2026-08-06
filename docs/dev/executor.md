# Understanding the Executor

The Executor is a core component that ensures database operations are executed safely and in the correct order. It prevents race conditions by serializing operations on the same collection.

## Why You Need an Executor

Database adapters often cannot handle concurrent operations safely. Without an executor:

```typescript
// Race condition without executor
await Promise.all([
  db.users.add({ name: "Alice" }),
  db.users.add({ name: "Bob" })
]);
// Both operations might interfere with each other
```

With an executor, operations are queued and executed sequentially:

```typescript
// Safe with executor
await Promise.all([
  db.users.add({ name: "Alice" }),
  db.users.add({ name: "Bob" })
]);
// Operations are queued: Alice first, then Bob
```

## Executor Types

### Executor (Simple)

A basic FIFO queue. All operations are executed one after another, regardless of collection.

```typescript
import { Executor, ValtheraClass } from "@wxn0brp/db-core";

const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new Executor()
});
```

**Characteristics:**

- Single queue for all operations
- Strict sequential execution
- Simple and predictable
- Lower concurrency (bottleneck on single queue)

**When to use:**

- Simple adapters that cannot handle any concurrency
- When you want predictable, linear execution
- Testing and debugging

### SmartExecutor (Advanced)

Per-collection queues with automatic cleanup. Operations on different collections can run in parallel.

```typescript
import { SmartExecutor, ValtheraClass } from "@wxn0brp/db-core";

const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new SmartExecutor(
    ttl = 5 * 60 * 1000,  // 5 minutes
    aware = true          // per-collection isolation, default false
  )
});
```

**Characteristics:**

- Separate queue for each collection
- Parallel execution across collections
- Automatic cleanup of idle queues
- Higher concurrency

**Parameters:**

- `ttl` (default: `300000`): Time-to-live for inactive queues (milliseconds)
- `aware` (default: `false`): Whether to isolate queues per collection

**When to use:**

- Most production scenarios
- Applications with multiple collections
- When you need better concurrency

## How SmartExecutor Works

### Queue Isolation

```typescript
// These operations run in parallel (different collections)
await Promise.all([
  db.users.add({ name: "Alice" }),    // Queue: "users"
  db.posts.add({ title: "Hello" }),   // Queue: "posts"
  db.comments.add({ text: "Nice!" })  // Queue: "comments"
]);

// These operations run sequentially (same collection)
await Promise.all([
  db.users.add({ name: "Alice" }),    // Queue: "users" - first
  db.users.add({ name: "Bob" }),      // Queue: "users" - second
  db.users.find({})                    // Queue: "users" - third
]);
```

### Automatic Cleanup

SmartExecutor automatically removes idle queues after the TTL period:

```typescript
const executor = new SmartExecutor(60000); // 1 minute TTL

// Operation creates a queue for "users"
await db.users.add({ name: "Alice" });

// Queue remains active for 1 minute
// If no operations on "users" for 1 minute, queue is removed
// Next operation on "users" creates a new queue
```

### aware Mode

When `aware = true` (default), queues are isolated per collection:

```typescript
const executor = new SmartExecutor(300000, true);
// "users" -> separate queue
// "posts" -> separate queue
// "comments" -> separate queue
```

When `aware = false`, all operations share a single queue:

```typescript
const executor = new SmartExecutor(300000, false);
// All operations -> single shared queue
// Behaves like simple Executor but with TTL cleanup
```

## Adapter Integration

Adapters can signal support for SmartExecutor:

```typescript
class MyAdapter extends ActionsBase {
  smartExecutor = true; // Signals support for per-collection queuing
  
  // ... adapter methods
}
```

When an adapter has `smartExecutor = true`, ValtheraClass automatically enables `aware` mode on the SmartExecutor.

## Custom Executor

You can implement your own executor:

```typescript
import { ExecutorInterface } from "@wxn0brp/db-core";

class MyCustomExecutor implements ExecutorInterface {
  async addOp(func: Function, query?: any, collection?: string): Promise<any> {
    // Your custom logic here
    // Must return a promise that resolves with the operation result
    
    return await new Promise((resolve, reject) => {
      // Queue the operation
      // Call func(query) when ready
      func(query).then(resolve).catch(reject);
    });
  }
}

const db = new ValtheraClass({
  adapter: myAdapter,
  executor: new MyCustomExecutor()
});
```

## Performance Considerations

### Executor vs SmartExecutor

| Scenario | Executor | SmartExecutor |
|----------|----------|---------------|
| Single collection | Same | Same |
| Multiple collections | Sequential | Parallel |
| Memory usage | Low | Higher (multiple queues) |
| Concurrency | Low | High |
| Complexity | Simple | Moderate |
