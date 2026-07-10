# Conduit

Embeds ValtheraDB as a compiled Bun binary, communicates over stdin/stdout with a framed binary protocol (12-byte header + JSON payload).

Lets you drive ValtheraDB from any language - Go, Python, Rust, etc.

## Python Bridge

```bash
pip install wxn0brp-db-conduit
```

```python
from wxn0brp.db import conduit

with conduit.ValtheraConduit("./vendor/vdb", auto_download=True) as c:
    db = c.data.init("./data")
    users = db.c("users")
    users.add({"name": "Ada"})
    print(users.find({"name": "Ada"}))
```

## Protocol Summary

- 12-byte LE header: frameType (u32) + dbNameLength (u32) + payloadLength (u32)
- Frame types: INIT_DB, EXECUTE_JSON, CLOSE_DB, LIST_DBS, PING, SHUTDOWN
- Max payload: 64MB, Max DB name: 4096 bytes

-> [Full Protocol Docs](https://github.com/wxn0brP/ValtheraDB-conduit#protocol) | [Python Bridge](https://github.com/wxn0brP/ValtheraDB-conduit/tree/master/python)
