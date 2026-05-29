// Programmatic usage of the Tensor client.
// Requires `npm install tensor` (or local link via `npm link`).

const { TensorClient } = require('tensor/dist/api/client');

async function main() {
  const client = new TensorClient();

  const status = await client.getStatus();
  console.log('Active nodes:', status.activeNodes);
  console.log('24h rewards: ', status.rewardsDistributed24h);

  const topNodes = await client.listNodes({ minUptime: 99 });
  console.log(`Found ${topNodes.length} node(s) with uptime >= 99%`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
