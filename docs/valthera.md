# ValtheraDB Documentation

## Class: `Valthera`

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

### Method: `async removeCollection(collection)`
Removes the specified collection from the Valthera file system.

- **Parameters:**
  - `collection` (`string`): The name of the collection to remove.

- **Returns:**
  - `Promise<boolean>`: A promise that resolves when the collection is removed.
