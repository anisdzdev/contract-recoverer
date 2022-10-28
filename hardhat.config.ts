import fs from 'fs';
import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import CollectionConfig from './config/CollectionConfig';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    coinmarketcap: process.env.GAS_REPORTER_COIN_MARKET_CAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

// Setup Ethereum network
if (process.env.NETWORK_MAINNET_URL !== undefined) {
  config.networks!.mainnet = {
    url: process.env.NETWORK_MAINNET_URL,
    accounts: [process.env.NETWORK_MAINNET_PRIVATE_KEY!, process.env.HACKED_ACCOUNT_PRIVATE_KEY!],
  };
}

export default config;
