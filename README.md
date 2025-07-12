# <img src="./logo.svg" alt="ValtheraDB Logo" width="36" height="36"> ValtheraDB (@wxn0brp/db)

A lightweight file-based database management system that supports CRUD operations, custom queries, and graph structures.

[![npm version](https://img.shields.io/npm/v/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)
[![License](https://img.shields.io/npm/l/@wxn0brp/db)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@wxn0brp/db)](https://www.npmjs.com/package/@wxn0brp/db)

## Installation

To install the package, run:

```bash
npm install @wxn0brp/db
```

## Usage

You can import the necessary classes from the package as follows:

```javascript
import { Valthera, Graph, ValtheraRemote, GraphRemote, Relation, genId, ValtheraMemory, ValtheraAutoCreate } from "@wxn0brp/db";
```

### Examples
```javascript
import { Valthera } from '@wxn0brp/db';

// Create a new Valthera database instance
const db = new Valthera('./database');

// Add a new document to the database
const result = await db.add('users', { name: 'John Doe', age: 30 });
console.log(result); // { _id: 'xxx', name: 'John Doe', age: 30 }

// Find all documents in the collection
const results = await db.find('users', {});
console.log(results); // [{ _id: 'xxx', name: 'John Doe', age: 30 }]

// Find a single document in the collection.
const user = await db.findOne('users', { $gt: { age: 25 } });
console.log(user); // { _id: 'xxx', name: 'John Doe', age: 30 }

// Update a document in the collection
const updateResult = await db.updateOne('users', { name: 'John Doe' }, { age: 31 });
console.log(updateResult); // true

// Remove a document from the collection
const removeResult = await db.removeOne('users', { name: 'John Doe' });
console.log(removeResult); // true
```

## Documentation

Website: [https://wxn0brp.github.io/ValtheraDB/](https://wxn0brp.github.io/ValtheraDB/)

For detailed information, refer to the following resources:

- [Valthera Documentation](./docs/valthera.md)
- [Graph Documentation](./docs/graph.md)
- [Remote Valthera and Graph Client Documentation](./docs/remote.md)
- [Search Options Documentation](./docs/search_opts.md)
- [Find Options Documentation](./docs/find_opts.md)
- [Updater Options Documentation](./docs/updater.md)
- [Relation Documentation](./docs/relation.md)

## License

This project is released under the [MIT License](./LICENSE).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on our GitHub repository.