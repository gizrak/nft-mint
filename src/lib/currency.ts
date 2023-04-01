import env from './env';

const eth_network = env.get('ETH_ALCHEMY_NETWORK').toLowerCase();
const eth_alchemy_key = env.get('ETH_ALCHEMY_API_KEY');
const eth_alchemy_url = `https://eth-${eth_network}.g.alchemy.com/v2/${eth_alchemy_key}`;

const pol_network = env.get('POL_ALCHEMY_NETWORK').toLowerCase();
const pol_alchemy_key = env.get('POL_ALCHEMY_API_KEY');
const pol_alchemy_url = `https://polygon-${pol_network}.g.alchemy.com/v2/${pol_alchemy_key}`;

/**
 * https://github.com/ethers-io/ethers.js/blob/0578a88efa4f5f65df90a5ac8b63ffdfb5e44d9a/packages/providers/lib/alchemy-provider.js#L65
 */
export default class Currency {
  public static readonly ETH = new Currency(
    'eth',
    eth_network,
    eth_alchemy_key,
    eth_alchemy_url,
    env.get('ETH_PUBLIC_KEY'),
    env.get('ETH_PRIVATE_KEY'),
    env.get('ETH_CONTRACT_ADDRESS'),
  );
  public static readonly MATIC = new Currency(
    'matic',
    pol_network,
    pol_alchemy_key,
    pol_alchemy_url,
    env.get('POL_PUBLIC_KEY'),
    env.get('POL_PRIVATE_KEY'),
    env.get('POL_CONTRACT_ADDRESS'),
  );

  private constructor(
    public readonly name: string,
    public readonly network: string,
    public readonly alchemyKey: string,
    public readonly alchemyUrl: string,
    public readonly publicKey: string,
    public readonly privateKey: string,
    public readonly contractAddress: string,
  ) {}

  public static of(currency: string): Currency {
    switch (currency) {
      case 'eth':
        return Currency.ETH;
      case 'matic':
        return Currency.MATIC;
      default:
        throw `Currency ${currency} is not supported.`;
    }
  }
}
