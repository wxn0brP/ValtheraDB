# Multi-Backend & Routed Storage

ValtheraDB provides two ways to work with multiple storage backends.

## MultiBackend

Queries across multiple adapters simultaneously.

```typescript
import { MultiBackend, ValtheraClass } from "@wxn0brp/db-core";

const multi = new MultiBackend([
  adapter1,
  adapter2,
  adapter3,
], 0); // primaryIndex (default: 0)

const db = new ValtheraClass({ adapter: multi });
```

**Operation behavior:**

| Operation | Behavior |
|-----------|----------|
| `add` | Primary backend only |
| `find` | All backends, results merged (flattened) |
| `findOne` | Iterates backends, returns first non-null match |
| `update` | All backends, results merged |
| `updateOne` | Iterates backends, returns first non-null result |
| `remove` | All backends, results merged |
| `removeOne` | Iterates backends, returns first non-null result |
| `ensureCollection` | All backends |
| `issetCollection` | Returns `true` if any backend has the collection |
| `removeCollection` | All backends |
| `getCollections` | Unique union from all backends |

**Use cases:** replication, migration, read replicas

## RoutedStorage

Routes collections to specific backends based on rules.

```typescript
import { RoutedStorage, ValtheraClass } from "@wxn0brp/db-core";

const routed = new RoutedStorage([
  { match: "logs", backends: logAdapter },
  { match: /^temp_/, backends: memoryAdapter },
  { match: (q) => q.collection.includes("archive"), backends: archiveAdapter }
], defaultAdapter);

const db = new ValtheraClass({ adapter: routed });
```

**Match types:**

- **String**: exact collection name or `"*"` for all
- **RegExp**: pattern match on collection name
- **Function**: `(query) => boolean`

**Operation behavior:**

| Operation | Behavior |
|-----------|----------|
| `add` | Writes to first matched backend, then replicates to all matched backends |
| `find` | First matched backend only |
| `findOne` | First matched backend only |
| `update` | All matched backends |
| `updateOne` | All matched backends |
| `remove` | All matched backends |
| `removeOne` | All matched backends |
| `getCollections` | Unique union from all rule backends |

When no rules match, the `defaultBackend` is used.

**Use cases:** hot/cold storage, per-collection backends, multi-tenant

## Comparison

| Feature | MultiBackend | RoutedStorage |
|---------|--------------|---------------|
| Routing | All backends for reads | Per-collection by rules |
| Writes | Primary only | All matching backends |
| Use case | Fan-out queries | Collection-specific |
