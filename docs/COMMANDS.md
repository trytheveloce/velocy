# Commands

Full reference for the `tensor` CLI.

## `status`

Print a snapshot of the Tensor network: total/active nodes, hashrate, 24h uptime, rewards distributed, and TVL.

```bash
tensor status
```

## `nodes ls`

List nodes registered on the network. Supports filtering.

```bash
tensor nodes ls
tensor nodes ls --uptime 95
tensor nodes ls --category gpu
```

| Flag                  | Description                              |
| --------------------- | ---------------------------------------- |
| `-u, --uptime <n>`    | Minimum uptime percentage                |
| `-c, --category <c>`  | One of `miner`, `gpu`, `hashlink`, `depin` |

## `nodes info <id>`

Print detailed metrics for a single node, including hardware type, uptime, hashrate, and current APY.

```bash
tensor nodes info tensor-node-0x4f2a
```

## `yield`

Show current yield by category over a chosen window.

```bash
tensor yield
tensor yield --window 7d
tensor yield --window 30d
```

## `balance <address>`

Show the share count, accrued rewards, and currently claimable amount for an address.

```bash
tensor balance 0x1234...abcd
```

## `claim`

Triggers the claim flow. Requires a configured wallet (env `TENSOR_WALLET` or `~/.tensor/config.json`). Browser signing is currently the only supported path; the CLI prints instructions.

## `connect`

Operator-only command to pair a local GPU with the network. Currently prints onboarding instructions; full pairing is in private beta.

```bash
tensor connect --device /dev/nvidia0
```
