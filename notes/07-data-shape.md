# Data shape

```ts
interface Node {
  id: string
  category: 'miner' | 'gpu' | 'hashlink' | 'depin'
  hardware: string
  uptime: number
  hashrate: string
  yieldApy: number
  status: 'active' | 'idle' | 'offline'
}
```

Straightforward. No nested structures needed for v0.x.
