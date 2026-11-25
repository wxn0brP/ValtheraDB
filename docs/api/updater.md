# Predefined Update Options Quick Reference

## Arrays

### `$push`

Adds an element to the end of an array. If the field is not an array yet, a new array with the element is created.

```javascript
{
    $push: { tags: "designer" }
}
```

**Input:**

```javascript
{
    tags: ["developer"]
}
```

**Output:**

```javascript
{
    tags: ["developer", "designer"]
}
```

### `$pushSet`

Adds an element to the end of an array and removes duplicates.

```javascript
{
    $pushSet: { tags: "designer" }
}
```

**Input:**

```javascript
{
    tags: ["developer", "designer", "developer"]
}
```

**Output:**

```javascript
{
    tags: ["developer", "designer"]
}
```

### `$pull`

Removes a specific element from an array.

```javascript
{
    $pull: { tags: "developer" }
}
```

**Input:**

```javascript
{
    tags: ["developer", "designer"]
}
```

**Output:**

```javascript
{
    tags: ["designer"]
}
```

### `$pullAll`

Removes all occurrences of specified elements from an array.

```javascript
{
    $pullAll: { tags: ["developer", "designer"] }
}
```

**Input:**

```javascript
{
    tags: ["developer", "designer", "manager"]
}
```

**Output:**

```javascript
{
    tags: ["manager"]
}
```

### `$pushAll`

Adds multiple elements to the end of an array.

```javascript
{
    $pushAll: { tags: ["developer", "designer"] }
}
```

**Input:**

```javascript
{
    tags: ["manager"]
}
```

**Output:**

```javascript
{
    tags: ["manager", "developer", "designer"]
}
```

## Numbers

### `$inc`

Increments a numeric value by a given amount.

```javascript
{
    $inc: { counter: 1 }
}
```

**Input:**

```javascript
{
    counter: 5
}
```

**Output:**

```javascript
{
    counter: 6
}
```

### `$dec`

Decrements a numeric value by a given amount.

```javascript
{
    $dec: { counter: 1 }
}
```

**Input:**

```javascript
{
    counter: 5
}
```

**Output:**

```javascript
{
    counter: 4
}
```

## Objects

### `$merge`

Merges a nested object, adding or updating properties. For arrays, concatenates them.

```javascript
{
    $merge: { 
        settings: {
            theme: "dark",
            roles: ["admin"]
        }
    }
}
```

**Input:**

```javascript
{
    settings: {
        theme: "light",
        language: "en",
        roles: ["user"]
    }
}
```

**Output:**

```javascript
{
    settings: {
        theme: "dark",
        language: "en",
        roles: ["user", "admin"]
    }
}
```

### `$deepMerge`

Deeply merges nested objects, adding or updating properties recursively.

```javascript
{
    $deepMerge: {
        user: {
            address: {
                city: "New York"
            }
        }
    }
}
```

**Input:**

```javascript
{
    user: {
        name: "John",
        address: {
            street: "123 Main St",
            city: "San Francisco"
        }
    }
}
```

**Output:**

```javascript
{
    user: {
        name: "John",
        address: {
            street: "123 Main St",
            city: "New York"
        }
    }
}
```

## Others

### `$set`

Sets a field to a specific value. Functionally identical to using a plain field assignment in the updater object.

```javascript
{
    $set: { name: "John" }
}
```

**Input:**

```javascript
{
    name: "Jane",
    age: 30
}
```

**Output:**

```javascript
{
    name: "John",
    age: 30
}
```

**Note:** `{ $set: { name: "John" } }` is equivalent to `{ name: "John" }`.

### `$unset`

Removes a specified key from an object.

```javascript
{
    $unset: { age: true }
}
```

**Input:**

```javascript
{
    name: "John",
    age: 30
}
```

**Output:**

```javascript
{
    name: "John"
}
```

### `$rename`

Renames a key in an object.

```javascript
{
    $rename: { firstName: "name" }
}
```

**Input:**

```javascript
{
    firstName: "John",
    lastName: "Doe"
}
```

**Output:**

```javascript
{
    name: "John",
    lastName: "Doe"
}
```
