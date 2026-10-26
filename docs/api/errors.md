# Errors

ValtheraDB uses a unified, structured error model. Errors raised by the core and by adapters during database operations are instances of `ValtheraError`, carrying a machine-readable `code` and optionally a `suggestion` and a `context` object. Errors thrown by your own code, such as a `db.transaction()` callback or a plugin, are not wrapped and may be plain `Error` instances.

```typescript
import { isValtheraError } from "@wxn0brp/db-core/errors";

try {
  await db.users.add({ name: "Alice" });
} catch (err) {
  if (isValtheraError(err)) {
    console.log(err.name);        // "ValtheraError" or a subclass name
    console.log(err.code);        // e.g. "QUERY_INVALID"
    console.log(err.message);
    console.log(err.suggestion);  // optional hint
    console.log(err.context);     // e.g. { op: "add", collection: "users", adapter: "1.2.3" }
  }
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| `UNSUPPORTED_OPERATION` | The operation is not supported by the adapter or backend |
| `ADAPTER_ERROR` | Generic adapter/driver failure |
| `ADAPTER_INIT` | Adapter initialization failed (`init()` or the adapter factory) |
| `ADAPTER_CLOSE` | Adapter `close()` failed |
| `QUERY_INVALID` | Invalid query shape (e.g., missing `collection`, non-object search) |
| `TRANSACTION_FAILED` | Transaction failed |
| `TRANSACTION_ROLLBACK_FAILED` | Transaction failed **and** rollback failed |
| `REMOTE_ERROR` | Reserved; not emitted by the current core or remote client |
| `REMOTE_UNKNOWN` | Remote error response without a `code` field |

The values are exported as `ErrorCodes` from `@wxn0brp/db-core/errors`, with `ErrorCode` as the union type of all codes.

## Error Classes

All classes extend `ValtheraError`, so a single `isValtheraError(err)` check covers them all.

| Class | Code | Thrown when |
|-------|------|-------------|
| `ValtheraError` | (provided) | Base class; also used to rebuild remote errors |
| `UnsupportedOperationError` | `UNSUPPORTED_OPERATION` | Operation not supported by the adapter (e.g., `beginTransaction` on a non-transactional adapter) |
| `QueryValidationError` | `QUERY_INVALID` | Query shape is invalid (missing `collection`, non-object search/updater, unsafe ID key, path traversal) |
| `AdapterError` | `ADAPTER_ERROR` | Wrapper for adapter/driver errors raised during operations |
| `AdapterInitError` | `ADAPTER_INIT` | Adapter `init()` or the adapter factory failed |
| `AdapterCloseError` | `ADAPTER_CLOSE` | Adapter `close()` failed |
| `TransactionError` | `TRANSACTION_FAILED` / `TRANSACTION_ROLLBACK_FAILED` | Transaction failed, handle mismatch, or failed rollback |
| `RemoteError` | `REMOTE_ERROR` | Reserved; not thrown by the current implementation |

## Error Structure

```typescript
interface ValtheraErrorOpts {
  code: string;
  cause?: unknown;
  suggestion?: string;
  context?: Record<string, unknown>;
}

class ValtheraError extends Error {
  code: string;
  suggestion?: string;
  context?: Record<string, unknown>;

  toJSON(): {
    name: string;
    code: string;
    message: string;
    suggestion?: string;
    context?: Record<string, unknown>;
  };
}
```

## Wrapping Behavior

- Adapter failures during operations are wrapped into `AdapterError`, with `op`, `collection` (when the query has one) and `adapter` (the adapter version) added to `context`. If the adapter already throws a `ValtheraError`, its class and code are kept and a copy with merged context is returned. On key collisions the error's existing `context` wins over the added keys, and the object identity changes.
- `init()` and `close()` failures are wrapped into `AdapterInitError` and `AdapterCloseError` instead, unless the adapter throws a `ValtheraError`.
- When a non-`ValtheraError` is wrapped, the original error is available as `cause`. When an existing `ValtheraError` is copied, its prototype and `cause` are preserved.
- Remote clients always rebuild a base `ValtheraError` from the server response (`code`, `message`, `suggestion`, `context`). The original subclass is not restored, and a response without `code` becomes `REMOTE_UNKNOWN`.

## Working with Transactions

```typescript
try {
  await db.transaction(["accounts"], async tx => {
    // ...
    throw new Error("Payment failed");
  });
} catch (err) {
  // Rollback succeeded: the callback error is rethrown unchanged.
  // TransactionError with TRANSACTION_ROLLBACK_FAILED: the rollback also failed.
}
```

A failure in `beginTransaction` or `commitTransaction` is wrapped like any other adapter operation, so it usually surfaces as `AdapterError`; some adapters, such as the directory adapter, throw `TransactionError` themselves. If the callback (or commit) fails and the rollback also fails, a `TransactionError` with code `TRANSACTION_ROLLBACK_FAILED` is thrown and the two errors are attached as an `AggregateError` in `cause`.
