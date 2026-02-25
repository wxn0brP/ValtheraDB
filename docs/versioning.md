# Ecosystem Versioning & Compatibility Policy

This document explains how versioning works across our multi-repo structure, specifically focusing on the relationship between the core library, the meta-package, and storage adapters.

## 1. Package Structure

Our ecosystem consists of three types of packages:

1.  **`@wxn0brp/db-core`** – The foundational logic and interfaces.
2.  **`@wxn0brp/db`** – The meta-package (entry point) that re-exports core functionality.
3.  **Adapters** (e.g., `@wxn0brp/db-storage-dir`) – Implementation-specific packages that depend on `db-core`.

## 2. Core & Meta Package Versioning

The relationship between the meta-package and the core is **synchronized**.

| Package | Version | Meaning |
| :--- | :--- | :--- |
| `@wxn0brp/db-core` | `0.9.0` | Core logic version |
| `@wxn0brp/db` | `0.90.0` | **Matches Core version** |

*   **Rule:** `@wxn0brp/db` always mirrors the `Minor` and `Patch` version of `@wxn0brp/db-core`.
*   **Exception:** If the meta-package itself requires a fix independent of core, the `Patch` version may increment slightly higher, but the `Minor` version will always match the Core.

## 3. Adapter Versioning Scheme (`0.CA.B`)

Adapters have independent lifecycles but strict compatibility requirements with `db-core`. To make compatibility visible directly in the version number, we use a custom encoding scheme.

### The Formula

```text
0.CA.B
│ || |-- B: Adapter Patch (Bugfixes or Core Patch requirement)
│ ||---- A: Adapter Series (Adapter Breaking Changes)
│ |----- C: Core Minor Version
|------- Major (Always 0)
```

### Examples

| Adapter Version | Decoded Meaning |
| :--- | :--- |
| `0.90.5` | Works with **Core 0.9.x**, Adapter Series **0**, Patch **5** |
| `0.91.0` | Works with **Core 0.9.x**, Adapter Series **1** (Breaking Change), Patch **0** |
| `0.100.0` | Works with **Core 0.10.x**, Adapter Series **0**, Patch **0** |
| `0.90.6` | Works with **Core 0.9.x**, Updated to require **Core 0.9.2** (Patch requirement) |

### Version Change Triggers

| Event | Adapter Version Change | Example |
| :--- | :--- | :--- |
| **Adapter Bugfix** | `B + 1` | `0.90.5` -> `0.90.6` |
| **Adapter Breaking Change** | `A + 1`, `B = 0` | `0.90.5` -> `0.91.0` |
| **Core Minor Update** (e.g., 0.9 -> 0.10) | `C + 1`, `A = 0`, `B = 0` | `0.91.5` -> `0.100.0` |
| **Core Patch Requirement** (e.g., security fix) | `B + 1` | `0.90.5` -> `0.90.6` |
