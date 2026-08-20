# ID Generation

ValtheraDB generates unique IDs using a time-based algorithm with random components.

## ID Format

Default format: `{timestamp36}-{random1}-{random1}`

- **timestamp36**: Current time in base36 (milliseconds since epoch)
- **random parts**: Base36 random values with collision avoidance

Example: `m1abc23-x-y`

## Utility Functions

### `genId(parts?, idData?)`

Generates a unique ID.

**Parameters:**

- `parts` (optional): Array of part lengths (default: `[1, 1]`)
- `idData` (optional): State object for collision tracking

```typescript
import { genId } from "@wxn0brp/db-core";

const id = genId(); // "m1abc23-x-y"
const customId = genId([2, 3]); // "m1abc23-xy-zab"
```

### `convertIdToUnix(id)`

Extracts Unix timestamp (milliseconds) from an ID.

```typescript
import { convertIdToUnix } from "@wxn0brp/db-core";

const id = "m1abc23-x-y";
const timestamp = convertIdToUnix(id); // 1700000000000
const date = new Date(timestamp);
```

### `sortByIds(items, key?)`

Sorts an array of objects by their ID field chronologically. Returns a new sorted array (does not mutate the original).

- **Parameters:**
  - `items` (`T[]`): Array of objects to sort.
  - `key` (`string`, optional, default: `"_id"`): The field name to sort by.

```typescript
import { sortByIds } from "@wxn0brp/db-core";

const items = [
  { _id: "m2def45-a-b", name: "Second" },
  { _id: "m1abc23-x-y", name: "First" }
];

const sorted = sortByIds(items);
// [{ _id: "m1abc23-x-y", name: "First" }, { _id: "m2def45-a-b", name: "Second" }]

// Using a custom ID key:
const sorted2 = sortByIds(items, "id");
```

### `compareIds(a, b)`

Compares two IDs (string or number).

```typescript
import { compareIds } from "@wxn0brp/db-core";

const result = compareIds("m1abc23-x-y", "m2def45-a-b");
// Negative if first is older, positive if newer, 0 if equal
```

## Custom ID Generation

Disable auto-generation and provide your own IDs:

```typescript
// Disable ID generation
await db.users.add(
  { name: "Alice" },
  false // id_gen = false
);

// Or use custom ID in updateOneOrAdd
await db.users.updateOneOrAdd(
  { email: "alice@example.com" },
  { name: "Alice" },
  { add_arg: { _id: "custom-id" } }
);
```

## Custom ID Key

By default, ValtheraDB uses `_id` as the ID field. You can configure a custom ID key via `adapterOpts`:

```typescript
import { ValtheraCreate } from "@wxn0brp/db";

const db = ValtheraCreate("./my-db", {
  adapterOpts: {
    idKey: "id", // Use "id" instead of "_id"
  }
});

// Now all documents will use "id" as the ID field
const user = await db.users.add({ name: "Alice" });
// { name: "Alice", id: "m1abc23-x-y" }
```

**Note:** The custom `idKey` applies to all collections in the database. When using `numberId: true`, the numeric auto-incrementing ID will also use the custom key.
