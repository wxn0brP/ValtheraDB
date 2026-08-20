# Forge (Proxy Access)

Forge creates a Proxy that enables `db.collectionName.method()` syntax.

## `forgeTypedValthera<T>(target)`

Creates a typed proxy with TypeScript support. Accessing a property that doesn't exist on the target creates a `Collection` instance for that collection name.

```typescript
import { forgeTypedValthera } from "@wxn0brp/db-core";
import { ValtheraClass } from "@wxn0brp/db-core";

interface User {
  _id: string;
  name: string;
  email: string;
}

const db = forgeTypedValthera<{ users: User[] }>(
  new ValtheraClass({ adapter })
);

// db.users is typed as Collection<User>
const user = await db.users.findOne({ email: "alice@example.com" });
// user is typed as User | null
```

## How it works

- Accessing a non-existent property creates a `Collection` instance
- The collection is cached on the target object (subsequent accesses return the same instance)
- Existing properties (like `init`, `close`, `plugin`) are not affected

```typescript
// Without forge - explicit collection access:
const users = db.c("users");
await users.add({ name: "Alice" });

// With forge - property access syntax:
await db.users.add({ name: "Alice" });
```

**Note:** `ValtheraCreate()` and `VDB()` automatically use `forgeTypedValthera` internally.
