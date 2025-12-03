# Getting Started with ValtheraDB

Welcome to ValtheraDB! This guide will walk you through the basics of setting up and using ValtheraDB in your project. We'll cover installation, core concepts, and provide practical examples to get you up and running quickly.

## Installation

To get started, install the ValtheraDB package from npm:

```bash
npm install @wxn0brp/db
```

## Core Concepts

Before we dive into examples, let's briefly touch on a few core concepts:

*   **Database Instance:** The main entry point to your database. You create an instance by specifying a folder where your data will be stored.
*   **Collections:** Collections are like tables in a traditional database. They group similar data together. For example, you might have a `users` collection and a `posts` collection.
*   **Documents:** Documents are individual records within a collection, stored in a JSON-like format. Each document has a unique `_id`.

## Basic Usage

Here's how to import and start using ValtheraDB in your project:

```javascript
import { Valthera } from "@wxn0brp/db";

// Create a new Valthera database instance
const db = new Valthera("./database");

async function main() {
  // Add a new document to the "users" collection
  const newUser = await db.add("users", { name: "John Doe", age: 30 });
  console.log("Added user:", newUser);

  // Find all documents in the "users" collection
  const allUsers = await db.find("users", {});
  console.log("All users:", allUsers);

  // Find a single document where the age is greater than 25
  const user = await db.findOne("users", { age: { $gt: 25 } });
  console.log("A user older than 25:", user);

  // Update a document
  await db.updateOne("users", { name: "John Doe" }, { $set: { age: 31 } });
  console.log("User updated.");

  // Remove a document
  await db.removeOne("users", { name: "John Doe" });
  console.log("User removed.");
}

main();
```

## More Complex Queries

ValtheraDB supports a variety of query operators to help you find the data you need. Here are a few examples:

```javascript
import { Valthera } from "@wxn0brp/db";
const db = new Valthera("./database");

async function queries() {
  // Using $and to match multiple conditions
  const user = await db.findOne("users", { $and: [{ name: "John Doe" }, { age: 30 }] });

  // Using $or to match one of multiple conditions
  const users = await db.find("users", { $or: [{ age: 30 }, { name: "Jane Doe" }] });

  // Using $regex for pattern matching
  const usersWithO = await db.find("users", { name: { $regex: /o/i } });
}
```

## Using In-Memory Storage

For temporary data, testing, or caching, you can use the in-memory storage adapter, `ValtheraMemory`. This adapter doesn't write any data to disk, so all data is lost when the process exits.

```javascript
import { ValtheraMemory } from "@wxn0brp/db";

// Create an in-memory database instance
const memoryDb = new ValtheraMemory();

async function memoryExample() {
  await memoryDb.add("sessions", { sessionId: "abc-123", user: "John Doe" });
  const session = await memoryDb.findOne("sessions", { sessionId: "abc-123" });
  console.log("Session from memory:", session);
}

memoryExample();
```

## A Practical Example of Relations

ValtheraDB's relations allow you to link documents across collections. Let's walk through a common use case: linking users to their posts.

First, let's add a user and a few posts to our database:

```javascript
import { Valthera, Relation } from "@wxn0brp/db";

// Create a database instance
const db = new Valthera("./database");

async function relationsExample() {
  // 1. Add a user and a few posts
  const author = await db.add("users", { name: "Jane Doe" });
  await db.add("posts", { title: "First Post", content: "...", authorId: author._id });
  await db.add("posts", { title: "Second Post", content: "...", authorId: author._id });

  // 2. Define the databases for the relation
  const dbs = {
    main: db,
  };

  // 3. Define the relation structure
  const relations = {
    posts: {
      path: ["main", "posts"],
      pk: "_id",
      fk: "authorId",
      type: "1n", // one-to-many
    },
  };

  // 4. Create a Relation instance
  const relation = new Relation(dbs);

  // 5. Find a user and their related posts
  const userWithPosts = await relation.findOne(
    ["main", "users"],
    { _id: author._id },
    relations
  );

  console.log(JSON.stringify(userWithPosts, null, 2));
}

relationsExample();
```

When you run this, `userWithPosts` will be a user object with a new `posts` field containing an array of their post documents. This is a powerful way to query related data without having to perform manual lookups.

For more in-depth information, please refer to the full documentation on [Relations](relation.md).
