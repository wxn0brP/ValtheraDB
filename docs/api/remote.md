# Remote Valthera Client Documentation

## `remote` Object Structure

- `name` (`string`): The name of the Valthera.
- `url` (`string`): The URL of the remote Valthera.
- `auth` (`string`): The authentication token for accessing the Valthera.
- `query` (`Record<string, string>`, optional): Extra query parameters appended to every request.
- `headers` (`Record<string, string>`, optional): Extra headers sent with every request.
- `fetch` (`Record<string, any>`, optional): Extra options merged into the underlying `fetch` call.
- `body` (`Record<string, any>`, optional): Extra body fields merged into every request.

## Class: `ValtheraRemote(remote)`

`ValtheraRemote` extends `BaseRemote` and implements `ValtheraCompatible`. Every call sends a `POST` request to `<url>/db/<op>` with the body `{ db, auth, query, keys, ...body }`. When the server responds with `{ err: true, msg }`, the client throws a `ValtheraError` carrying the server-provided `code`, `suggestion`, and `context`.

Function values in queries are serialized into the `keys` field (paths to stringified functions), so the server can execute them.

Supported operations: all CRUD and collection operations (`add`, `bulkAdd`, `find`, `findOne`, `update`, `updateOne`, `remove`, `removeOne`, `updateOneOrAdd`, `toggleOne`, `count`, collection management), plus `capabilities()`, which is forwarded to the server.

**Note:** `createIndex()` and `removeIndex()` are no-ops on the remote client. Index creation is not forwarded to the server.

### Example Usage

```javascript
const remoteDB = new ValtheraRemote({
    name: 'myRemoteDB',
    url: 'https://example.com/db',
    auth: 'your-auth-token'
});
```

or

```javascript
const remoteDB = new ValtheraRemote('https://dbName:token@example.com/db');
```

In the URL form, the username part becomes the database name and the password part becomes the auth token.

### Error Handling

Server-side errors are rebuilt as `ValtheraError` instances on the client:

```javascript
import { isValtheraError } from "@wxn0brp/db-core/errors";

try {
    await remoteDB.find({ collection: "users", search: {} });
} catch (err) {
    if (isValtheraError(err)) {
        console.log(err.code, err.message, err.suggestion, err.context);
    }
}
```

See [Errors](./errors.md) for the full error model.
