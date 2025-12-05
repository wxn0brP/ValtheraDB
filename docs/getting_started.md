# Getting Started: Building a Mini-Blog

Welcome to ValtheraDB! This guide will walk you through the entire process of building a simple application—a mini-blog—to demonstrate how to get up and running quickly. We'll cover everything from installation to using powerful features like relations.

By the end of this tutorial, you will have learned how to:
- Install ValtheraDB
- Create a database and collections
- Add and query for data
- Link related data together

---

## Step 1: Installation

First things first, let's add ValtheraDB to your project. Open your terminal and run the following command:

```bash
# Using npm
npm install @wxn0brp/db

# Or using yarn
yarn add @wxn0brp/db

# Or using bun
bun add @wxn0brp/db
```

Now you're ready to start using it in your code.

---

## Step 2: Setting Up the Database

ValtheraDB is an embedded database, which means it runs directly within your application. To get started, you just need to point it to a directory where it can store its data.

Let's create our database instance.

```typescript
import { Valthera } from "@wxn0brp/db";

// Create a new database instance inside the "./my-blog-db" directory
const db = new Valthera("./my-blog-db");

console.log("Database created!");
```

If you run this code, a new folder named `my-blog-db` will be created in your project. This is where all your collections and documents will live. It's that simple!

---

## Step 3: Adding Your First User

Our blog will have authors, so let's create a `users` collection and add our first author to it. A "collection" is just a group of similar documents, like a table in a SQL database.

The `db.add()` method adds a new document to a specified collection and automatically generates a unique `_id` for it.

```typescript
import { Valthera } from "@wxn0brp/db";
const db = new Valthera("./my-blog-db");

async function setup() {
  // Add a new document to the "users" collection
  const author = await db.add("users", {
    name: "Jane Doe",
    email: "jane.doe@example.com"
  });

  console.log("Successfully added author:", author);
  // Expected output:
  // Successfully added author: { name: 'Jane Doe', email: 'jane.doe@example.com', _id: '...' }
}

setup();
```

---

## Step 4: Adding Posts for Our User

Now that we have an author, let's give them something to write. We'll create a `posts` collection. To link a post to its author, we'll add an `authorId` field to our post documents, storing the `_id` of the user we just created.

```typescript
import { Valthera } from "@wxn0brp/db";
const db = new Valthera("./my-blog-db");

async function setup() {
  // First, find our author to get their ID
  const author = await db.findOne("users", { email: "jane.doe@example.com" });

  if (!author) {
    console.log("Author not found!");
    return;
  }

  // Now, add a couple of posts linked to the author
  const post1 = await db.add("posts", {
    title: "My First Post",
    content: "This is the content of my first post.",
    authorId: author._id // Link to the author
  });

  const post2 = await db.add("posts", {
    title: "Advanced Concepts",
    content: "Exploring the depths of ValtheraDB.",
    authorId: author._id // Link to the same author
  });

  console.log("Added posts:", post1, post2);
}

setup();
```

Here we used `db.findOne()` to retrieve a single document that matches our query. It's a quick way to find a specific entry.

---

## Step 5: Updating Data

Sometimes, data changes! ValtheraDB provides easy ways to update existing documents. Let's say Jane Doe decided to update her email address. We can use `db.updateOne()` to modify her user record.

```typescript
import { Valthera } from "@wxn0brp/db";
const db = new Valthera("./my-blog-db");

async function updateAuthor() {
  const updated = await db.updateOne(
    "users",
    { name: "Jane Doe" }, // Find Jane Doe
    { email: "jane.d.new@example.com" } // Update her email
  );

  if (updated) {
    console.log("Author's email updated successfully!");
  } else {
    console.log("Author not found or no changes made.");
  }

  // Verify the update
  const jane = await db.findOne("users", { name: "Jane Doe" });
  console.log("Updated Jane Doe:", jane);
}

updateAuthor();
```

The `db.updateOne()` method takes a search query and an updater object. It finds the *first* document matching the query and applies the updates. For more complex updates (like incrementing numbers or manipulating arrays), you can use [Updater Operators](updater.md).

