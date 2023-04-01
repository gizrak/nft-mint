import { getContractAt } from '@nomiclabs/hardhat-ethers/internal/helpers';
import { Contract } from 'ethers';
import Currency from '../lib/currency';
import { getWallet } from '../lib/wallet';

async function deployHello(currency: Currency, contractName: string) {
  // deploy contract
  const hre = require('hardhat');
  const contract = await hre.ethers
    .getContractFactory(contractName, getWallet(currency))
    .then((contractFactory) => contractFactory.deploy('hello world'));
  await contract.deployed();
  const contractAddress = contract.address;
  console.info(`Contract address is: ${contractAddress}`);

  // send transaction
  const message: string = await getContractAt(hre, contractName, contract.address, getWallet(currency)).then(
    (contract: Contract) => {
      return contract.message();
    },
  );
  console.info(`The message is: ${message}`);
}

deployHello(Currency.MATIC, 'HelloWorld').catch((error) => {
  console.error(error);
  process.exit(-1);
});
