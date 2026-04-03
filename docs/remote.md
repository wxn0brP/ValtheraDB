# Remote Valthera and Graph Valthera Client Documentation

## `remote` Object Structure
- `name` (`string`): The name of the Valthera.
- `url` (`string`): The URL of the remote Valthera.
- `auth` (`string`): The authentication token for accessing the Valthera.

## Class: `ValtheraRemote(remote)`
`ValtheraRemote` is an extended version of the `Valthera` class, designed to handle API requests. It provides the same functionalities as `Valthera`, but enables remote communication, allowing you to interact with Valthera through HTTP requests.

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
