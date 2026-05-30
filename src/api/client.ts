import { loadConfig } from '../config';

export interface NetworkStats {
  totalNodes: number;
  activeNodes: number;
  totalHashrate: string;
  uptime24h: number;
  rewardsDistributed24h: string;
  totalValueLocked: string;
}

export interface Node {
  id: string;
  category: 'miner' | 'gpu' | 'hashlink' | 'depin';
  hardware: string;
  uptime: number;
  hashrate: string;
  yieldApy: number;
  status: 'active' | 'idle' | 'offline';
}

export interface YieldSnapshot {
  category: string;
  apy: number;
  rewards7d: string;
  participants: number;
}

export interface Balance {
  address: string;
  shares: number;
  accruedRewards: string;
  claimable: string;
}

export class VeloceClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || loadConfig().apiUrl;
  }

  async getStatus(): Promise<NetworkStats> {
    return this.request<NetworkStats>('/v1/network/status');
  }

  async listNodes(filter?: { minUptime?: number; category?: string }): Promise<Node[]> {
    const params = new URLSearchParams();
    if (filter?.minUptime !== undefined) params.set('min_uptime', String(filter.minUptime));
    if (filter?.category) params.set('category', filter.category);
    const q = params.toString();
    return this.request<Node[]>(`/v1/nodes${q ? '?' + q : ''}`);
  }

  async getNode(id: string): Promise<Node> {
    return this.request<Node>(`/v1/nodes/${encodeURIComponent(id)}`);
  }

  async getYield(window: string = '24h'): Promise<YieldSnapshot[]> {
    return this.request<YieldSnapshot[]>(`/v1/yield?window=${encodeURIComponent(window)}`);
  }

  async getBalance(address: string): Promise<Balance> {
    return this.request<Balance>(`/v1/balance/${encodeURIComponent(address)}`);
  }

  private async request<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'velocy-cli/0.1.0' },
    });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }
}
