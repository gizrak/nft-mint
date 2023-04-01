import { ethers } from 'ethers';
import Currency from './currency';
import { getProvider } from './provider';

export function getWallet(currency: Currency): ethers.Wallet {
  return new ethers.Wallet(currency.privateKey, getProvider(currency));
}
