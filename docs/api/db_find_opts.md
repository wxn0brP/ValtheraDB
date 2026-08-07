# DbFindOpts (Post-Retrieval Processing)

## **Description**

The `dbFindOpts` parameter provides options for **post-processing** data after it has been retrieved from the database but before it is returned to the client. These options control:

1. **Ordering** - Sort results by a field
2. **Pagination** - Skip and limit the number of returned entries
3. **Direction** - Reverse the order of results
4. **Aggregation** - Group, count, min, max, and average over fields

This allows for efficient data manipulation without requiring additional processing on the client side.

## **Options**

### **`reverse`**

Reverses the order of the results.

```javascript
// Query
{
    dbFindOpts: {
        reverse: true
    }
}

// If original results are: [1, 2, 3, 4, 5]
// Final results will be: [5, 4, 3, 2, 1]
```

**Note:** When `sortBy` is not specified, `reverse` is applied immediately during file iteration. When `sortBy` is used, the final sort order is determined by `sortAsc`.

---

### **`offset`**

Skips a specified number of entries from the beginning of the results.

```javascript
// Query
{
    dbFindOpts: {
        offset: 10
    }
}

// Skips the first 10 entries and returns the rest
```

**Default:** `0`

---

### **`limit`**

Limits the number of returned entries.

```javascript
// Query
{
    dbFindOpts: {
        limit: 20
    }
}

// Returns only the first 20 entries (after offset is applied)
```

**Default:** `-1` (no limit)

---

### **`sortBy`**


Sorts results by a specified field name, randomly, or by multiple fields.

```javascript
// Sort by a field
{
    dbFindOpts: {
        sortBy: "age"
    }
}

// Random sort
{
    dbFindOpts: {
        sortBy: "random()"
    }
}

// Multi-field sort
{
    dbFindOpts: {
        sortBy: [
            { field: "lastName", asc: true },
            { field: "age", asc: false }
        ]
    }
}
```

**Special value:** `"random()"` - Shuffles results randomly using `Math.random()`.

**Multi-field sort:** Pass an array of `{ field, asc? }` objects. Each field is sorted in order; subsequent fields break ties from previous comparisons. `asc` defaults to `true`.

**Default:** `undefined` (no sorting, uses data order)

---

### **`sortAsc`**

Determines the sort direction when `sortBy` is specified.

```javascript
// Ascending order (default)
{
    dbFindOpts: {
        sortBy: "age",
        sortAsc: true
    }
}

// Descending order
{
    dbFindOpts: {
        sortBy: "age",
        sortAsc: false
    }
}
```

**Default:** `true`

---

### **`groupBy`**

Groups results by one or more fields. When specified alongside aggregation operators (`min`, `max`, `avg`, `count`), computations are performed per group.

```javascript
// Group by a single field
{
    dbFindOpts: {
        groupBy: "category",
        count: { total: "id" }
    }
}

// Group by multiple fields
{
    dbFindOpts: {
        groupBy: ["category", "status"],
        count: { total: "id" }
    }
}
```

**Type:** `string | string[]`

**Default:** `undefined` (no grouping, single aggregate over all data)

---

### **`count`**

Counts non-null, non-undefined values per field. Maps output keys to source fields.

```javascript
// Count total entries
{
    dbFindOpts: {
        count: { total: "id" }
    }
}

// Count with grouping
{
    dbFindOpts: {
        groupBy: "category",
        count: { total: "id", activeUsers: "status" }
    }
}
```

**Type:** `Record<string, string>` - `{ outputKey: sourceField }`

**Default:** `undefined`

---

### **`min`**

Computes the minimum numeric value of a field. Maps output keys to source fields.

```javascript
// Youngest age across all entries
{
    dbFindOpts: {
        min: { youngest: "age" }
    }
}

// Min with grouping
{
    dbFindOpts: {
        groupBy: "category",
        min: { cheapest: "price" }
    }
}
```

**Type:** `Record<string, string>` - `{ outputKey: sourceField }`

**Default:** `undefined`

---

### **`max`**

Computes the maximum numeric value of a field. Maps output keys to source fields.

```javascript
// Oldest age across all entries
{
    dbFindOpts: {
        max: { oldest: "age" }
    }
}

// Max with grouping
{
    dbFindOpts: {
        groupBy: "category",
        max: { mostExpensive: "price" }
    }
}
```

**Type:** `Record<string, string>` - `{ outputKey: sourceField }`

**Default:** `undefined`

---

### **`avg`**

