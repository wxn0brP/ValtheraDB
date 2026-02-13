# Relation Class Documentation

The `Relation` class provides a mechanism to handle relationships between collections in a database. It supports one-to-one, one-to-many, and many-to-many relationships.

## Class: `Relation`

### Constructor: `Relation(dbs)`
Creates a new instance of the `Relation` class.

- **Parameters:**
  - `dbs` (`RelationTypes.DBS`): An object mapping database names to `DataBase` or `DataBaseRemote` instances.

---

### `async findOne(path, search, relations, select?)`
Finds a single entry in a collection and resolves its relations.

- **Parameters:**
  - `path` (`RelationTypes.Path`): A tuple specifying the database and collection.
  - `search` (`Search`): The search criteria.
  - `relations` (`RelationTypes.Relation`): The relations to resolve.
  - `select` (`RelationTypes.FieldPath[]`, optional): Fields to select in the result.

- **Returns:**
  - `Promise<Object | null>`: The found entry with resolved relations, or `null` if no match is found.

---

### `async find(path, search, relations, select?, findOpts?)`
Finds multiple entries in a collection and resolves their relations.

- **Parameters:**
  - `path` (`RelationTypes.Path`): A tuple specifying the database and collection.
  - `search` (`Search`): The search criteria.
  - `relations` (`RelationTypes.Relation`): The relations to resolve.
  - `select` (`RelationTypes.FieldPath[]`, optional): Fields to select in the results.
  - `findOpts` (`DbFindOpts`, optional): Options for the find operation.

- **Returns:**
  - `Promise<Object[]>`: An array of found entries with resolved relations.

---

### Relation Types

The `Relation` class supports the following relation types:

1. **One-to-One (`"1"`)**: Resolves a single related entry.
2. **One-to-Many (`"1n"`)**: Resolves multiple related entries.
3. **Many-to-Many (`"nm"`)**: Resolves all entries in the related collection.
4. **Legacy One-to-One (`"11"`)**: Similar to `"1"`, but internally performs a `findOne` operation for each document during a `find` query. This mode is less performant but might be useful in specific scenarios, such as with custom adapters or legacy systems. This is considered a **legacy mode** but is still fully supported.

---

### Example Usage

```javascript
import Relation from "@wxn0brp/db";
import { ValtheraAutoCreate } from "@wxn0brp/db/autoCreate";

// Create database instances
const db1 = ValtheraAutoCreate("path/to/db1");
const db2 = ValtheraAutoCreate("path/to/db2");

// Define databases
const dbs = {
    db1,
    db2
};

// Define relations
const relations = {
    author: {
        path: ["db1", "users"],
        pk: "authorId",
        fk: "_id",
        type: "1",
        select: ["name", "email"]
    },
    comments: {
        path: ["db2", "comments"],
        pk: "_id",
        fk: "postId",
        type: "1n",
        select: ["content", "createdAt"]
    }
};

// Create a Relation instance
const relation = new Relation(dbs);

// Find a single post with relations
const post = await relation.findOne(
    ["db1", "posts"],
    { _id: "post123" },
    relations,
    [["title"], ["author.name"], ["comments.content"]]
);

console.log(post);

// Find multiple posts with relations
const posts = await relation.find(
    ["db1", "posts"],
    { category: "tech" },
    relations,
    [["title"], ["author.name"], ["comments.content"]],
    { limit: 10 }
);

console.log(posts);
```

This example demonstrates how to use the `Relation` class to resolve relationships between collections in different databases.
