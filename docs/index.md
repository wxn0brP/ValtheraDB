# ValtheraDB: The Modular, Embedded Database for Ultimate Flexibility

**Build your perfect data layer. ValtheraDB is a highly modular, embedded database for Bun, Node.js, and the browser, offering a familiar MongoDB-like API and unparalleled adaptability for your project's needs.**

ValtheraDB is designed for developers who need more than just a simple data store. Its unique modular architecture allows you to swap out core components, such as the storage engine, to perfectly match your requirements. Whether you're building a fast backend with Bun, a cross-platform desktop app, or a progressive web app, ValtheraDB provides the foundation you need.

It is designed for small to medium-sized applications where simplicity and a custom-fit are more important than raw performance for massive datasets.

## Why ValtheraDB?

*   🧱 **Unmatched Modularity:** ValtheraDB's biggest strength is its pluggable architecture. Don't like storing data in a directory of JSON files? Write your own adapter to use a single binary file, YAML, or any format you can imagine. The power is in your hands.
*   🤝 **Powerful Cross-Database Relations:** Go beyond simple table joins. The relation engine can link data across entirely separate database instances. Imagine creating a relation between a `users` table in a `main` database and a `comments` table in a `logs` database—ValtheraDB makes it possible.
*   🧠 **Familiar MongoDB-like API:** Get up to speed quickly with a query API that will feel familiar to anyone who has worked with MongoDB. It's not identical, but it's close enough to make you productive from day one.
*   🌐 **Runs Everywhere, Optimized for Bun:** ValtheraDB is a pure JavaScript solution that works in any modern JavaScript environment. It's optimized for **Bun**, has excellent support for **Node.js**, and can run in the **browser** using in-memory or localStorage adapters.
*   🚀 **Client-Server Ready:** While it excels as an embedded database, ValtheraDB also fully supports a client-server architecture, giving you the flexibility to scale when you need to.
*   🚫 **Zero Configuration:** Get started with no fuss. By default, just point it to a directory, and you have a fully functional database.

## Core Concepts

*   **Valthera:** The main database instance.
*   **Adapters:** Pluggable modules that define how data is stored and read. This allows you to switch from the default directory-based JSON storage to anything you need, like a single file, localStorage, or a custom format.
*   **Relations:** A powerful engine that can define and query relationships between data, even across different database instances.

## Getting Started

Ready to build your custom database solution? Dive into the documentation to learn more:

*   **[Get Started](get-started.md):** Learn how to install and use ValtheraDB.
*   **[Find Options](find_opts.md):** Learn about the available options for find queries.
*   **[Relation](relation.md):** Understand how to create relationships within and between databases.
*   **[Remote](remote.md):** Discover how to set up a client-server architecture.
*   **[Updater](updater.md):** See how to quickly and easily handle data updates.
