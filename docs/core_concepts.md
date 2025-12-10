# ValtheraDB Idea: A Database That Thinks Like a Developer

Welcome to the world of ValtheraDB – a project born from a simple conviction: a database should adapt to your programming style, not the other way around.

Instead of yet another implementation of rigid paradigms, we created a flexible environment that understands the real challenges of modern applications. It is not just a tool for storing data – it is a philosophy of software development.

## Pluggable Storage Paradigm: Your Vision, Your Medium

### The ideas behind the concept

In traditional databases, form determines substance – the choice of SQL vs NoSQL, local files vs server, defines the architecture of the entire application. ValtheraDB reverses this logic.

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

Modern applications are ecosystems – microservices, modules, separate databases for different functions. Traditional databases force a choice: either a monolith (everything in one DB) or chaos (manually gluing distributed data).

ValtheraDB proposes a third path: autonomous, yet connected data collections.

### The philosophy of relationships

1. **Declarativity over imperativity**
   Instead of writing algorithms for data joins, you describe relationships between them. The system executes your intent.
2. **Context preserved**
   Data remains in its natural environment (logs in a separate store, users in the main one), but forms a coherent whole during queries.
3. **Semantics over syntax**
   It does not matter how the data is stored – what matters is what it means and how it connects.

### Example in action

Imagine an e-commerce application:

- Main database: products, users
- Separate database: reviews (frequent updates)
- Another database: analytics logs

In the traditional approach – three different queries, manual mapping.
In ValtheraDB – one query combines everything as if it lived in one place.

## Principle of Symmetry: The Same Code, Every Platform

### Unified experience

ValtheraDB stems from a simple observation: developers write business logic, not storage implementations. Therefore, we provide:

1. **Environment isomorphism**
   The same code runs in Node.js, the browser, and Electron. No conditional imports, no polyfills.
2. **Progressive specialization**
   Start with the simplest configuration (JSON files). Move to the advanced one (remote server) without changing a line of application code.
3. **Expressiveness without complexity**
   Powerful capabilities through a simple API. Complex inside, simple outside.

## Security by Design: Protecting Against NoSQL Injection

ValtheraDB prioritizes security, particularly against common vulnerabilities like NoSQL injection. A key design principle that contributes to this security is the strict handling of root-level operators.

It is crucial to understand that the treatment of root-level operators as an internal, controlled feature, rather than a user-promotable one, is a deliberate design choice, not a limitation. This approach inherently protects applications by preventing malicious users from elevating data input into query operators. By disallowing users from introducing or overriding operators within their input, ValtheraDB effectively mitigates the risk of query manipulation, ensuring that data operations remain within the defined scope and intent of the application developer. This means you can build with confidence, knowing that your queries are safeguarded from unauthorized alterations through data input.

## ValtheraDB in the Developer Ecosystem

### Who is this database for?

1. **PWA creators**
   They want consistent online/offline experience without the burden of IndexedDB API.
2. **Microservices architects**
   They need flexible data linking across multiple sources.
3. **Experimenters and prototypes**
   They value speed of iteration over premature optimization.
4. **Educators**
   They seek a system that teaches concepts, not the syntax of a specific technology.

### Philosophy in practice

ValtheraDB does not compete with PostgreSQL or MongoDB in their niches. It offers a third space – where what matters is not petabyte performance, but the joy of development.

It is a database that:

- Remembers that you are building an application, not managing data
- Understands that projects evolve from MVP to scalable solutions
- Respects that each environment (backend, frontend, desktop) has its own constraints

## Summary: A Database as a Collaborator

ValtheraDB is more than a tool – it is a partner in the software creation process. It does not impose limitations but offers possibilities. It does not complicate simple tasks but enables advanced scenarios.

In a world dominated by "one size fits all", ValtheraDB is a rebellion: the developer knows best what is right for their application. We simply provide the capabilities – you decide how to use them.

It is a database that does not ask "why do you want to do this?", but "how can I help you do it?"

---

Ready to build software according to your vision, not the limitations of tools?
Begin [your journey](./getting_started.md) with a database that thinks the way you do.