Computes the average (mean) numeric value of a field. Maps output keys to source fields.

```javascript
// Average age across all entries
{
    dbFindOpts: {
        avg: { averageAge: "age" }
    }
}

// Average with grouping
{
    dbFindOpts: {
        groupBy: "category",
        avg: { averagePrice: "price" }
    }
}
```

**Type:** `Record<string, string>` - `{ outputKey: sourceField }`

**Default:** `undefined`

---

### **`sum`**

Computes the sum of numeric values of a field. Maps output keys to source fields.

```javascript
// Total revenue across all entries
{
    dbFindOpts: {
        sum: { totalRevenue: "amount" }
    }
}

// Sum with grouping
{
    dbFindOpts: {
        groupBy: "category",
        sum: { totalSales: "price" }
    }
}
```

**Type:** `Record<string, string>` - `{ outputKey: sourceField }`

**Default:** `undefined`

---

### **`distinct`**

Removes duplicate entries based on the value of a specified field. Only the first occurrence of each unique value is kept.

```javascript
// Get unique categories
{
    dbFindOpts: {
        distinct: "category"
    }
}

// Distinct with other options
{
    dbFindOpts: {
        distinct: "email",
        limit: 100
    }
}
```

**Type:** `string` - The field name to deduplicate by.

**Default:** `undefined` (no deduplication)

---

## **Execution Flow**

### Without Aggregation (`min`/`max`/`avg`/`sum`/`groupBy`/`count`)

1. Iterate through files
2. Apply `reverse` during iteration (if specified)
3. Apply `offset` (skip entries)
4. Apply `limit` (truncate results)

### With Aggregation (`min`/`max`/`avg`/`sum`/`groupBy`/`count`)

1. Collect all entries from all files
2. If `sortBy` is specified, sort entries:
   - If `sortBy === "random()"`: shuffle randomly
   - If `sortBy` is an array: sort by multiple fields in order
   - Otherwise: sort by field value using `compareSafe()`
3. Group entries by `groupBy` fields (if specified)
4. Per group, compute `min`, `max`, `avg`, `sum`, `count` (if specified)
5. Apply `distinct` (if specified)
6. Apply `offset` and `limit` to aggregated results

### With `sortBy` (no aggregation)

1. Collect all entries from all files
2. Sort entries:
   - If `sortBy === "random()"`: shuffle randomly
   - If `sortBy` is an array: sort by multiple fields in order
   - Otherwise: sort by field value using `compareSafe()`
3. Apply `distinct` (if specified)
4. Apply `offset` and `limit` to sorted results

---

## **Examples**

### Basic Pagination

```javascript
// Get page 2 with 10 items per page
{
    dbFindOpts: {
        offset: 10,
        limit: 10
    }
}
```

### Sort by Field Descending

```javascript
// Get users sorted by age (oldest first)
{
    dbFindOpts: {
        sortBy: "age",
        sortAsc: false,
        limit: 50
    }
}
```

### Random Sample
```javascript
// Get 10 random entries
{
    dbFindOpts: {
        sortBy: "random()",
        limit: 10
    }
}
```

### Reverse Order

```javascript
// Get results in reverse file order
{
    dbFindOpts: {
        reverse: true,
        offset: 0,
        limit: 100
    }
}
```

### Combined Options

```javascript
// Complex query with sorting and pagination
{
    dbFindOpts: {
        sortBy: "createdAt",
        sortAsc: false,  // Newest first
        offset: 0,
        limit: 20
    }
}
```

### Aggregate per Group

```javascript
// Get count, min, max, avg price per category
{
    dbFindOpts: {
        groupBy: "category",
        count: { itemCount: "id" },
        min: { minPrice: "price" },
        max: { maxPrice: "price" },
        avg: { avgPrice: "price" }
    }
}
```

### Global Aggregation (no grouping)

```javascript
// Stats across all entries
{
    dbFindOpts: {
        count: { total: "id" },
        min: { youngest: "age" },
        max: { oldest: "age" },
        avg: { averageAge: "age" },
        sum: { totalAge: "age" }
    }
}
```

### Multi-Field Sort

```javascript
// Sort by last name ascending, then by age descending
{
    dbFindOpts: {
        sortBy: [
            { field: "lastName", asc: true },
            { field: "age", asc: false }
        ]
    }
}
```

### Distinct Values

```javascript
// Get unique categories with count
{
    dbFindOpts: {
        distinct: "category",
        count: { total: "id" }
    }
}
```
