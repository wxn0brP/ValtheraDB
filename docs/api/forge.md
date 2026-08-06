# Forge (Proxy Access)

Forge creates a Proxy that enables `db.collectionName.method()` syntax.

## Functions

### `forgeValthera(target)`

Creates untyped proxy for dynamic collection access.

```typescript
import { forgeValthera, ValtheraClass } from "@wxn0brp/db";

const db = forgeValthera<"users" | "posts">(
  new ValtheraClass({ adapter })
);

// Now you can use:
await db.users.add({ name: "Alice" });
await db.posts.find({ authorId: "123" });

// Instead of:
await db.c("users").add({ name: "Alice" });
```

### `forgeTypedValthera<T>(target)`

Creates typed proxy with TypeScript support.

```typescript
import { forgeTypedValthera } from "@wxn0brp/db";

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
- The collection is cached on the target object
- Existing properties (like `init`, `close`, `plugin`) are not affected

**Note:** `ValtheraCreate()` and `VDB()` automatically use `forgeTypedValthera` internally.
