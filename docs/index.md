# ValtheraDB: Your Data, Your Rules

**Welcome to ValtheraDB, a modular, embedded database for developers who want to build their perfect data layer. With a familiar API and full flexibility, ValtheraDB gives you control over your data storage.**

## Our Philosophy: Control and Flexibility

Instead of one-size-fits-all solutions, ValtheraDB takes a different approach. We believe that you, the developer, should have the final say on how your data is managed. Our core philosophy is built on two pillars:

*   **Modular Storage:** The storage engine is just a plugin. Don't like JSON files? Use a single binary file, YAML, `localStorage`, or invent your own format. ValtheraDB's architecture adapts to your needs.
*   **Practical Features:** We provide cross-database relations and a rich query API, but keep it simple. ValtheraDB is designed for small to medium-sized applications where a custom fit and developer experience matter more than supporting massive datasets.

## Who is ValtheraDB for?

ValtheraDB is a great fit if you are:

*   A **Node.js or Bun developer** building a backend and wanting an easy-to-use, embedded database without the overhead of a separate database server.
*   A **frontend developer** creating a Progressive Web App (PWA) that needs offline capabilities or complex client-side storage.
*   An **Electron developer** who needs a straightforward way to store data locally in a desktop application.
*   A **creative coder** who wants to experiment with unconventional storage methods for your projects.
*   A developer **frustrated with ORMs** who wants the data access pattern of an object database without learning SQL syntax.
*   A team building an **MVP or Electron app** that will eventually outgrow in-memory arrays but doesn't need 10TB sharded infrastructure.

In short, if you value flexibility and control over rigid conventions, you'll feel right at home.

## Key Features

*   **Pluggable Storage Engine:** Bring your own storage adapter.
*   **Cross-Database Relations:** Create relationships between data across entirely separate database instances.
*   **MongoDB-like API:** Start working with an intuitive and expressive query language.
*   **Runs Everywhere:** Optimized for **Bun**, great with **Node.js**, and fully capable in the **browser**.
*   **Client-Server Ready:** Scale from an embedded solution to a client-server architecture when you need to.
*   **Zero Configuration:** Point it to a directory, and you're good to go.
*   **Flexible API:** `ValtheraCreate()` for simplicity, `VDB()` for adapter switching via environment variables.
*   **Multiple Backends:** Dir, SQLite, MongoDB, browser storage, and more.

## Where to Go Next?

*   **[Getting Started](getting_started.md):** Build your first application with ValtheraDB.
*   **[Core Concepts](core_concepts.md):** Learn about the fundamental ideas that make ValtheraDB unique.
*   **[Versioning](versioning.md):** Understand how ValtheraDB handles versioning and compatibility.
*   **API Reference:**
    *   [Search Operators](api/search_opts.md)
    *   [Find Options](api/find_opts.md)
    *   [DB Find Options](api/db_find_opts.md)
    *   [Collection](api/collection.md)
    *   [Valthera Class](api/valthera.md)
    *   [Memory DB](api/memory.md)
    *   [Multi Storage](api/multi_storage.md)
    *   [Forge](api/forge.md)
    *   [ID Generation](api/id.md)
    *   [Relations](api/relation.md)
    *   [Update Operators](api/updater.md)
    *   [Remote](api/remote.md)
*   **Ecosystem:**
    *   [Storage Adapters](ecosystem/adapters.md): All supported storage backends with quick-start guides.
    *   [Server](ecosystem/server.md): Deploy your own ValtheraDB HTTP server.
    *   [CLI](ecosystem/cli.md): Command-line tool for database management.
    *   [Conduit](ecosystem/conduit.md): Embed ValtheraDB from any language via stdio protocol.
    *   [Extensions](ecosystem/extensions.md): CRDT replication, indexing, and file locking.
    *   [Other Tools](ecosystem/tools.md): Benchmark, E2E tests, snapshot, resolver, and more.
*   **Dev's Tutorials:**
    *   [Adapters](dev/adapter.md): Step-by-step guide to creating your own storage adapter.
    *   [Plugins](dev/plugin.md): Learn how to write plugins.
    *   [Executor](dev/executor.md): Understand how operations are queued and executed.
