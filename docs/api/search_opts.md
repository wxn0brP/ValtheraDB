# Search Operators

## Operators

### Logical Operators

#### $and

Checks if all conditions in an array are true.

```javascript
{
  $and: [
    { $gt: { age: 20 } },
    { $exists: { name: true } }
  ]
}
```

#### $or

Checks if at least one condition in an array is true.

```javascript
{
  $or: [
    { $lt: { age: 20 } },
    { $gt: { age: 60 } }
  ]
}
```

#### $not

Negates a condition.

```javascript
{
  $not: { $type: { age: "string" } }
}
```

### Comparison Operators

#### $ne

Not equal comparison.

```javascript
{ $ne: { status: "banned" } }
```

#### $gt

Greater than comparison.

```javascript
{ $gt: { age: 18 } }
```

#### $lt

Less than comparison.

```javascript
{ $lt: { score: 100 } }
```

#### $gte

Greater than or equal comparison.

```javascript
{ $gte: { price: 9.99 } }
```

#### $lte

Less than or equal comparison.

```javascript
{ $lte: { quantity: 50 } }
```

#### $idGt

Greater than comparison for IDs (accepts `string` or `number`).

```javascript
{ $idGt: { _id: "miblu25k-d-g" } }
```

#### $idLt

Less than comparison for IDs (accepts `string` or `number`).

```javascript
{ $idLt: { _id: "miblu25k-d-g" } }
```

#### $idGte

Greater than or equal comparison for IDs (accepts `string` or `number`).

```javascript
{ $idGte: { _id: "miblu25k-d-g" } }
```

#### $idLte

Less than or equal comparison for IDs (accepts `string` or `number`).

```javascript
{ $idLte: { _id: "miblu25k-d-g" } }
```

#### $in

Checks if value is in an array.

```javascript
{ $in: { status: ["active", "pending"] } }
```

#### $nin

Checks if value is not in an array.

```javascript
{ $nin: { category: ["archived", "deleted"] } }
```

#### $between

Checks if a number is between two values (inclusive).

```javascript
{ $between: { age: [18, 65] } }
```

### Type and Existence Operators

#### $exists

