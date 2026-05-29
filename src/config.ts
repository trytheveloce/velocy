import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export interface TensorConfig {
  apiUrl: string;
  network: 'base' | 'base-sepolia';
  walletAddress?: string;
}

const DEFAULTS: TensorConfig = {
  apiUrl: 'https://api.tensorcompute.xyz',
  network: 'base',
};

export function loadConfig(): TensorConfig {
  const configPath = join(homedir(), '.tensor', 'config.json');

  let fileConfig: Partial<TensorConfig> = {};
  if (existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch {
      // ignore malformed config, fall back to defaults
    }
  }

  return {
    apiUrl: process.env.TENSOR_API_URL || fileConfig.apiUrl || DEFAULTS.apiUrl,
    network: (process.env.TENSOR_NETWORK as TensorConfig['network']) || fileConfig.network || DEFAULTS.network,
    walletAddress: process.env.TENSOR_WALLET || fileConfig.walletAddress,
  };
}
