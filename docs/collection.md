# Collection Class Documentation

This documentation provides a detailed overview of the `Collection` class, designed for performing CRUD operations on Valthera collections.

## Class: `Collection<T extends object = Data>`

### Usage:

```js
const db = ValtheraCreate("db");
const users = db.c("users");
```

### Method: `async add(collection, data, id_gen=true)`
Adds data to a specified collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `data` (`Object`): The data to add.
  - `id_gen` (`boolean`, default: true): Whether to generate an ID for the entry.

- **Returns:**
  - `Promise<T & { _id: string }>`: If `id_gen` is true, a promise that resolves with the added data including a generated `_id`.
  - `Promise<T>`: If `id_gen` is false, a promise that resolves with the added data.

### Method: `async find(collection, search, dbFindOpts, findOpts, context)`
Finds data in a collection based on a query.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`, optional): The search query.
  - `dbFindOpts` (`Object`, optional): Search options (e.g., `max`, `reverse`).
  - `findOpts` (`Object`, optional): Options for updating the search result.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T[]>`: Found data. Empty array if no match is found.

### Method: `async findOne(collection, search, findOpts, context)`
Finds one matching entry in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`, optional): The search query.
  - `findOpts` (`Object`, optional): Options for updating the search result.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T|null>`: Found data. Null if no match is found.

### Method: `async update(collection, search, updater, context)`
Updates data in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `updater` (`function|Object`): Update arguments.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T[] | null>`: Updated data. Null if no match is found.

### Method: `async updateOne(collection, search, updater, context)`
Updates one entry in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `updater` (`function|Object`): Update arguments.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T | null>`: Updated data. Null if no match is found.

### Method: `async updateOneOrAdd(collection, search, updater, options)`
Updates one entry or adds a new one if it doesn't exist.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `updater` (`function|Object`): Update arguments.
  - `options` (`Object`, optional): An object containing `add_arg`, `context`, and `id_gen`.
    - `add_arg` (`Object`): Data to add if no match is found.
    - `context` (`Object`): The context object (for functions).
    - `id_gen` (`boolean`, default: true): Whether to generate an ID for the new entry.

- **Returns:**
  - `Promise<T>`: A promise that resolves with the updated or added entry.

### Method: `async toggleOne(collection, search, data, context)`
Asynchronously updates one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `data` (`Object`, optional): The data to use.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T | null>`: T when added, null when removed.


### Method: `async remove(collection, search, context)`
Removes data from a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T[] | null>`: Removed data. Null if no match is found.

### Method: `async removeOne(collection, search, context)`
Removes one entry from a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T | null>`: Removed data. Null if no match is found.
