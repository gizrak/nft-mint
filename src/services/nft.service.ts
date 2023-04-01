import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
import { getContractAt } from '@nomiclabs/hardhat-ethers/internal/helpers';
import { Alchemy, Network, Nft } from 'alchemy-sdk';
import { Contract, ethers } from 'ethers';
import * as store from '../lib/contract.store';
import Currency from '../lib/currency';
import { getProvider } from '../lib/provider';
import { getWallet } from '../lib/wallet';

export async function get(currency: Currency, tokenId: string): Promise<Nft> {
  const contract = store.get(currency);
  const alchemy = new Alchemy({
    apiKey: currency.alchemyKey,
    network: resolveNetwork(currency),
  });
  return alchemy.nft.getNftMetadata(contract.address, tokenId);
}

export async function mint(currency: Currency, ipfsCid: string, gasLimit: number = 500_000) {
  try {
    const hre = require('hardhat');
    const contract = store.get(currency);
    const ipfsUrl = `ipfs://${ipfsCid}`;
    const transaction: TransactionResponse = await getContractAt(
      hre,
      contract.name,
      contract.address,
      getWallet(currency),
    ).then((contract: Contract) => {
      return contract.mintNFT(currency.publicKey, ipfsUrl, {
        gasLimit: gasLimit,
      });
    });

    await transaction.wait();

    const provider = getProvider(currency);
    const receipt: TransactionReceipt = await provider.getTransactionReceipt(transaction.hash);
    const tokenId = parseInt(ethers.utils.hexValue(receipt.logs[0].topics[3]));
    console.debug(`NFT minted! contractAddress: ${contract.address}, tokenId: ${tokenId}`);

    return {
      contract: contract,
      tokenId: tokenId,
      transaction: transaction,
      receipt: receipt,
    };
  } catch (err) {
    throw err;
  }
}

function resolveNetwork(currency: Currency): Network {
  if (currency === Currency.ETH) {
    if (currency.network === 'mainnet') {
      return Network.ETH_MAINNET;
    } else if (currency.network === 'goerli') {
      return Network.ETH_GOERLI;
    } else if (currency.network === 'sepolia') {
      return Network.ETH_SEPOLIA;
    }
  } else if (currency === Currency.MATIC) {
    if (currency.network === 'maticmum') {
      return Network.MATIC_MUMBAI;
    }
  }
  throw new Error('Invalid currency!!');
}
