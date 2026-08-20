# Relation Class Documentation

The `Relation` class provides a mechanism to handle relationships between collections in a database. It supports one-to-one, one-to-many, and many-to-many relationships.

## Class: `Relation`

### Constructor: `Relation(dbs)`
Creates a new instance of the `Relation` class.

- **Parameters:**
  - `dbs` (`RelationTypes.DBS`): An object mapping database names to `ValtheraClass` or compatible instances.

---

### `async findOne(path, search, relations, select?)`
Finds a single entry in a collection and resolves its relations.

- **Parameters:**
  - `path` (`RelationTypes.Path`): A tuple `[dbName, collectionName]` specifying the database and collection.
  - `search` (`Search`): The search criteria.
  - `relations` (`RelationTypes.Relation`): The relations to resolve.
  - `select` (`string[][] | Record<string, any>`, optional): Fields to include in the result. Accepts array of paths or an object with paths as values.

- **Returns:**
  - `Promise<Object | null>`: The found entry with resolved relations, or `null` if no match is found.

---

### `async find(path, search, relations, select?, dbFindOpts?)`
Finds multiple entries in a collection and resolves their relations.

- **Parameters:**
  - `path` (`RelationTypes.Path`): A tuple `[dbName, collectionName]` specifying the database and collection.
  - `search` (`Search`): The search criteria.
  - `relations` (`RelationTypes.Relation`): The relations to resolve.
  - `select` (`string[][] | Record<string, any>`, optional): Fields to include in the results.
  - `dbFindOpts` (`DbFindOpts`, optional): Options for the find operation (pagination, sorting, etc.).

- **Returns:**
  - `Promise<Object[]>`: An array of found entries with resolved relations.

---

### Relation Types

The `Relation` class supports the following relation types:

#### `"1"` - One-to-One (Batch)

Resolves a single related entry per document using a batched `$in` query. This is the most performant one-to-one mode.

```javascript
{
  author: {
    path: ["main", "users"],
    pk: "_id",        // field on the source document
    fk: "_id",        // field on the related document
    type: "1"
  }
}
```

#### `"11"` - One-to-One (Individual)

Similar to `"1"`, but internally performs a `findOne` operation for each document during a `find` query. Less performant but useful with custom adapters or legacy systems.

```javascript
{
  author: {
    path: ["main", "users"],
    pk: "_id",
    fk: "authorId",
    type: "11"
  }
}
```

#### `"1n"` - One-to-Many

Resolves multiple related entries. Supports `dbFindOpts` for sorting/pagination of related items.

```javascript
{
  posts: {
    path: ["main", "posts"],
    pk: "_id",
    fk: "authorId",
    type: "1n",
    dbFindOpts: { limit: 10, sortBy: "createdAt", sortAsc: false }
  }
}
```

#### `"nm"` - Many-to-Many

Resolves all entries via a pivot/join table. **Requires** the `through` option.

```javascript
{
  tags: {
    path: ["main", "tags"],
    pk: "_id",
    fk: "_id",
    type: "nm",
    through: {
      table: "post_tags",  // pivot collection name
      pk: "postId",       // pivot field referencing source
      fk: "tagId",        // pivot field referencing target
      db: "main"          // optional: database name for pivot (defaults to source db)
    }
  }
}
```

---

### Configuration Options

Each relation entry supports these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `path` | `[string, string]` | **required** | `[dbName, collectionName]` of the related data |
| `pk` | `string` | `"_id"` | Field on the source document to match |
| `fk` | `string` | `"_id"` | Field on the related document to match |
| `type` | `"1" \| "11" \| "1n" \| "nm"` | `"1"` | Relationship type |
| `as` | `string` | relation key name | Field name in the result object |
| `select` | `string[]` | `undefined` | Fields to include from related documents |
| `dbFindOpts` | `DbFindOpts` | `{}` | Options for `"1n"` type (sorting, pagination) |
| `through` | `Object` | `undefined` | Pivot table config for `"nm"` type |
| `relations` | `Relation` | `undefined` | Nested relations to resolve on related documents |

### Nested Relations

Relations can be nested to resolve deeply linked data:

```javascript
const relations = {
  author: {
    path: ["main", "users"],
    pk: "_id",
    fk: "_id",
    type: "1",
    relations: {
      // Resolve relations on the author document itself
      recentPosts: {
        path: ["main", "posts"],
        pk: "_id",
        fk: "authorId",
        type: "1n"
      }
    }
  },
  comments: {
    path: ["main", "comments"],
    pk: "_id",
    fk: "postId",
    type: "1n",
    relations: {
      // Resolve relations on each comment
      author: {
        path: ["main", "users"],
        pk: "authorId",
        fk: "_id",
        type: "1"
      }
    }
  }
};
```

### The `as` Option

By default, the relation is stored under the key name used in the relations object. Use `as` to rename it:

```javascript
const relations = {
  writer: {  // key name
    path: ["main", "users"],
    pk: "authorId",
    fk: "_id",
    type: "1",
    as: "author"  // stored as result.author, not result.writer
  }
};
```

### The `select` Option

Use `select` to limit which fields are included from related documents. The foreign key field is automatically added and removed to avoid duplication:

```javascript
{
  author: {
    path: ["main", "users"],
    pk: "_id",
    fk: "_id",
    type: "1",
    select: ["name", "email"]  // only these fields are returned
  }
}
```

`select` accepts an array of field paths. You can also pass an object to `findOne`/`find` as the `select` parameter for result-level field selection:

```javascript
const post = await relation.findOne(
  ["main", "posts"],
  { _id: "post123" },
  relations,
  { title: true, author: { name: true } }  // object form
);
```

---

### Example Usage

```typescript
import { Relation } from "@wxn0brp/db-core";
import { ValtheraCreate } from "@wxn0brp/db";

// Create database instances
const db1 = ValtheraCreate("./db1");
const db2 = ValtheraCreate("./db2");

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
        dbFindOpts: { limit: 20, sortBy: "createdAt", sortAsc: false }
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
