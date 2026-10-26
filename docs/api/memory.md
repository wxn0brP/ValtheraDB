# In-Memory Database

ValtheraDB provides a built-in in-memory storage adapter for testing, prototyping, and browser environments.

## `createMemoryValthera<T>(data?)`

Factory function that creates a typed in-memory database, optionally pre-populated with data.

**Parameters:**

- `data` (optional): Object mapping collection names to arrays of documents

**Returns:** `ValtheraMemory` with typed collection access

**Example with pre-populated data:**

```typescript
import { createMemoryValthera } from "@wxn0brp/db-core";

const db = createMemoryValthera({
  users: [
    { _id: "user1", name: "Alice", email: "alice@example.com" },
    { _id: "user2", name: "Bob", email: "bob@example.com" }
  ],
  posts: [
    { _id: "post1", title: "Hello", authorId: "user1" }
  ]
});

// Data is immediately available
const users = await db.users.find({});
console.log(users.length); // 2
```

## How It Works

The in-memory adapter uses a `Map<string, any[]>` internally. Data read from the database is isolated with `structuredClone`, so mutating a document returned by `find()`/`findOne()` does not affect stored data and vice versa.

```typescript
const db = createMemoryValthera();
await db.users.add({ name: "Alice" });

// Reads are isolated
const user = await db.users.findOne({});
user.name = "Bob"; // mutation
const stored = await db.users.findOne({});
console.log(stored.name); // still "Alice" - reads are cloned

// Writes are not cloned: the object returned by add() is the same reference stored internally
const added = await db.users.add({ name: "Carol" });
added.name = "Eve"; // mutates the stored document
const stored2 = await db.users.findOne({ name: "Eve" });
console.log(stored2.name); // "Eve"
```

For full isolation, clone data yourself before adding it.

## Use Cases

### Unit Testing

```typescript
import { createMemoryValthera } from "@wxn0brp/db-core";
import { describe, it, expect } from "bun:test";

describe("UserService", () => {
  it("should create a user", async () => {
    const db = createMemoryValthera();
    const user = await db.users.add({ name: "Alice" });

    expect(user._id).toBeDefined();
    expect(user.name).toBe("Alice");
  });

  it("should find users by email", async () => {
    const db = createMemoryValthera({
      users: [
        { _id: "1", name: "Alice", email: "alice@test.com" },
        { _id: "2", name: "Bob", email: "bob@test.com" }
      ]
    });

    const found = await db.users.findOne({ email: "alice@test.com" });
    expect(found?.name).toBe("Alice");
  });
});
```

### Browser/PWA Applications

```typescript
// In a browser environment
const db = createMemoryValthera();

// Store temporary session data
await db.session.add({
  userId: "123",
  token: "abc",
  expiresAt: Date.now() + 3600000
});

// Data persists during the session
const session = await db.session.findOne({ userId: "123" });
```

For persistent storage, use a file-based adapter like `dir`.
