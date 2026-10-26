# Multi-Backend & Routed Storage

ValtheraDB provides two ways to work with multiple storage backends.

## MultiBackend

Queries across multiple adapters simultaneously.

```typescript
import { ValtheraClass } from "@wxn0brp/db-core";
import { MultiBackend } from "@wxn0brp/db-core/db/multiStorage";

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
| `bulkAdd` | Primary backend only (loops over `add`) |
| `find` | All backends, results merged (flattened) |
| `findOne` | Iterates backends, returns first non-null match |
| `count` | All backends via `find`, summed length |
| `update` | All backends, results merged |
| `updateOne` | Iterates backends, returns first non-null result |
| `remove` | All backends, results merged |
| `removeOne` | Iterates backends, returns first non-null result |
| `ensureCollection` | All backends (returns `true` if any created it) |
| `issetCollection` | Returns `true` if any backend has the collection |
| `removeCollection` | All backends (returns `true` if any removed it) |
| `getCollections` | Unique union from all backends |
| `createIndex` / `removeIndex` | No-op (inherited default) |
| `capabilities` | Inherited default values |

**Use cases:** replication, migration, read replicas

## RoutedStorage

Routes collections to specific backends based on rules.

```typescript
import { ValtheraClass } from "@wxn0brp/db-core";
import { RoutedStorage } from "@wxn0brp/db-core/db/routedStorage";

const routed = new RoutedStorage([
  { match: "logs", backends: [logAdapter] },
  { match: /^temp_/, backends: [memoryAdapter] },
  { match: (q) => q.collection.includes("archive"), backends: [archiveAdapter] }
], defaultAdapter);
```

**Note:** `backends` in each rule **must be an array** of backends. The `defaultBackend` accepts a single backend or an array.

**Match types:**

- **String**: exact collection name or `"*"` for all
- **RegExp**: pattern match on collection name
- **Function**: `(query) => boolean`

**Operation behavior:**

| Operation | Behavior |
|-----------|----------|
| `add` | Writes to first matched backend, then replicates the result to all matched backends |
| `bulkAdd` | Loops over `add` (same routing per document) |
| `find` | First matched backend only |
| `findOne` | First matched backend only |
| `count` | First matched backend only (via `find`) |
| `update` | All matched backends (first result is returned) |
| `updateOne` | All matched backends (first result is returned) |
| `remove` | All matched backends (first result is returned) |
| `removeOne` | All matched backends (first result is returned) |
| `ensureCollection` | All matched backends (first result is returned) |
| `issetCollection` | First matched backend only |
| `removeCollection` | All matched backends |
| `getCollections` | Unique union from all rule backends and the default backend |
| `createIndex` / `removeIndex` | No-op (inherited default) |

When no rules match, the `defaultBackend` is used.

**Use cases:** hot/cold storage, per-collection backends, multi-tenant

## Comparison

| Feature | MultiBackend | RoutedStorage |
|---------|--------------|---------------|
| Routing | All backends for reads | Per-collection by rules |
| Writes | Primary only | All matching backends |
| Use case | Fan-out queries | Collection-specific |
