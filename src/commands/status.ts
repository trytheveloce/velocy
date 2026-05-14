import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { VeloceClient } from '../api/client';
import { formatPercent, formatUSD } from '../utils/format';

export function registerStatus(program: Command): void {
  program
    .command('status')
    .description('Network overview — nodes, uptime, rewards')
    .action(async () => {
      const spinner = ora('Fetching network status…').start();
      try {
        const client = new VeloceClient();
        const stats = await client.getStatus();
        spinner.stop();

        console.log();
        console.log(chalk.bold.cyan('Veloce Network'));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(`Active nodes        ${chalk.white(stats.activeNodes)} / ${chalk.gray(stats.totalNodes)}`);
        console.log(`Total hashrate      ${chalk.white(stats.totalHashrate)}`);
        console.log(`Uptime (24h)        ${chalk.green(formatPercent(stats.uptime24h))}`);
        console.log(`Rewards (24h)       ${chalk.white(formatUSD(stats.rewardsDistributed24h))}`);
        console.log(`TVL                 ${chalk.white(formatUSD(stats.totalValueLocked))}`);
        console.log();
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exit(1);
      }
    });
}
