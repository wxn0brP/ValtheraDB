# Publishing Packages

This guide explains how packages are named, discovered, and published across the ValtheraDB ecosystem - both for the core team and for anyone publishing adapters, specialized adapters, or plugins.

## Scope and Origin

Adapter and plugin packages follow the same name structure:

```text
db-<kind>-<name>
```

`<kind>` is one of `storage` (CRUD adapter), `spec` (specialized adapter), or `plugin`. The core, the meta-package, and standalone tools use their own names, such as `@wxn0brp/db-core`, `@wxn0brp/db`, or `@wxn0brp/db-resolver`; see [Package Structure](../versioning.md#1-package-structure) for the full family list.

The npm scope tells you who maintains the package:

- **First-party** packages use the `@wxn0brp` scope, e.g. `@wxn0brp/db-storage-dir`.
- **Third-party** packages use the author's own scope with the same name, e.g. `@example/db-storage-postgres`.

The scope is the only difference; the name structure and versioning rules are identical.

## Discovery

Publish with the matching npm keyword so packages are easy to find:

| Kind | Keyword | Example |
| ---- | ---- | ---- |
| CRUD adapter | `vdb-adapter` | `@example/db-storage-postgres` |
| Specialized adapter | `vdb-spec` | `@example/db-spec-log` |
| Plugin | `vdb-plugin` | `@example/db-plugin-audit` |

> Before publishing, run the compliance suite and declare any partial coverage in `valthera-e2e/config.json` (`skip.domains`, `skip.tests`); see [Adapters](./adapter.md).

## Plugins

Plugins use the name `db-plugin-<name>` and the `vdb-plugin` keyword. Register them with `db.plugin()`; see [Writing Plugins](./plugin.md).

## Specialized Adapters

Specialized adapters use the name `db-spec-<name>` and the `vdb-spec` keyword; see [Variant D: Specialized Adapter](./adapter.md#variant-d-specialized-adapter).

## Resolver Contract

Every adapter exports a `DYNAMIC` record so `@wxn0brp/db-resolver` can load it by package name:

```typescript
export const DYNAMIC = {
	def: (url: string) => createAdapter(url),
};
```

`def` is the default factory, used whenever the resolver gets no explicit variant. Variants are resolved as exports of the same module: `VDB().sqlite.bun("db.sqlite")` calls the `bun` export.

```typescript
export const DYNAMIC = {
	def: (file: string) => createAdapter(file),
	bun: (file: string) => createBunAdapter(file),
	node: (file: string) => createNodeAdapter(file),
};
```
