const { usePlugin } = require("@nomiclabs/buidler/config");
// usePlugin("@nomiclabs/buidler-truffle5");
const hooks = require("./scripts/buidler-hooks");
usePlugin("@aragon/buidler-aragon");

// let mnemonic = "";
// try {
//   mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
// } catch (e) {
//   /* ignore for now because it might now have a mnemonic.txt file */
// }

const DEBUG = true;

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await web3.eth.getAccounts();
  for (const account of accounts) {
    console.log(account);
  }
});

task("blockNumber", "Prints the block number", async () => {
  const blockNumber = await web3.eth.getBlockNumber();
  console.log(blockNumber);
});

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await web3.eth.getBalance(await addr(taskArgs.account));
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("send", "Send ETH")
  .addParam("from", "From address or account index")
  .addOptionalParam("to", "To address or account index")
  .addOptionalParam("amount", "Amount to send in ether")
  .addOptionalParam("data", "Data included in transaction")
  .addOptionalParam("gasPrice", "Price you are willing to pay in gwei")
  .addOptionalParam("gasLimit", "Limit of how much gas to spend")

  .setAction(async (taskArgs) => {
    let from = await addr(taskArgs.from);
    debug(`Normalized from address: ${from}`);

    let to;
    if (taskArgs.to) {
      to = await addr(taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    let txparams = {
      from: from,
      to: to,
      value: web3.utils.toWei(taskArgs.amount ? taskArgs.amount : "0", "ether"),
      gasPrice: web3.utils.toWei(
        taskArgs.gasPrice ? taskArgs.gasPrice : "1.001",
        "gwei"
      ),
      gas: taskArgs.gasLimit ? taskArgs.gasLimit : "24000",
    };

    if (taskArgs.data !== undefined) {
      txparams["data"] = taskArgs.data;
      debug(`Adding data to payload: ${txparams["data"]}`);
    }
    debug(txparams.gasPrice / 1000000000 + " gwei");
    debug(JSON.stringify(txparams, null, 2));

    return await send(txparams);
  });

function send(txparams) {
  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction(txparams, (error, transactionHash) => {
      if (error) {
        debug(`Error: ${error}`);
      }
      debug(`transactionHash: ${transactionHash}`);
      //checkForReceipt(2, params, transactionHash, resolve)
    });
  });
}

function debug(text) {
  if (DEBUG) {
    console.log(text);
  }
}

async function addr(addr) {
  if (web3.utils.isAddress(addr)) {
    return web3.utils.toChecksumAddress(addr);
  } else {
    let accounts = await web3.eth.getAccounts();
    if (accounts[addr] !== undefined) {
      return accounts[addr];
    } else {
      throw `Could not normalize address: ${addr}`;
    }
  }
}

const INFURA_PROJECT_ID = "3bbc6e7cc2eb4aa7a23c15a7fffbe5e3";

let KOVAN_PRIVATE_KEY = "";
try {
  KOVAN_PRIVATE_KEY = fs.readFileSync("./private.txt").toString().trim();
} catch (e) {
  console.log("private.txt not found");
  KOVAN_PRIVATE_KEY =
    "db0d477d05e8925146f2bdfa1d74882f196f6a6ab0f13553c19ecea4e6682f8a";
}
//kovan.infura.io/v3/3bbc6e7cc2eb4aa7a23c15a7fffbe5e3
//kovan.infura.io/ws/v3/3bbc6e7cc2eb4aa7a23c15a7fffbe5e3

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    buidlerevm: {},
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`],
    },
  },
  solc: {
    version: "0.4.24",
    optimizer: {
      enabled: true,
      runs: 10000,
    },
  },
  etherscan: {
    apiKey: "7CPVADD1K7YVN17EDB7QU4XZNSDUW1XYFR",
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
