import Currency from './currency';
import env from './env';

export function get(currency: Currency) {
  if (currency.contractAddress === undefined) {
    throw new Error('Contract is not exist.');
  }
  return {
    name: env.get('CONTRACT_NAME'),
    address: currency.contractAddress,
  };
}
