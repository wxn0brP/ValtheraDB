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
  const user = await db.findOne("users", { $gt: { age: 25 } });
  console.log("A user older than 25:", user);

  // Update a document
  await db.updateOne("users", { name: "John Doe" }, { age: 31 });
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

## Introduction to Relations

ValtheraDB also supports relations, allowing you to link documents together. Here's a quick look at how you might define a relationship between `users` and `posts`:

```javascript
import { Valthera, Relation } from "@wxn0brp/db";
const db = new Valthera("./database");

const userPostsRelation = new Relation(db, "users", "posts", {
  field: "authorId", // Field in "posts" that links to a user's _id
  type: "one-to-many"
});

// You can then use this relation to find a user's posts, or the author of a post.
```

This is just a brief introduction. For more in-depth information, please refer to the full documentation on [Relations](relation.md).
