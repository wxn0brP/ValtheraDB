# Remote Valthera Client Documentation

## `remote` Object Structure

- `name` (`string`): The name of the Valthera.
- `url` (`string`): The URL of the remote Valthera.
- `auth` (`string`): The authentication token for accessing the Valthera.
- `query` (`Record<string, string>`, optional): Extra query parameters appended to every request.
- `headers` (`Record<string, string>`, optional): Extra headers sent with every request.
- `body` (`Record<string, any>`, optional): Extra body fields merged into every request.

## Class: `ValtheraRemote(remote)`

`ValtheraRemote` extends `BaseRemote` and implements `ValtheraCompatible`. Every call sends a `POST` request to `<url>/db/<op>` with the body `{ db, auth, query, keys }`. When the server responds with `{ err: true, msg }`, the client throws an `Error` carrying that message.

Function values in queries are serialized into the `keys` field, so the server can execute them.

**Note:** `createIndex()` is a no-op on the remote client. Index creation is not forwarded to the server.

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
