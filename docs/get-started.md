# Getting Started

## Installation

To install the package, run:

```bash
npm install @wxn0brp/db
```

## Usage

You can import the necessary classes/functions from the package as follows:

```javascript
import { Valthera, ValtheraRemote, Relation, genId, ValtheraMemory, ValtheraAutoCreate } from "@wxn0brp/db";
```

### Examples
```javascript
import { Valthera } from "@wxn0brp/db";

// Create a new Valthera database instance
const db = new Valthera("./database");

// Add a new document to the database
const addResult = await db.add("users", { name: "John Doe", age: 30 });
console.log(addResult); // { _id: "abcdefghi-4-9", name: "John Doe", age: 30 }

// Find all documents in the collection
const findResults = await db.find("users", {});
console.log(findResults); // [{ _id: "abcdefghi-4-9", name: "John Doe", age: 30 }]

// Find a single document in the collection.
const user = await db.findOne("users", { $gt: { age: 25 } });
console.log(user); // { _id: "abcdefghi-4-9", name: "John Doe", age: 30 }

// Update a document in the collection
const updateResult = await db.updateOne("users", { name: "John Doe" }, { age: 31 });
console.log(updateResult); // true

// Remove a document from the collection
const removeResult = await db.removeOne("users", { name: "John Doe" });
console.log(removeResult); // true
```
