import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import { VeloceClient } from '../api/client';
import { formatPercent, formatUSD } from '../utils/format';

export function registerYield(program: Command): void {
  program
    .command('yield')
    .description('Current yield rates across categories')
    .option('-w, --window <window>', 'Time window (24h, 7d, 30d)', '24h')
    .action(async (opts) => {
      const spinner = ora(`Fetching yield (${opts.window})…`).start();
      try {
        const client = new VeloceClient();
        const data = await client.getYield(opts.window);
        spinner.stop();

        const table = new Table({
          head: ['Category', 'APY', `Rewards (${opts.window})`, 'Participants'],
          style: { head: ['cyan'] },
        });

        for (const row of data) {
          table.push([
            row.category,
            chalk.green(formatPercent(row.apy)),
            formatUSD(row.rewards7d),
            String(row.participants),
          ]);
        }

        console.log(table.toString());
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exit(1);
      }
    });
}
