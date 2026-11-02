# TypeScript Types

`Collection<T>` and the query types are generic over the document type. All checks described here happen at compile time; runtime behavior is unchanged.

## Strict Mode

Strict mode is opt-in. `IsStrict` resolves to `false` while `TypeConfig` is empty, so query types accept any key by default.

Enable it with a module augmentation:

```typescript
declare module "@wxn0brp/db-core/types/config" {
  interface TypeConfig {
    strict: true;
  }
}
```

The augmentation is project-wide.

## Document Type

The document type is set when the collection is created:

```typescript
type User = {
  name: string;
  age: number;
  address: { city: string; zip?: string };
};

const users = db.c<User>("users");
// or with forgeTypedValthera<{ users: User }>:
const users = db.users;
```

`WithId<T>` adds an optional `_id: string`, so `_id` is accepted wherever the document type is used. Strict payloads still allow partial documents, so `_id` is never required by `Arg<T>`.

## Query Types

| Type | Used by | Loose | Strict |
| --- | --- | --- | --- |
| `Arg<T>` | `add`, `bulkAdd`, `toggleOne`, `add_arg` | any key | `FieldsOf<WithId<T>>` |
| `SearchOptions<T>` | `find`, `findOne`, `count`, `update`, `updateOne`, `remove`, `removeOne`, `updateOneOrAdd`, `toggleOne` | any key plus operators | `FieldsOf<WithId<T>>` plus operators |
| `UpdaterArg<T>` | `update`, `updateOne`, `updateOneOrAdd` | any key plus operators | `FieldsOf<WithId<T>>` plus operators |
| `$set` | updater payload | `NestedValue<T, any>` | `FieldsOf<WithId<T>>` |

Nested objects accept partial or full values. Leaf types (`Date`, `RegExp`, functions, arrays) are preserved.

### `Arg<T>`

Payload accepted by `add`, `bulkAdd`, `toggleOne`, and `updateOneOrAdd` (`add_arg`).

- Loose: any key, including keys that are not part of `T`.
- Strict: fields of `T` and `_id`. Unknown keys and wrong value types are rejected.

### `SearchOptions<T>`

Query accepted by `find`, `findOne`, `count`, `update`, `updateOne`, `remove`, `removeOne`, `updateOneOrAdd`, and `toggleOne`.

Operators are top-level keys, exactly as at runtime:

```typescript
await users.find({ age: 18 });          // plain field
await users.find({ $gt: { age: 18 } }); // operator
```

- Loose: any key plus operators.
- Strict: fields of `T` and `_id` plus operators. Nested operator syntax such as `{ age: { $gt: 18 } }` is rejected because operators are not nested inside fields.

### `UpdaterArg<T>`

Updater accepted by `update`, `updateOne`, and `updateOneOrAdd`.

- Loose: any key plus update operators.
- Strict: update operators plus fields of `T` and `_id`.

### `$set`

- Loose: `NestedValue<T, any>`, so any matching field path is accepted.
- Strict: `FieldsOf<WithId<T>>`, the same field set as a plain assignment.

## Strict Mode Example

```typescript
type User = {
  name: string;
  age: number;
  address: { city: string; zip?: string };
};

const users = db.c<User>("users");

await users.add({ name: "Alice", age: 30 });
await users.add({ name: "Alice", role: "admin" });        // error: unknown key
await users.find({ age: 18 });
await users.find({ $gt: { age: 18 } });
await users.find({ age: { $gt: 18 } });                   // error: operator nested in field
await users.update({ name: "Alice" }, { $inc: { age: 1 } });
await users.update({ name: "Alice" }, { age: "old" });    // error: wrong value type
```

## Notes

- Strict mode checks field names and value types only. It does not change query semantics.
- In `VQueryT` query objects, payload fields use `NoInfer`, so `T` comes from the query generic rather than from `search`, `updater`, or `data`.
- Helpers are exported from `@wxn0brp/db-core/types/utils`: `WithId`, `FieldsOf`, `Leaf`, `NestedValue`, `DeepPartial`, `KeysMatching`, `PartialOfType`, and `PartialPickMatching`.
