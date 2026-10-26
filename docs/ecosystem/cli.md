# CLI

The `vdb` command-line tool for managing ValtheraDB databases.
Install globally using Bun (the package is distributed from GitHub):

```bash
bun add -g github:wxn0brP/ValtheraDB-cli
```

## Examples

```bash
vdb -d ./my-db find users '{ "name": "Jane" }'
vdb -d ./my-db count users '{ "active": true }'
vdb -d ./my-db add users '{ "name": "Jane" }'
vdb -d ./my-db bulkAdd users '[{ "name": "A" }, { "name": "B" }]'
vdb -d ./my-db getCollections
vdb -d ./my-db capabilities
vdb server 3000
vdb format ./my-db "json5:x"
```

## Notes

- `-d, --dir <path>` selects the database directory (default: current directory).
- `-j, --json` prints results as JSON; errors are printed as structured `ValtheraError` payloads.
- `-p, --config-path <path>` loads adapter config from a YAML file (default: `./valthera.cli.yml`).
- `vdb server` starts a **development server** without authentication; do not use it in production.

-> [GitHub](https://github.com/wxn0brP/ValtheraDB-cli)
