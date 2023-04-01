import { ethers } from 'ethers';
import Currency from './currency';

export function getProvider(currency: Currency): ethers.providers.Provider {
  return new ethers.providers.AlchemyProvider(currency.network, currency.alchemyKey);
}
