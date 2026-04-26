# ValtheraDB Documentation

## Class: `Valthera`

### `async getCollections()`

Gets the names of all available collections in the database.

- **Returns:**
   	- `Promise<string[]>`: A promise that resolves with an array of collection names.

### `async ensureCollection(collection)`

Ensures that the specified collection exists. If the collection does not exist, it will be created.

- **Parameters:**
  	- `collection` (`string`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: The returned value is **adapter-dependent** and must not be relied upon.
- **Notes:**
	- Guarantees that the collection exists after the method resolves.
	- The boolean result has no standardized meaning and should be treated as `void`.

### `async issetCollection(collection)`

Checks if a collection exists.

- **Parameters:**
	- `collection` (`string`): The name of the collection.
- **Returns:**
  	- `Promise<boolean>`: A promise that resolves to `true` if the collection exists, otherwise `false`.

### `async removeCollection(collection)`

Deletes the collection.

- **Parameters:**
  	- `collection` (`string`): The name of the collection to remove.

- **Returns:**
  	- `Promise<boolean>`: A promise that resolves when the collection is removed.
      	- `true`: The collection was successfully removed.
      	- `false`: The collection was not found (i.e., it did not exist, so there was nothing to remove).
