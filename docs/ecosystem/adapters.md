# Storage Adapters

ValtheraDB uses pluggable storage engines - every adapter implements the same `ActionsBase` interface with identical CRUD API.

## Quick Start: VDB() API

The easiest way to use adapters - auto-resolves based on config or env vars.

```bash
bun add @wxn0brp/db-resolver @wxn0brp/db-core
```

```typescript
import { VDB } from "@wxn0brp/db-resolver";

// Dir adapter (default)
const db = VDB().dir("./data");

// SQLite with Bun
const db = VDB().sqlite.bun("db.sqlite");

// MongoDB
const db = VDB().mongodb("mongodb://localhost:27017", "mydb");

// Typed collections
const db = VDB<{ users: { id: number; name: string } }>().dir("./data");
await db.users.add({ id: 1, name: "Ala" });
```

**Resolution order:** `force` option → `VALTHERA_<NAME>` env var → `def` fallback → `./vdb-data/<name>`

In development, missing adapters are auto-installed.

-> [Full Resolver Docs](https://github.com/wxn0brP/ValtheraDB-resolver#vdb-api)

---

## Manual Installation

To use an adapter manually, install the package and create an instance.

| Adapter | Storage | Install | Repo |
|---------|---------|---------|------|
| dir | Directory of JSON5/JSON/YAML files | `bun add @wxn0brp/db-storage-dir` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-dir) |
| sqlite | SQLite | `bun add @wxn0brp/db-storage-sqlite` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-sqlite) |
| mongodb | MongoDB | `bun add @wxn0brp/db-storage-mongodb` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-mongodb) |
| bin | Single binary file (msgpack) | `bun add @wxn0brp/db-storage-bin` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-bin) |
| c | Native C via bun:ffi (Linux) | built with `./build.sh` | [GitHub](https://github.com/wxn0brP/ValtheraDB-c-engine) |
| csv | CSV files | `bun add @wxn0brp/db-storage-csv` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-csv) |
| web-storage | Browser localStorage/sessionStorage | `bun add @wxn0brp/db-storage-web` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-web) |
| length | Fixed-length binary records | `bun add @wxn0brp/db-storage-length` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-length) |
| crypt | AES-256-GCM encrypted (wraps adapter) | `bun add @wxn0brp/db-storage-crypt` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-crypt) |
| rocks | RocksDB key-value | `bun add @wxn0brp/db-storage-rocks` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-rocks) |
| accdb | MS Access via ODBC | `bun add @wxn0brp/db-storage-accdb` | [GitHub](https://github.com/wxn0brP/ValtheraDB-storage-accdb) |

## Creating a Custom Adapter

See the [Adapter Tutorial](../dev/adapter.md) for a step-by-step guide on building your own storage adapter.
