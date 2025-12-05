# Core Concepts

This page dives deeper into the fundamental concepts and the architecture that make ValtheraDB so flexible. Understanding these ideas will help you get the most out of the database.

---

## The Core Idea: Pluggable Adapters

The single most important feature of ValtheraDB is its **pluggable adapter architecture**.

Most databases are tightly coupled to their storage engine. ValtheraDB is different. The core logic (querying, updating, managing relations) is completely separate from how the data is actually written to or read from a physical (or virtual) medium. This "how" is handled by an **Adapter**.

The default adapter, which is used when you initialize `new Valthera("./my-db")`, is a simple file-system adapter. It creates a directory per collection. This is great for readability and debugging, but it might not be the best for performance or for every use case.

### Why is this so powerful?

Because the storage mechanism is just a plugin, you can completely change how ValtheraDB stores data without changing your application code. You could:

-   **Create a single-file adapter:** Store your entire database in one compressed binary file.
-   **Use `localStorage`:** Create a browser-specific adapter that persists data in `localStorage`, perfect for offline-first applications.
-   **Build a YAML adapter:** If you prefer human-readable YAML files over JSON.
-   **Write a remote adapter:** This is exactly how ValtheraDB's client-server model works! `ValtheraRemote` is an adapter that sends API requests to a server instead of writing to the filesystem.
-   **See predefined adapters**: [Click me](https://wxn0brp.github.io/index/?q=ValtheraDB).

This modularity gives you ultimate control over your data layer, allowing you to optimize for your specific environment and needs.

---

## The Relation Engine

Another key feature of ValtheraDB is its powerful **Relation Engine**.

In many NoSQL databases, handling relationships can be cumbersome. You either embed documents within other documents (which can lead to data duplication) or you store IDs and have to perform multiple queries in your application logic to "join" the data.

ValtheraDB provides a declarative way to handle this. The `Relation` class lets you define how your collections are linked and then automatically resolves these relationships for you in a single query.

### More Than Just Joins

The Relation Engine is especially powerful because it is **database-agnostic**. As shown in the `getting_started.md` tutorial, you define your relationships based on named database instances.

```javascript
const dbs = {
  main: db,
  logs: log_db // A completely separate database instance!
};
```

This means you can create a relationship between a `users` collection in your primary database and a `user_activity` collection in a completely separate `logs` database. This is a level of flexibility not commonly found in embedded databases and allows for creative architectural patterns.

### Supported Relation Types

The engine supports all the common relationship types:

-   **One-to-One (`"1"`):** Link a document to one other document. (e.g., a `user` and their `profile`).
-   **One-to-Many (`"1n"`)**: Link a document to many other documents. (e.g., a `user` and their `posts`).
-   **Many-to-Many (`"nm"`)**: A flexible type that resolves all entries in a related collection, which can be used to model many-to-many relationships with an intermediate linking collection.
-   **Legacy One-to-One (`"11"`)**: Similar to `"1"`, but internally performs a `findOne` operation for each document during a `find` query. This mode is less performant but might be useful in specific scenarios, such as with custom adapters or legacy systems. This is considered a **legacy mode** but is still fully supported.

By combining a pluggable storage architecture with a powerful, cross-database relation engine, ValtheraDB provides a unique and flexible toolset for modern application development.
