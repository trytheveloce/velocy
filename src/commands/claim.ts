import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig } from '../config';

export function registerClaim(program: Command): void {
  program
    .command('claim')
    .description('Claim accrued rewards (requires wallet configured)')
    .action(async () => {
      const config = loadConfig();
      if (!config.walletAddress) {
        console.error(chalk.red('No wallet configured.'));
        console.error(chalk.gray('Set VELOCE_WALLET or run `velocy connect` first.'));
        process.exit(1);
      }
      console.log(chalk.yellow('Wallet signing flow is not yet supported in the CLI.'));
      console.log(chalk.gray('Visit https://useveloce.xyz to claim from your browser wallet.'));
    });
}
