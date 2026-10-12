# Ecosystem Versioning & Compatibility Policy

This document explains how versioning works across our multi-repo structure, specifically focusing on the relationship between the core library, the meta-package, adapters, and plugins.

## 1. Package Structure

Our ecosystem consists of these package families:

| Family | Naming | Description |
| ---- | ---- | ---- |
| **Core** | `@wxn0brp/db-core` | Foundational logic and interfaces. |
| **Meta-package** | `@wxn0brp/db` | Entry point that re-exports core functionality. |
| **CRUD adapter** | `@wxn0brp/db-storage-<name>` | Full `ActionsBase` storage backend. |
| **Specialized adapter** | `@wxn0brp/db-spec-<name>` | Non-document data model, partial CRUD surface. |
| **Plugin** | `@wxn0brp/db-plugin-<name>` | Implements `ValtheraPlugin`. |
| **Tool / integration** | `@wxn0brp/db-<name>` | CLI, resolver, server, clients, and similar. |

Adapters and plugins depend on `db-core` and follow the versioning scheme in section 3.

Third-party packages keep the same name structure under their own npm scope (e.g. `@example/db-storage-postgres`); see [Publishing](dev/publishing.md).

## 2. Core & Meta Package Versioning

The relationship between the meta-package and the core is **synchronized**.

| Package | Version | Meaning |
| ---- | ---- | ---- |
| `@wxn0brp/db-core` | `0.11.0` | Core logic version |
| `@wxn0brp/db` | `0.110.0` | **Matches Core version** |

*   **Rule:** `@wxn0brp/db` always mirrors the `Minor` and `Patch` version of `@wxn0brp/db-core`.
*   **Exception:** If the meta-package itself requires a fix independent of core, the `Patch` version may increment slightly higher, but the `Minor` version will always match the Core.

## 3. Adapter & Plugin Versioning Scheme (`0.CA.B`)

Adapters and plugins have independent lifecycles but strict compatibility requirements with `db-core`. To make compatibility visible directly in the version number, we use a custom encoding scheme.

### The Formula

```text
0.CA.B
│ || |-- B: Package Patch (Bugfixes or Core Patch requirement)
│ ||---- A: Package Series (Breaking Changes)
│ |----- C: Core Minor Version
|------- Major (Always 0)
```

### Examples

| Package Version | Decoded Meaning |
| ---- | ---- |
| `0.110.5` | Works with **Core 0.11.x**, Package Series **0**, Patch **5** |
| `0.111.0` | Works with **Core 0.11.x**, Package Series **1** (Breaking Change), Patch **0** |
| `0.120.0` | Works with **Core 0.12.x**, Package Series **0**, Patch **0** |
| `0.110.6` | Works with **Core 0.11.x**, Updated to require **Core 0.11.2** (Patch requirement) |

### Version Change Triggers

| Event | Version Change | Example |
| ---- | ---- | ---- |
| **Bugfix** | `B + 1` | `0.110.5` -> `0.110.6` |
| **Breaking Change** | `A + 1`, `B = 0` | `0.110.5` -> `0.111.0` |
| **Core Minor Update** (e.g., 0.11 -> 0.12) | `C + 1`, `A = 0`, `B = 0` | `0.111.5` -> `0.120.0` |
| **Core Patch Requirement** (e.g., security fix) | `B + 1` | `0.110.5` -> `0.110.6` |
