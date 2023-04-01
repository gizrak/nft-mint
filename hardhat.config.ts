/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import 'dotenv/config';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.1',
  },
};

export default config;