---

## Step 6: Updating or Adding (Upsert)

Sometimes you need to ensure that a piece of data exists: updating it if it's already there or creating it if it's new. This is a common pattern known as "upsert", and ValtheraDB supports it with `db.updateOneOrAdd()`.

Let's try to update a post. If the post with a specific title exists, we'll update its content. If not, we'll add it as a new post.

```typescript
import { Valthera } from "@wxn0brp/db";
const db = new Valthera("./my-blog-db");

async function upsertPost() {
  // First, get the author's ID for linking new posts
  const author = await db.findOne("users", { email: "jane.d.new@example.com" });
  if (!author) {
    console.error("Author not found for upsert operation.");
    return;
  }

  // Scenario 1: Update an existing post
  const updatedExisting = await db.updateOneOrAdd(
    "posts",
    { title: "My First Post" }, // Search for this post
    { content: "This is the *updated* content of my first post." } // Update its content
  );
  console.log("Updated existing post?", updatedExisting);

  // Scenario 2: Add a new post if it doesn't exist
  const addedNew = await db.updateOneOrAdd(
    "posts",
    { title: "A Brand New Post" }, // Search for this post (it won't exist yet)
    {
      content: "This post was created using updateOneOrAdd.",
    }, // Data to update/add
    { 
      add_arg: {
        authorId: author._id
      } // Data to add if new
    }
  );
  console.log("Added new post?", addedNew);

  // Verify the changes
  const posts = await db.find("posts", { authorId: author._id });
  console.log("All posts after upsert:", posts);
}

upsertPost();
```

`db.updateOneOrAdd()` is incredibly flexible. The `add_arg` option allows you to specify additional data to be merged when a new document is created.

---

## Step 7: Bringing It All Together with Relations

We now have users and posts, but they are in separate collections. How do we retrieve a user *and* all their posts in a single query? This is where ValtheraDB's `Relation` engine shines.

Relations allow you to define relationships between your collections and fetch linked data effortlessly.

Let's find our author and embed all of their posts directly into the result.

```typescript
import { Valthera, Relation } from "@wxn0brp/db";
const db = new Valthera("./my-blog-db");

async function findUserWithPosts() {
  // 1. The Relation class needs an object mapping names to database instances.
  const dbs = {
    main: db,
  };

  // 2. Define the relationship.
  // We're creating a relation named "posts".
  const relations = {
    posts: {
      // It finds data in the "posts" collection of the "main" db.
      path: ["main", "posts"],
      // It's a "one-to-many" relationship.
      type: "1n",
      // It matches documents where the "authorId" in the "posts" collection...
      fk: "authorId",
      // ...is equal to the "_id" in the "users" collection.
      pk: "_id"
    },
  };

  // 3. Create a new Relation instance.
  const relation = new Relation(dbs);

  // 4. Find the user and apply the relations.
  const authorWithPosts = await relation.findOne(
    ["main", "users"], // The collection we are querying
    { email: "jane.doe@example.com" }, // The user we are looking for
    relations // The relations to apply
  );

  console.dir(authorWithPosts, { depth: null });
}

findUserWithPosts();
```

The `console.dir` output will show you the user object with a new `posts` array field containing the full documents of both posts we created.

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "_id": "...",
  "posts": [
    {
      "title": "My First Post",
      "content": "This is the content of my first post.",
      "authorId": "...",
      "_id": "..."
    },
    {
      "title": "Advanced Concepts",
      "content": "Exploring the depths of ValtheraDB.",
      "authorId": "...",
      "_id": "..."
    }
  ]
}
```

## What's Next?

Congratulations! You've just scratched the surface of what ValtheraDB can do.

- Ready to learn about the fundamental ideas behind ValtheraDB? Dive into our **[Core Concepts](core_concepts.md)** page.
- Want to see all the powerful ways you can query your data? Check out the **[Search Options](search_opts.md)**.
- Curious about how to perform complex data updates? Read the **[Updater](updater.md)** documentation.
