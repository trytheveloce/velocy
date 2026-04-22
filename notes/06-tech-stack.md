# Tech stack decision

- Node + TypeScript (CLI ecosystem, easy to publish on npm)
- commander for arg parsing (battle-tested, simple)
- chalk + ora + cli-table3 for output (standard combo)
- vitest for tests (fast, ESM-first)

Rejected: yargs (too much config), oclif (overkill for thin client).
