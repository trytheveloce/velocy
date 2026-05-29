import { Command } from 'commander';
import chalk from 'chalk';

export function registerConnect(program: Command): void {
  program
    .command('connect')
    .description('Pair a local GPU with the Tensor network (operator only)')
    .option('-d, --device <path>', 'CUDA device path', '/dev/nvidia0')
    .action(async (opts) => {
      console.log(chalk.cyan('Tensor operator pairing'));
      console.log(chalk.gray('─'.repeat(40)));
      console.log(`Device              ${opts.device}`);
      console.log();
      console.log(chalk.yellow('Operator onboarding is in private beta.'));
      console.log(chalk.gray('Request access: https://tensorcompute.xyz/contact'));
    });
}
