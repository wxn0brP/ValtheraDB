# ValtheraCreate

`ValtheraCreate()` creates a forged Valthera instance backed by the dir adapter. It is the shortest path from a folder path to a working database.

```typescript
import { ValtheraCreate } from "@wxn0brp/db";

const db = ValtheraCreate<{
  users: { name: string; _id: string };
}>("./data");

await db.users.add({ name: "Alice" });
```

## Signature

```typescript
ValtheraCreate<T>(folder: string, options?: DbDirOpts)
```

- `folder` - directory where the collections are stored; created on `init()` if missing.
- `options` - single options object shared by the database core and the dir adapter.
- `T` - optional map of collection names to document types. Every key becomes a typed collection (`db.users`, `db.posts`, ...).

## Options

The object is typed as `DbDirOpts`, which already contains every core option except `adapter`. The same object is passed to `ValtheraClass` and to `createFileAdapter()`, so there is no split between "database options" and "adapter options".

### Core options

| Option | Type | Description |
| --- | --- | --- |
| `executor` | `ExecutorInterface` | Custom executor. Defaults to `SmartExecutor`. |
| `executorAware` | `boolean` | Marks queries as executor-aware. Defaults to `true`. |
| `adapterOpts` | `AdapterOpts` | `numberId` and `idKey` configuration. |

### Dir adapter options

| Option | Type | Description |
| --- | --- | --- |
| `format` | `string \| Format` | Serialization format (for example `"json5"`, `"json5:x"`). Defaults to `"json5:x"`. |
| `maxFileSize` | `number` | Maximum size of a single data file before a new one is started. Defaults to 2 MB. |
| `delimiter` | `string` | Entry delimiter. Taken from the format when omitted. |
| `stringifyArgs` | `any[]` | Extra arguments forwarded to the format serializer. |

## Examples

### Change the file format and size limit

```typescript
const db = ValtheraCreate("./data", {
  format: "json5",
  maxFileSize: 1024 * 1024,
});
```

### Custom ID key

```typescript
const db = ValtheraCreate("./data", {
  adapterOpts: {
    idKey: "id",
  },
});

const user = await db.users.add({ name: "Alice" });
// { name: "Alice", id: "m1abc23-x-y" }
```

### Custom executor

```typescript
const db = ValtheraCreate("./data", {
  executor: myExecutor,
  executorAware: false,
});
```

## When not to use it

`ValtheraCreate()` is tied to the dir adapter. If the storage backend has to be selectable at runtime, use [`VDB()`](../getting_started.md) instead. For direct access to the dir adapter class, use `Valthera` from `@wxn0brp/db/valthera`.
