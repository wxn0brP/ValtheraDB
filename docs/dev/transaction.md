# Transactions in ValtheraDB

> **Experimental Feature:** Transactions are highly experimental and may change or be removed at any time.

Transactions allow you to execute multiple database operations atomically. If any operation fails, all changes are rolled back, ensuring data consistency.

## Basic Usage

```typescript
import { ValtheraCreate } from "@wxn0brp/db";

const db = ValtheraCreate("mydb");

await db.transaction(["users", "accounts"], async (tx) => {
  // All operations use the tx object, not db
  const user = await tx.c("users").add({
    name: "Alice",
    email: "alice@example.com"
  });

  await tx.c("accounts").add({
    userId: user._id,
    balance: 1000,
    createdAt: new Date()
  });

  // If we reach here, both operations succeed
  // If any operation throws, both are rolled back
});
```

## How Transactions Work

### 1. Collection Declaration

You must declare all collections involved in the transaction upfront:

```typescript
await db.transaction(
  ["users", "orders", "inventory"], // Collections used in the transaction
  async (tx) => {
    // Transaction logic
  }
);
```

**Why?** ValtheraDB locks these collections for the duration of the transaction to prevent concurrent modifications.

### 2. Transaction Object

The `tx` object provides the same CRUD methods as `ValtheraClass`.

**Important:** Operations on the original `db` reference are NOT part of the transaction. Always use `tx`.

### 3. Automatic Rollback

If the transaction function throws an error, all changes are automatically rolled back:

```typescript
await db.transaction(["accounts"], async (tx) => {
  await tx.c("accounts").update({
    search: { userId: "user123" },
    updater: { $inc: { balance: -100 } }
  });

  // Simulate an error
  throw new Error("Payment failed");

  // The update above is rolled back
});
```

### 4. Manual Commit/Rollback

You can manually commit or rollback within the transaction:

```typescript
await db.transaction(["orders"], async (tx) => {
  try {
    await tx.c("orders").add({ item: "Widget", quantity: 5 });

    // Check some condition
    const inventory = await tx.c("inventory").findOne({
      search: { item: "Widget" }
    });

    if (inventory.quantity < 5) {
      await tx.rollback(); // Explicit rollback
      throw new Error("Insufficient inventory");
    }

    await tx.commit(); // Explicit commit
  } catch (err) {
    // Error handling
    throw err;
  }
});
```

## Adapter Support

**Not all adapters support transactions.** Transaction support depends on the underlying storage backend.

### Checking Adapter Support

Adapters implement transaction methods:

- `beginTransaction(id)` - Start a transaction
- `commitTransaction(handle)` - Commit changes
- `rollbackTransaction(handle)` - Roll back changes

If an adapter does not support transactions, calling `db.transaction()` will throw an error.

## Examples

### Transfer Between Accounts

```typescript
async function transfer(fromUserId: string, toUserId: string, amount: number) {
  await db.transaction(["accounts"], async (tx) => {
    const accounts = tx.c("accounts");

    // Deduct from sender
    await accounts.update({
      search: { userId: fromUserId },
      updater: { $inc: { balance: -amount } }
    });

    // Add to recipient
    await accounts.update({
      search: { userId: toUserId },
      updater: { $inc: { balance: amount } }
    });
  });
}
```

### Create Related Records

```typescript
async function createUserWithProfile(userData: any, profileData: any) {
  return await db.transaction(["users", "profiles"], async (tx) => {
    // Create user
    const user = await tx.c("users").add(userData);

    // Create profile linked to user
    const profile = await tx.c("profiles").add({
      ...profileData,
      userId: user._id,
      createdAt: new Date()
    });

    return { user, profile };
  });
}
```

### Conditional Updates

```typescript
async function placeOrder(userId: string, items: any[]) {
  await db.transaction(["orders", "inventory", "users"], async (tx) => {
    // Check inventory for all items
    for (const item of items) {
      const inventory = await tx.c("inventory").findOne({
        search: { productId: item.productId }
      });

      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(`Insufficient inventory for ${item.productId}`);
      }
    }

    // Deduct inventory
    for (const item of items) {
      await tx.c("inventory").update({
        search: { productId: item.productId },
        updater: { $inc: { quantity: -item.quantity } }
      });
    }

    // Create order
    await tx.c("orders").add({
      userId,
      items,
      status: "confirmed",
      createdAt: new Date()
    });

    // Update user's order count
    await tx.c("users").update({
      search: { _id: userId },
      updater: { $inc: { orderCount: 1 } }
    });
  });
}
```

## Limitations

1. **Adapter-dependent:** Not all adapters support transactions
2. **Experimental:** API may change in future versions
3. **No nested transactions:** Transactions cannot be nested
4. **Collection locking:** Declared collections are locked for the transaction duration
5. **No distributed transactions:** Transactions are local to a single database instance
