import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export interface VeloceConfig {
  apiUrl: string;
  network: 'base' | 'base-sepolia';
  walletAddress?: string;
}

const DEFAULTS: VeloceConfig = {
  apiUrl: 'https://api.useveloce.xyz',
  network: 'base',
};

export function loadConfig(): VeloceConfig {
  const configPath = join(homedir(), '.velocy', 'config.json');

  let fileConfig: Partial<VeloceConfig> = {};
  if (existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch {
      // ignore malformed config, fall back to defaults
    }
  }

  return {
    apiUrl: process.env.VELOCE_API_URL || fileConfig.apiUrl || DEFAULTS.apiUrl,
    network: (process.env.VELOCE_NETWORK as VeloceConfig['network']) || fileConfig.network || DEFAULTS.network,
    walletAddress: process.env.VELOCE_WALLET || fileConfig.walletAddress,
  };
}
