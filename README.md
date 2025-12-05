# <img src="https://raw.githubusercontent.com/wxn0brP/ValtheraDB/master/logo.svg" alt="ValtheraDB Logo" width="36" height="36"> ValtheraDB (@wxn0brp/db)

[![npm version](https://img.shields.io/npm/v/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)
[![License](https://img.shields.io/npm/l/@wxn0brp/db)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)

**Welcome to ValtheraDB – a modular, embedded database for developers who want to build their perfect data layer. With a familiar API and unparalleled flexibility, ValtheraDB empowers you to take control of your data storage.**

---

## Installation

To install the package, run:

```bash
# Using npm
npm install @wxn0brp/db

# Or using yarn
yarn add @wxn0brp/db

# Or using bun
bun add @wxn0brp/db
```

## Our Philosophy: Control and Flexibility

In a world of one-size-fits-all solutions, ValtheraDB is different. We believe that you, the developer, should have the final say on how your data is managed. Our core philosophy is built on two pillars:

*   **Unmatched Modularity:** The storage engine is just a plugin. Don't like JSON files? Use a single binary file, YAML, `localStorage`, or invent your own format. ValtheraDB's architecture is designed to adapt to your needs, not the other way around.
*   **Pragmatic Power:** We provide powerful features like cross-database relations and a rich query API, but we keep it simple. ValtheraDB is designed for small to medium-sized applications where a custom-fit and developer experience are more important than supporting massive datasets.

## Who is ValtheraDB for?

ValtheraDB is a great fit if you are:

*   A **Node.js or Bun developer** building a backend and wanting an easy-to-use, embedded database without the overhead of a separate database server.
*   A **frontend developer** creating a Progressive Web App (PWA) that needs offline capabilities or complex client-side storage.
*   An **Electron developer** who needs a straightforward way to store data locally in a desktop application.
*   A **creative coder** who wants to experiment with unconventional storage methods for your projects.

In short, if you value flexibility and control over rigid conventions, you'll feel right at home.

## Key Features at a Glance

*   🧱 **Pluggable Storage Engine:** Bring your own storage adapter.
*   🤝 **Powerful Cross-Database Relations:** Create relationships between data across entirely separate database instances.
*   🧠 **Familiar MongoDB-like API:** Start working quickly with an intuitive and expressive query language.
*   🌐 **Runs Everywhere:** Optimized for **Bun**, great with **Node.js**, and fully capable in the **browser**.
*   🚀 **Client-Server Ready:** Scale from an embedded solution to a client-server architecture when you need to.
*   🚫 **Zero Configuration:** Point it to a directory, and you're good to go.

## Where to Go Next?

- **Documentation Website**: [https://wxn0brp.github.io/ValtheraDB/](https://wxn0brp.github.io/ValtheraDB/)
- **[Getting Started](docs/getting_started.md):** Jump into our hands-on tutorial and build your first application with ValtheraDB.
- **[Core Concepts](docs/core_concepts.md):** Learn about the fundamental ideas that make ValtheraDB unique.
- **API Reference:**
    - [Valthera Class](docs/valthera.md)
    - [Relations](docs/relation.md)
    - [Search Operators](docs/search_opts.md)
    - [Update Operators](docs/updater.md)
    - [Find Options](docs/find_opts.md)
    - [Remote](docs/remote.md)

## License

This project is released under the [MIT License](./LICENSE).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on our GitHub repository.