# Server

Full-featured HTTP server for ValtheraDB on port 14785. Built on FalconFrame with enterprise-grade security and management features. The reference implementation for production deployments.

- JWT authentication with role-based access control
- GateWarden permissions (RBAC, ACL, ABAC)
- Web GUI for visual database management
- SQL and CSV import/export for data migration
- Configurable audit logging for security and compliance
- Rate limiting and HTTPS support

All servers are available on Docker Hub (`wxn0brp/*`) and GitHub Container Registry (`ghcr.io/wxn0brp/*`).

## Quick Start

```bash
docker run -p 14785:14785 wxn0brp/valtheradb-server
```

## Git-backed Server

Stateless Docker container with all state stored in Git. The database files live in a Git repository - every flush creates a commit and pushes to the configured branch. No local volumes, no persistent storage - restart or replace the container freely.

- Stateless: no volumes, no local state, container is disposable
- Git as storage: every flush = commit + push, versioned and distributed
- Fully compatible with ValtheraDB server API

### Quick Start

```bash
docker run -p 14785:14785 \
  -e WOLF_TOKEN=your-token \
  -e GIT_URL=your-repo-url \
  wxn0brp/valtheradb-server-git
```

`WOLF_TOKEN` (auth token) and `GIT_URL` (repository URL) are required.

-> [GitHub](https://github.com/wxn0brP/ValtheraDB-server-git)

## Squirrel (AP Routing Layer)

AP routing layer that sits between the client and multiple ValtheraDB storage nodes, providing hash-based distribution across unreliable servers. No consistency or durability guarantees - optimized for availability.

- API compatibility depends on mode: full in redirect-only (AP), partial in replication/catchup (AP+)
- Function-based queries are not fully supported in AP+ modes
- Collection management (create/drop) is limited - inconsistent state possible when servers are unavailable
- Routes requests via `307` redirect based on `_id` hash
- Epoch-based snapshots track server list changes
- Catchup mechanism queues writes when primary is down, replays on recovery

### Quick Start

```bash
docker run -p 3000:3000 \
  -e SQUIRREL_DB=mydb \
  -e SQUIRREL_AUTH=your-token \
  -e SQUIRREL_SEEDS="http://s1@localhost:14785 http://s2@localhost:14786" \
  wxn0brp/valtheradb-squirrel
```

`SQUIRREL_DB`, `SQUIRREL_AUTH`, and `SQUIRREL_SEEDS` are required.

-> [GitHub](https://github.com/wxn0brP/ValtheraDB-squirrel)

## PHP Server (MariaDB/MySQL)

Alternative PHP implementation for SQL databases.

- MariaDB/MySQL backend
- Function-based queries are not supported (PHP cannot execute JavaScript)

```bash
git clone https://github.com/wxn0brP/ValtheraDB-server-php.git
```

Configure via `config.php`, API compatible with main server (except function-based search).

-> [Full Server Docs](https://github.com/wxn0brP/ValtheraDB-server/tree/master/docs) |
[PHP Server](https://github.com/wxn0brP/ValtheraDB-server-php)