Checks if a field exists (or doesn't exist).

```javascript
{ $exists: { email: true, deletedAt: false } }
```

For nested fields, use a nested object instead of dotted paths:

```javascript
{ $exists: { address: { zipCode: true } } }
```

#### $type

Checks the type of a field.

```javascript
{ $type: { age: "number", name: "string" } }
```

### Array Operators

#### $arrInc

Checks if an array includes at least one of the specified values.

```javascript
{ $arrInc: { tags: ["developer", "designer"] } }
```

#### $arrIncAll

Checks if an array includes all of the specified values.

```javascript
{ $arrIncAll: { permissions: ["read", "write"] } }
```

#### $size

Checks the length of an array or string.

```javascript
{ $size: { tags: 3 } }
```

### String Operators

#### $regex

Tests a string against a regular expression. Accepts a `RegExp` object or a string pattern.

```javascript
{ $regex: { email: /^[^@]+@[^@]+\.[^@]+$/i } }
```

> **Deprecated**: String patterns are deprecated and will be removed in a future version. Use a `RegExp` object instead.

```javascript
{ $regex: { email: "^[^@]+@[^@]+\\.[^@]+$" } }
```

#### $startsWith

Checks if a string starts with a specified value.

```javascript
{ $startsWith: { name: "Dr." } }
```

#### $endsWith

Checks if a string ends with a specified value.

```javascript
{ $endsWith: { email: "@example.com" } }
```

#### $iStartsWith

Checks if a string starts with a specified value (case-insensitive).

```javascript
{ $iStartsWith: { name: "dr" } } // matches "Dr.", "DR.", "dr."
```

#### $iEndsWith

Checks if a string ends with a specified value (case-insensitive).

```javascript
{ $iEndsWith: { email: "@EXAMPLE.COM" } } // matches "@example.com", "@Example.Com"
```

### Other Operators

#### $subset

Disables advanced operator parsing for the wrapped fields, treating `$`-prefixed keys as literal field names. Use this when your data contains keys that start with `$` (like MongoDB-style fields) and you want to match them literally rather than having them interpreted as operators.


```javascript
// Without $subset: $lt would be interpreted as "less than" operator
// With $subset: $lt is treated as a literal field name
{ $subset: { $lt: "John Doe" } } // checks if the field "$lt" equals "John Doe"
```

### Function-Based Search

> **Deprecated:** function-based search will be removed in a future release. Use operator objects, or a `ValtheraPlugin` for reusable logic. Capture external state in a closure instead of passing `context`.

Instead of using operator objects, you can provide a function for fully custom search logic:

```typescript
// Search function signature:
(data: T, context: VContext) => boolean

// Example: find users older than 20
const adults = await db.users.find(
  (user, ctx) => user.age > 20 && user.status === "active"
);

// Example: using context to pass external state
const threshold = 18;
const adults = await db.users.find(
  (user, ctx) => user.age >= ctx.threshold,
  {},  // dbFindOpts
  {},  // findOpts
  { threshold }  // context
);
```

The function receives the document and a context object, and returns `true` to include the document in results.

## Examples

### Complex Validation


```javascript
const criteria = {
  $and: [
    {
      $or: [
        { $gt: { age: 18 } },
        { $exists: { guardianConsent: true } }
      ]
    },
    {
      $type: { email: "string" },
      $regex: { email: /^[^@]+@[^@]+\.[^@]+$/ }
    },
    {
      $arrIncAll: { roles: ["user"] },
      $not: { $in: { status: ["banned", "suspended"] } }
    }
  ]
};

const user = {
  age: 16,
  guardianConsent: true,
  email: "john@example.com",
  roles: ["user", "premium"],
  status: "active"
};

const isValid = hasFieldsAdvanced(user, criteria); // true
```

### Nested Conditions


```javascript
const criteria = {
  $and: [
    {
      $exists: { address: true },
      $type: { address: "object" }
    },
    {
      $or: [
        { $exists: { address: { zipCode: true } } },
        {
          $and: [
            { $exists: { address: { city: true } } },
            { $exists: { address: { country: true } } }
          ]
        }
      ]
    }
  ]
};

const user = {
  address: {
    city: "New York",
    country: "USA"
  }
};

const isValid = hasFieldsAdvanced(user, criteria); // true
```

## Error Handling

The function throws a `QueryValidationError` (code `QUERY_INVALID`) if:
- The `fields` parameter is not an object
- The `fields` parameter is `null`

Always wrap the function call in a try-catch block when using with untrusted input:


```javascript
import { hasFieldsAdvanced } from "@wxn0brp/db-core/utils/hasFieldsAdvanced";
import { isValtheraError } from "@wxn0brp/db-core/errors";

try {
  const isValid = hasFieldsAdvanced(obj, criteria);
  // Handle result
} catch (error) {
  if (isValtheraError(error)) console.error(error.code, error.message);
}
```

### Undefined Values

A field whose value is `undefined` is still an **existing own key**. It matches direct comparison and `$exists: { field: true }`:


```javascript
const obj = { a: undefined };
hasFieldsAdvanced(obj, { a: undefined }); // true - own key with undefined value
hasFieldsAdvanced(obj, { $exists: { a: true } }); // true - key exists
```

Only a **missing key** requires `$exists`:


```javascript
{ $exists: { a: false } } // checks if key 'a' does not exist
```

### Operator Execution Order

When using multiple operators including `$and` or `$or`, the execution order is:

1. Basic field matching (non-`$` prefixed keys)
2. `$subset` operator
3. Comparison operators (`$gt`, `$lt`, `$in`, etc.)
4. `$not` operator
5. `$and` / `$or` operators (these are evaluated last and return immediately)

This means `$and`/`$or` can short-circuit the evaluation.
For complex queries, structure your criteria accordingly.

### Null vs Undefined

- `null` values are matched with `{ field: null }`
- Missing keys require `$exists: { field: false }`
- A field explicitly set to `undefined` is an existing key and matches `$exists: { field: true }`
