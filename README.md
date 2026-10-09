# <img src="https://raw.githubusercontent.com/wxn0brP/ValtheraDB/master/logo.svg" alt="ValtheraDB" width="36" height="36"> ValtheraDB (@wxn0brp/db)

[![npm version](https://img.shields.io/npm/v/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)
[![License](https://img.shields.io/npm/l/@wxn0brp/db)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)

**Welcome to ValtheraDB - a modular, embedded database for developers who want to build their perfect data layer. With a familiar API and full flexibility, ValtheraDB gives you control over your data storage.** 

## Installation

To install the package, run:

- Using npm
  ```bash
  npm install @wxn0brp/db
  ```

- Or using bun
  ```bash
  bun add @wxn0brp/db
  ```

- Or using yarn
  ```bash
  yarn add @wxn0brp/db
  ```

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

## Where to Go Next?

-> **Documentation**: [https://wxn0brp.github.io/ValtheraDB/](https://wxn0brp.github.io/ValtheraDB/)

## License

This project is released under the [MIT License](./LICENSE).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on our GitHub repository.
