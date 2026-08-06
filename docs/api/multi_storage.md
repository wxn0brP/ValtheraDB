# Multi-Backend & Routed Storage

ValtheraDB provides two ways to work with multiple storage backends.

## MultiBackend

Queries across multiple adapters simultaneously.

```typescript
import { MultiBackend, ValtheraClass } from "@wxn0brp/db";

const multi = new MultiBackend([
  adapter1,
  adapter2,
  adapter3,
], 0); // primaryIndex

const db = new ValtheraClass({ adapter: multi });
```

**Operation behavior:**

- `add` -> primary only
- `find` -> all backends, results merged
- `findOne` -> first match
- `update/remove` -> all backends
- `getCollections` -> unique from all

**Use cases:** replication, migration, read replicas

## RoutedStorage

Routes collections to specific backends based on rules.

```typescript
import { RoutedStorage, ValtheraClass } from "@wxn0brp/db";

const routed = new RoutedStorage([
  { match: "logs", backends: logAdapter },
  { match: /^temp_/, backends: memoryAdapter },
  { match: (q) => q.collection.includes("archive"), backends: [archiveAdapter] }
], defaultAdapter);

const db = new ValtheraClass({ adapter: routed });
```

**Match types:**

- **String**: exact collection name or `"*"` for all
- **RegExp**: pattern match on collection name
- **Function**: `(query) => boolean`

**Operation behavior:** (if backends are array)

- Read operations -> first matching backend
- Write operations -> all matching backends

**Use cases:** hot/cold storage, per-collection backends, multi-tenant

## Comparison

| Feature | MultiBackend | RoutedStorage |
|---------|--------------|---------------|
| Routing | All backends for reads | Per-collection |
| Writes | Primary only | All matching |
| Use case | Fan-out queries | Collection-specific |
