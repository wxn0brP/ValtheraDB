# Collection Class Documentation

This documentation provides a detailed overview of the `Collection` class, designed for performing CRUD operations on Valthera collections.

## Class: `Collection<T extends object = Data>`

### Usage:

```typescript
const db = ValtheraCreate("db");
const users = db.c("users");
// or with forgeTypedValthera:
const users = db.users;
```

### `async add(data, id_gen=true)`
Adds data to the collection.

- **Parameters:**
	- `data` (`Arg<D>`): The data to add.
	- `id_gen` (`boolean`, default: true): Whether to generate an ID for the entry.

- **Returns:**
	- `Promise<T & { _id: string }>`: If `id_gen` is true, a promise that resolves with the added data including a generated `_id`.
	- `Promise<T>`: If `id_gen` is false, a promise that resolves with the added data.

### `async find(search, options, findOpts, context)`
Finds data in the collection based on a query.

- **Parameters:**
	- `search` (`Search<D>`, optional, default: `{}`): The search query.
	- `options` (`DbFindOpts<D>`, optional, default: `{}`): Post-retrieval options (e.g., `max`, `reverse`, `sortBy`, `limit`, `offset`).
	- `findOpts` (`FindOpts<D>`, optional, default: `{}`): Post-matching options (`select`, `exclude`, `transform`).
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D[]>`: Found data. Empty array if no match is found.

### `async findOne(search, findOpts, context)`
Finds one matching entry in the collection.

- **Parameters:**
	- `search` (`Search<D>`, optional, default: `{}`): The search query.
	- `findOpts` (`FindOpts<D>`, optional, default: `{}`): Post-matching options.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D>`: Found data. `undefined` if no match is found.

### `async update(search, updater, context)`
Updates data in the collection.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `updater` (`Updater<D>`): Update arguments.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D[]>`: Updated data. Empty array if no match is found.

### `async updateOne(search, updater, context)`
Updates one entry in the collection.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `updater` (`Updater<D>`): Update arguments.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D | null>`: Updated data. Null if no match is found.

### `async remove(search, context)`
Removes data from the collection.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D[]>`: Removed data. Empty array if no match is found.

### `async removeOne(search, context)`
Removes one entry from the collection.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<D | null>`: Removed data. Null if no match is found.

### `async updateOneOrAdd(search, updater, options)`
Updates one entry or adds a new one if it doesn't exist.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `updater` (`Updater<D>`): Update arguments.
	- `options` (`Object`, optional): An object containing:
		- `add_arg` (`Arg<D>`, default: `{}`): Data to merge when adding a new entry.
		- `context` (`VContext`, default: `{}`): The context object (for function-based queries).
		- `id_gen` (`boolean`, default: true): Whether to generate an ID for the new entry.

- **Returns:**
	- `Promise<{ data: T; type: "added" | "updated" }>`: A promise that resolves with the updated or added entry.

### `async toggleOne(search, data, context)`
Removes one entry if it exists, or adds a new one if it doesn't. Usage e.g. for toggling a flag.

- **Parameters:**
	- `search` (`Search<D>`): The search query.
	- `data` (`Arg<D>`, optional, default: `{}`): The data to use when adding.
	- `context` (`VContext`, optional, default: `{}`): The context object (for function-based queries).

- **Returns:**
	- `Promise<{ data: T; type: "added" | "removed" }>`: A promise that resolves with the removed or added entry.
