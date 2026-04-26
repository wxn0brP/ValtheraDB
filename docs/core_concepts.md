# ValtheraDB Idea: A Database That Thinks Like a Developer

ValtheraDB is a project born from a simple conviction: a database should adapt to your programming style, not the other way around.

Instead of yet another implementation of rigid paradigms, we created a flexible environment that understands the real challenges of modern applications. It is not just a tool for storing data, it is a philosophy of software development.

## Pluggable Storage Paradigm: Your Vision, Your Medium

### The ideas behind the concept

In traditional databases, form determines substance, the choice of SQL vs NoSQL, local files vs server, defines the architecture of the entire application. ValtheraDB reverses this logic.

The central idea: separating data logic from physical storage. Your code operates on objects and relationships, while the method of persistence is a replaceable module.

### Why is this important?

1. **Evolution without revolution**
   Start with JSON files during prototyping. Move to IndexedDB for PWAs. End up with a remote server in production. All with the same business logic.
2. **A natural language for data**
   You do not think in "tables", "documents", or "graphs". You think in "users", "orders", "events". ValtheraDB speaks your language.
3. **Architecture without compromise**
   Every application has unique requirements. ValtheraDB lets you choose the optimal solution without sacrificing developer convenience.

### Metaphor: File system vs cloud

Just as a file browser works the same for local disks and Dropbox, ValtheraDB provides a unified API regardless of backend. It is abstraction that truly abstracts.

## Relation Engine: Unity in Diversity

### The problem we are solving

Modern applications are ecosystems: microservices, modules, separate databases for different functions. Traditional databases force a choice: either a monolith (everything in one DB) or chaos (manually gluing distributed data).

ValtheraDB proposes a third path: autonomous, yet connected data collections.

### The philosophy of relationships

1. **Declarativity over imperativity**
   Instead of writing algorithms for data joins, you describe relationships between them. The system executes your intent.
2. **Context preserved**
   Data remains in its natural environment (logs in a separate store, users in the main one), but forms a coherent whole during queries.
3. **Semantics over syntax**
   It does not matter how the data is stored - what matters is what it means and how it connects.

### Example in action

Imagine an e-commerce application:

- Main database: products, users
- Separate database: reviews (frequent updates)
- Another database: analytics logs

In the traditional approach - three different queries, manual mapping.
In ValtheraDB - one query combines everything as if it lived in one place.

## Principle of Symmetry: The Same Code, Every Platform

### Unified experience

ValtheraDB stems from a simple observation: developers write business logic, not storage implementations. Therefore, we provide:

1. **Core everywhere, adapters per environment**
   The Valthera core runs identically in Node.js, the browser, and Electron - no environment-specific code. Adapters mediate storage and are naturally tied to their environments, but your business logic remains portable.
2. **Progressive specialization**
   Start with the simplest configuration (JSON files). Move to the advanced one (remote server) without changing a line of application code.
3. **Expressiveness without complexity**
   Powerful capabilities through a simple API. Complex inside, simple outside.

## Security by Design

ValtheraDB treats root-level operators as an internal feature. Users cannot accidentally turn their data input into query operators, which prevents NoSQL injection attacks by design. This is a deliberate choice, not a limitation. You can build with confidence knowing that malicious input cannot manipulate your queries.

## ValtheraDB in the Developer Ecosystem

### Who is this database for?

ValtheraDB works well for several types of developers:

1. **PWA creators** who want consistent online and offline experience without wrestling with the IndexedDB API.
2. **Microservices architects** who need flexible data linking across multiple sources.
3. **Experimenters and prototypes** who value speed of iteration over premature optimization.
4. **Electron app developers** who need local storage that feels natural in JavaScript.
5. **Developers frustrated with SQL and ORMs** who want a MongoDB-like API without running a database server.

### Philosophy in practice

ValtheraDB is not trying to win any benchmark wars. It exists for developers who need something more powerful than juggling arrays in memory, but do not want to deal with the operational overhead of running a database cluster.

Think of it as a flexible layer: you can start with JSON files, plug in SQLite when you need more structure, or even sit ValtheraDB in front of PostgreSQL to get its API while keeping your existing infrastructure. The goal is developer convenience, not enterprise credibility.

### Where it fits

ValtheraDB works well when you are building an Electron app, a progressive web app, a simple server, or an MVP that will eventually need more. It is also useful as a unifying layer when you have multiple data sources and want one consistent interface to work with them.

It is not the right choice if you need petabyte-scale storage, complex distributed transactions, or dedicated DBA teams. For everything else, it tries to stay out of your way.

## Summary

ValtheraDB is a flexible data layer for developers who want to control how their data is stored without being locked into enterprise solutions.

It adapts to your needs: start simple, scale when necessary, and switch backends without rewriting your application logic. No benchmarks to win, no clusters to manage. Just a tool that works the way you expect.

---

Ready to try it? Begin [your journey](./getting_started.md).
