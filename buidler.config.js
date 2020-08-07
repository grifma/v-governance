const { usePlugin } = require("@nomiclabs/buidler/config");
const hooks = require("./scripts/buidler-hooks");

usePlugin("@aragon/buidler-aragon");

// let mnemonic = "";
// try {
//   mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
// } catch (e) {
//   /* ignore for now because it might now have a mnemonic.txt file */
// }

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    buidlerevm: {},
  },
  solc: {
    version: "0.4.24",
    optimizer: {
      enabled: true,
      runs: 10000,
    },
  },
  etherscan: {
    apiKey: "", // API Key for smart contract verification. Get yours at https://etherscan.io/apis
  },
  aragon: {
    appServePort: 8001,
    clientServePort: 3000,
    appSrcPath: "app/",
    appBuildOutputPath: "dist/",
    appName: "v-governance",
    hooks, // Path to script hooks
  },
};
