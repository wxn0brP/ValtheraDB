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

### `sortByIds(items)`

Sorts an array of objects by their `_id` field chronologically.

```typescript
import { sortByIds } from "@wxn0brp/db-core";

const items = [
  { _id: "m2def45-a-b", name: "Second" },
  { _id: "m1abc23-x-y", name: "First" }
];

const sorted = sortByIds(items);
// [{ _id: "m1abc23-x-y", name: "First" }, { _id: "m2def45-a-b", name: "Second" }]
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
