import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { VeloceClient } from '../api/client';
import { formatAddress, formatUSD } from '../utils/format';

export function registerBalance(program: Command): void {
  program
    .command('balance <address>')
    .description('Query holder balance and accrued rewards')
    .action(async (address: string) => {
      const spinner = ora('Fetching balance…').start();
      try {
        const client = new VeloceClient();
        const balance = await client.getBalance(address);
        spinner.stop();

        console.log();
        console.log(chalk.bold.cyan(formatAddress(balance.address)));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(`Shares              ${chalk.white(balance.shares)}`);
        console.log(`Accrued rewards     ${chalk.white(formatUSD(balance.accruedRewards))}`);
        console.log(`Claimable           ${chalk.green(formatUSD(balance.claimable))}`);
        console.log();
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exit(1);
      }
    });
}
