import {
  MoveETH
} from '../typechain/index';

import { ethers } from 'hardhat';
import CollectionConfig from './../config/CollectionConfig';

export class ContractProvider {
  public static async getContract(): Promise<MoveETH> {
    // Check configuration
    if (null === CollectionConfig.contractAddress) {
      throw '\x1b[31merror\x1b[0m ' + 'Please add the contract address to the configuration before running this command.';
    }

    if (await ethers.provider.getCode(CollectionConfig.contractAddress) === '0x') {
      throw '\x1b[31merror\x1b[0m ' + `Can't find a contract deployed to the target address: ${CollectionConfig.contractAddress}`;
    }

    return await ethers.getContractAt(CollectionConfig.contractName, CollectionConfig.contractAddress) as MoveETH;
  }
}

export type MoveETH = MoveETH;
