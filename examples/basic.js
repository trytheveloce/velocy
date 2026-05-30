// Programmatic usage of the Veloce client.
// Requires `npm install velocy` (or local link via `npm link`).

const { VeloceClient } = require('velocy/dist/api/client');

async function main() {
  const client = new VeloceClient();

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
