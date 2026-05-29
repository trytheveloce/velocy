<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0a,50:0a0a0a,100:C1FF72&height=240&section=header&text=tensor&fontSize=88&fontColor=ffffff&fontAlignY=38&desc=Command-line%20interface%20for%20the%20Tensor%20compute%20marketplace&descAlignY=62&descSize=16&animation=fadeIn" width="100%" alt="tensor"/>

<a href="https://github.com/trytheveloce/tensor">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=1000&color=C1FF72&center=true&vCenter=true&width=720&lines=tokenized+GPU+compute;onchain+yield+from+real+infrastructure;every+node+benchmarked%2C+every+reward+verifiable;built+for+the+AI+economy" alt="typing"/>
</a>

<br/><br/>

[![License](https://img.shields.io/badge/license-MIT-C1FF72?style=for-the-badge&labelColor=0a0a0a)](LICENSE)
[![CI](https://img.shields.io/badge/ci-passing-C1FF72?style=for-the-badge&labelColor=0a0a0a)](../../actions)
[![Release](https://img.shields.io/badge/release-v0.1.0-C1FF72?style=for-the-badge&labelColor=0a0a0a)](../../releases)

[![stars](https://img.shields.io/github/stars/trytheveloce/tensor?style=flat-square&color=C1FF72&labelColor=0a0a0a)](../../stargazers)
[![forks](https://img.shields.io/github/forks/trytheveloce/tensor?style=flat-square&color=C1FF72&labelColor=0a0a0a)](../../network)
[![issues](https://img.shields.io/github/issues/trytheveloce/tensor?style=flat-square&color=C1FF72&labelColor=0a0a0a)](../../issues)
[![last commit](https://img.shields.io/github/last-commit/trytheveloce/tensor?style=flat-square&color=C1FF72&labelColor=0a0a0a)](../../commits)

[Website](https://tensorcompute.xyz) · [Docs](./docs) · [Twitter](https://x.com/useveloce)

</div>

---

## What is tensor?

`tensor` is the official CLI for interacting with the Tensor network — a marketplace for tokenized GPU compute. Query network state, monitor node performance, track yield, and manage operator workflows from your terminal.

The Tensor protocol turns physical GPU infrastructure into onchain, yield-bearing assets. `tensor` is the thin client that exposes that state.

## Quick Start

```bash
npm install -g tensor

tensor status
tensor nodes ls --uptime 95
tensor yield --window 7d
```

Or one-off without installing:

```bash
npx tensor status
```

## Commands

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `status`           | Network overview — nodes, uptime, rewards  |
| `nodes ls`         | List active GPU nodes (filter by uptime/category) |
| `nodes info <id>`  | Detailed view of a single node             |
| `yield`            | Current yield rates across categories      |
| `balance <addr>`   | Holder balance and accrued rewards         |
| `claim`            | Claim accrued rewards (browser wallet)     |
| `connect`          | Pair a local GPU with the network          |

Full reference: [docs/COMMANDS.md](docs/COMMANDS.md)

## Examples

```bash
# Network snapshot
tensor status

# Top-performing GPU nodes
tensor nodes ls --category gpu --uptime 99

# Yield over the last 30 days
tensor yield --window 30d

# Check a holder's claimable rewards
tensor balance 0x4f2a8d3c1e9b6a7f5d8c2e1b9a3f7d6c5e4b2a1f
```

## Architecture

```
┌──────────────┐    HTTPS    ┌─────────────────────┐
│  tensor CLI  │ ──────────► │  api.tensorcompute.xyz  │
└──────────────┘             └─────────────────────┘
                                      │
                                      ▼
                              ┌────────────────┐
                              │  Tensor chain  │
                              │  (Base L2)     │
                              └────────────────┘
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for module-level detail.

## Configuration

Configuration is resolved in three tiers: env vars → `~/.tensor/config.json` → defaults.

```bash
export TENSOR_API_URL=https://api.tensorcompute.xyz
export TENSOR_NETWORK=base
export TENSOR_WALLET=0x...
```

## Development

```bash
git clone https://github.com/trytheveloce/tensor
cd tensor
npm install
npm run build
npm link

tensor status
```

Run tests:

```bash
npm test
```

## Tech Stack

- **Runtime** — Node.js 18+
- **Language** — TypeScript (strict)
- **CLI** — commander
- **Output** — chalk, ora, cli-table3
- **Tests** — vitest
- **CI** — GitHub Actions (Node 18, 20)

## Links

- Website — [tensorcompute.xyz](https://tensorcompute.xyz)
- Twitter — [@useveloce](https://x.com/useveloce)
- Issues — [github.com/trytheveloce/tensor/issues](https://github.com/trytheveloce/tensor/issues)

## License

MIT — see [LICENSE](LICENSE)

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:C1FF72,50:0a0a0a,100:0a0a0a&height=100&section=footer&animation=fadeIn" width="100%" alt="footer"/>
</div>
