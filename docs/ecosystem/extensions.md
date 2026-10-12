# Extensions

Extensions add functionality on top of ValtheraDB -
replication, caching, and concurrency control.
They are implemented as plugins (`ValtheraPlugin`), named `db-plugin-<name>`.

| Package | What it does | Install | Repo |
|---------|-------------|---------|------|
| `@wxn0brp/db-plugin-crdt` | CRDT replication and sync between ValtheraDB instances | `bun add @wxn0brp/db-plugin-crdt` | [GitHub](https://github.com/wxn0brP/ValtheraDB-plugin-crdt) |
| `@wxn0brp/db-plugin-lock` | File-based multi-process locking with stale detection | `bun add @wxn0brp/db-plugin-lock` | [GitHub](https://github.com/wxn0brP/ValtheraDB-plugin-lock) |
| `@wxn0brp/db-plugin-redis-cache` | Redis cache for reads with automatic invalidation on writes | `bun add @wxn0brp/db-plugin-redis-cache` | [GitHub](https://github.com/wxn0brP/ValtheraDB-plugin-redis-cache) |
