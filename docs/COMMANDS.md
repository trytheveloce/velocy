# Commands

Full reference for the `velocy` CLI.

## `status`

Print a snapshot of the Veloce network: total/active nodes, hashrate, 24h uptime, rewards distributed, and TVL.

```bash
velocy status
```

## `nodes ls`

List nodes registered on the network. Supports filtering.

```bash
velocy nodes ls
velocy nodes ls --uptime 95
velocy nodes ls --category gpu
```

| Flag                  | Description                              |
| --------------------- | ---------------------------------------- |
| `-u, --uptime <n>`    | Minimum uptime percentage                |
| `-c, --category <c>`  | One of `miner`, `gpu`, `hashlink`, `depin` |

## `nodes info <id>`

Print detailed metrics for a single node, including hardware type, uptime, hashrate, and current APY.

```bash
velocy nodes info veloce-node-0x4f2a
```

## `yield`

Show current yield by category over a chosen window.

```bash
velocy yield
velocy yield --window 7d
velocy yield --window 30d
```

## `balance <address>`

Show the share count, accrued rewards, and currently claimable amount for an address.

```bash
velocy balance 0x1234...abcd
```

## `claim`

Triggers the claim flow. Requires a configured wallet (env `VELOCE_WALLET` or `~/.velocy/config.json`). Browser signing is currently the only supported path; the CLI prints instructions.

## `connect`

Operator-only command to pair a local GPU with the network. Currently prints onboarding instructions; full pairing is in private beta.

```bash
velocy connect --device /dev/nvidia0
```
<!-- p49 -->
