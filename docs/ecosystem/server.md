# Server

HTTP server for ValtheraDB on port 14785. Built on FalconFrame with JWT auth, GateWarden permissions (RBAC/ACL/ABAC), Web GUI, and SQL/CSV import/export.

## Quick Start

```bash
docker run -p 14785:14785 ghcr.io/wxn0brp/valthera-server
```

## PHP Server (MariaDB/MySQL)

Alternative PHP implementation for SQL databases.

```bash
git clone https://github.com/wxn0brP/ValtheraDB-server-php.git
```

Configure via `config.php`, API compatible with main server.

-> [Full Server Docs](https://github.com/wxn0brP/ValtheraDB-server/tree/master/docs) | [PHP Server](https://github.com/wxn0brP/ValtheraDB-server-php)
