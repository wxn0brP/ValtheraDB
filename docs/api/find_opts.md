# Find Options (Post-Matching Processing)

## **Description**
These options are applied as part of a **post-processing step** after matching objects are found in the database (`find` stage) but before the data is returned to the client.  
This process is designed to:  
1. **Reduce data transfer size** by removing unnecessary fields or selecting only the required ones.  
2. **Customize results** by transforming objects to meet specific requirements.  

This optimization improves both performance and result usability, ensuring the client receives precisely the needed data in a compact form.

---

## **Execution Stack**
1. **`transform`**
2. **`exclude`**
3. **`select`**

---

## **Operators**

### **`select`**
Selects only specific fields to include in the final object.

```javascript
// Original Object
{
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "active"
}

// Find Options
{
    select: ["name", "email"]
}

// Result
{
    name: "John Doe",
    email: "john@example.com"
}
```

---

### **`exclude`**
Excludes specific fields from the object, removing unwanted data.

```javascript
// Original Object
{
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "active"
}

// Find Options
{
    exclude: ["name"]
}

// Result
{
    email: "john@example.com",
    age: 30,
    status: "active"
}
```

---

### **`transform`**
Applies a custom updater function to modify the object.

```javascript
// Original Object
{
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "active"
}

// Find Options
{
    transform: (doc) => {
        doc.name = doc.name.toUpperCase();
        return doc;
    }
}

// Result
{
    name: "JOHN DOE",
    email: "john@example.com",
    age: 30,
    status: "active"
}
```

---

### **Combined Example**
Using all operators together to demonstrate the execution stack.

```javascript
// Original Object
{
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "active"
}

// Find Options
{
    transform: (doc) => {
        doc.newField = "added";
        doc.status = "inactive";
        return doc;
    },
    exclude: ["email", "newField"],
    select: ["name", "status"]
}

// Execution Steps:
1. transform:
   {
       name: "John Doe",
       email: "john@example.com",
       age: 30,
       status: "inactive",
       newField: "added"
   }
2. exclude:
   {
       name: "John Doe",
       age: 30,
       status: "inactive"
   }
3. select:
   {
       name: "John Doe",
       status: "inactive"
   }

// Final Result:
{
    name: "John Doe",
    status: "inactive"
}
```

---

## Edge Cases and Important Notes

### Nested Paths with Arrays

When using dotted paths or array paths in `select` / `exclude`,
**paths do not traverse through arrays**.
If a path segment points to an array, it will be replaced with an empty object:

```javascript
// Original Object
{
    users: [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 }
    ]
}

// Find Options
{
    select: ["users.name"]
}

// Result - array is replaced with object!
{
    users: {
        name: undefined  // array was replaced
    }
}
```

To work with array elements, use array paths with specific indices:

```javascript
{
    select: [["users", "0", "name"]]
}
```

### Empty Select vs Empty Exclude

- `select: []` returns an **empty object** `{}`
- `exclude: []` returns the **original object** unchanged

### Transform Function Return Value

The `transform` function can either:

1. **Modify and return** the object (creates new reference)
2. **Mutate in place** and return `undefined` (keeps original reference)

```javascript
// Option 1: Return new object
{ transform: (doc) => ({ ...doc, modified: true }) }

// Option 2: Mutate in place
{ transform: (doc) => { doc.modified = true; } }
```

### Select and Exclude Interaction

When both `select` and `exclude` are used:

1. `exclude` is applied first (removes fields from the object)
2. `select` is applied second (creates object with only selected fields from the remaining)

```javascript
// Original: { a: 1, b: 2, c: 3, d: 4 }
{
    exclude: ["b"],            // Step 1: { a: 1, c: 3, d: 4 }
    select: ["a", "c"]         // Step 2: { a: 1, c: 3 }
}
```

The full execution order is always: `transform` -> `exclude` -> `select`.

### Non-Existent Paths

- Selecting non-existent paths silently returns `undefined` for that field
- Excluding non-existent paths has no effect (no error thrown)
