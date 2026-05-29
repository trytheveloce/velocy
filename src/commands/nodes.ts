import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import { TensorClient } from '../api/client';
import { formatPercent } from '../utils/format';

export function registerNodes(program: Command): void {
  const nodes = program.command('nodes').description('Manage and inspect GPU nodes');

  nodes
    .command('ls')
    .description('List active nodes')
    .option('-u, --uptime <number>', 'Filter by minimum uptime %')
    .option('-c, --category <category>', 'Filter by category (miner|gpu|hashlink|depin)')
    .action(async (opts) => {
      const spinner = ora('Loading nodes…').start();
      try {
        const client = new TensorClient();
        const nodeList = await client.listNodes({
          minUptime: opts.uptime ? Number(opts.uptime) : undefined,
          category: opts.category,
        });
        spinner.stop();

        const table = new Table({
          head: ['ID', 'Category', 'Hardware', 'Uptime', 'Hashrate', 'APY', 'Status'],
          style: { head: ['cyan'] },
        });

        for (const node of nodeList) {
          table.push([
            node.id,
            node.category,
            node.hardware,
            formatPercent(node.uptime),
            node.hashrate,
            formatPercent(node.yieldApy),
            statusColor(node.status),
          ]);
        }

        console.log(table.toString());
        console.log(chalk.gray(`${nodeList.length} node(s)`));
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exit(1);
      }
    });

  nodes
    .command('info <id>')
    .description('Show detailed information for a node')
    .action(async (id: string) => {
      const spinner = ora(`Fetching ${id}…`).start();
      try {
        const client = new TensorClient();
        const node = await client.getNode(id);
        spinner.stop();

        console.log();
        console.log(chalk.bold.cyan(node.id));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(`Category            ${node.category}`);
        console.log(`Hardware            ${node.hardware}`);
        console.log(`Uptime              ${chalk.green(formatPercent(node.uptime))}`);
        console.log(`Hashrate            ${node.hashrate}`);
        console.log(`Yield APY           ${chalk.green(formatPercent(node.yieldApy))}`);
        console.log(`Status              ${statusColor(node.status)}`);
        console.log();
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exit(1);
      }
    });
}

function statusColor(status: string): string {
  switch (status) {
    case 'active': return chalk.green(status);
    case 'idle': return chalk.yellow(status);
    case 'offline': return chalk.red(status);
    default: return status;
  }
}
