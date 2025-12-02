## Valthera Class Documentation

This documentation provides a detailed overview of the `Valthera` class, designed for performing CRUD operations on Valthera collections. The class uses the `dbActionC` module for file-based operations and `executorC` for managing execution tasks.

### Class: `Valthera`

### Constructor: `Valthera(folder, options={}, fileCpu?)`
Creates a new instance of the `Valthera` class.

- **Parameters:**
  - `folder` (`string`): The folder path where the database files are stored.
  - `options` (`object`): Optional configuration options.
  - `fileCpu` (`FileCpu`, optional): Custom file processor implementation. If not provided, defaults to `vFileCpu`.

### Method: `c(collection)`
Creates a new instance of the `CollectionManager` class for the specified collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
- **Returns:**
  - `CollectionManager`: A new instance of `CollectionManager`.

### Method: `async getCollections()`
Gets the names of all available collections in the database.

- **Returns:**
  - `Promise<string[]>`: A promise that resolves with an array of collection names.

### Method: `async ensureCollection(collection)`
Checks and creates the specified collection if it doesn't exist.

- **Parameters:**
  - `collection` (`string`): The name of the collection to check.

- **Returns:**
  - `Promise<boolean>`: A promise that resolves to `true` if the collection was created or already exists.

### Method: `async issetCollection(collection)`
Checks if a collection exists.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
- **Returns:**
  - `Promise<boolean>`: A promise that resolves to `true` if the collection exists, otherwise `false`.

### Method: `async add<T extends object>(collection, data, id_gen=true)`
Adds data to a specified collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `data` (`Object`): The data to add.
  - `id_gen` (`boolean`, default: true): Whether to generate an ID for the entry.

- **Returns:**
  - `Promise<T & { _id: string }>`: If `id_gen` is true, a promise that resolves with the added data including a generated `_id`.
  - `Promise<T>`: If `id_gen` is false, a promise that resolves with the added data.

### Method: `async find<T = Data>(collection, search, dbFindOpts, findOpts, context)`
Finds data in a collection based on a query.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`, optional): The search query.
  - `dbFindOpts` (`Object`, optional): Search options (e.g., `max`, `reverse`).
  - `findOpts` (`Object`, optional): Options for updating the search result.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<Array<T>>`: A promise that resolves with the matching data.

### Method: `async findOne<T = Data>(collection, search, findOpts, context)`
Finds one matching entry in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`, optional): The search query.
  - `findOpts` (`Object`, optional): Options for updating the search result.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<T|null>`: A promise that resolves with the found entry, or `null` if no match is found.

### Method: `async update<T = Data>(collection, search, updater, context)`
Updates data in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `updater` (`function|Object`): Update arguments.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the data is updated.

### Method: `async updateOne<T = Data>(collection, search, updater, context)`
Updates one entry in a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `updater` (`function|Object`): Update arguments.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the data is updated.

### Method: `async updateOneOrAdd<T = Data>(collection, search, updater, options)`
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
  - `Promise<boolean>`: A promise that resolves to `true` if the entry was updated or created.

### Method: `async toggleOne<T = Data>(collection, search, data, context)`
Asynchronously updates one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `data` (`Object`, optional): The data to use.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the entry is toggled.


### Method: `async remove<T = Data>(collection, search, context)`
Removes data from a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the data is removed.

### Method: `async removeOne<T = Data>(collection, search, context)`
Removes one entry from a collection.

- **Parameters:**
  - `collection` (`string`): The name of the collection.
  - `search` (`function|Object`): The search query.
  - `context` (`Object`, optional): The context object (for functions).

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the entry is removed.

### Method: `async removeCollection(collection)`
Removes the specified collection from the Valthera file system.

- **Parameters:**
  - `collection` (`string`): The name of the collection to remove.

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the collection is removed.