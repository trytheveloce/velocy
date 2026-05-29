#!/usr/bin/env node

import { Command } from 'commander';
import { registerStatus } from './commands/status';
import { registerNodes } from './commands/nodes';
import { registerYield } from './commands/yield';
import { registerBalance } from './commands/balance';
import { registerClaim } from './commands/claim';
import { registerConnect } from './commands/connect';

const program = new Command();

program
  .name('tensor')
  .description('Command-line interface for the Tensor compute marketplace')
  .version('0.1.0');

registerStatus(program);
registerNodes(program);
registerYield(program);
registerBalance(program);
registerClaim(program);
registerConnect(program);

program.parseAsync(process.argv).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
