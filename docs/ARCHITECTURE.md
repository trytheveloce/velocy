# Architecture

## Overview

`velocy` is a thin client. All network state lives behind the Veloce API; the CLI translates that state into human-readable output.

```
┌──────────────┐    HTTPS    ┌─────────────────────┐
│  velocy CLI  │ ──────────► │  api.useveloce.xyz  │
└──────────────┘             └─────────────────────┘
                                      │
                                      ▼
                              ┌────────────────┐
                              │  Veloce chain  │
                              │  (Base L2)     │
                              └────────────────┘
```

## Modules

- **`src/index.ts`** — commander entrypoint. Registers subcommands and dispatches.
- **`src/api/client.ts`** — typed wrapper around the REST API. One method per endpoint, no caching.
- **`src/commands/*`** — one file per top-level command. Each module exports a `register*` function that attaches itself to the program.
- **`src/config.ts`** — three-tier config resolution: env → `~/.velocy/config.json` → defaults.
- **`src/utils/format.ts`** — pure formatters. Tested in isolation.

## Design rules

1. **Stateless commands.** The CLI does not cache or persist anything beyond config. Every invocation is a fresh request.
2. **No wallet signing in v0.x.** Anything that mutates state (claim, register node) defers to the web app.
3. **Errors propagate.** Each command catches and exits with code 1 on failure; the top-level `parseAsync` catches the rest.
4. **Output is for humans first.** Tables and colors by default. A `--json` flag may be added once consumers ask for it.
