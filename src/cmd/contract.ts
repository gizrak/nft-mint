import * as store from '../lib/contract.store';
import Currency from '../lib/currency';
import env from '../lib/env';
import { getWallet } from '../lib/wallet';

async function deployNft(currency: Currency) {
  const contractName = env.get('CONTRACT_NAME');
  try {
    // find contract
    const storedContract = store.get(currency);
    console.info(`Stored contract is ${currency.name.toUpperCase()} ${storedContract.name} ${storedContract.address}`);
  } catch (e) {
    // deploy contract
    const hre = require('hardhat');
    const deployedContract = await hre.ethers
      .getContractFactory(contractName, getWallet(currency))
      .then((contractFactory) => contractFactory.deploy());
    await deployedContract.deployed();
    console.info(
      `Deployed contract is ${currency.name.toUpperCase()} ${deployedContract.name} ${deployedContract.address}`,
    );
  }
}

deployNft(Currency.ETH).catch((error) => {
  console.error(error);
  process.exit(-1);
});

deployNft(Currency.MATIC).catch((error) => {
  console.error(error);
  process.exit(-1);
});
