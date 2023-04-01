import env from '../../src/lib/env';

test('env should exist.', () => {
  expect(env.get('ENV')).not.toBeNull();
  expect(env.get('LOG_LEVEL')).not.toBeNull();

  expect(env.get('PINATA_API_KEY')).not.toBeNull();
  expect(env.get('PINATA_API_SECRET')).not.toBeNull();

  expect(env.get('ETH_ALCHEMY_API_KEY')).not.toBeNull();
  expect(env.get('ETH_ALCHEMY_NETWORK')).not.toBeNull();
  expect(env.get('ETH_PUBLIC_KEY')).not.toBeNull();
  expect(env.get('ETH_PRIVATE_KEY')).not.toBeNull();

  expect(env.get('POL_ALCHEMY_API_KEY')).not.toBeNull();
  expect(env.get('POL_ALCHEMY_NETWORK')).not.toBeNull();
  expect(env.get('POL_PUBLIC_KEY')).not.toBeNull();
  expect(env.get('POL_PRIVATE_KEY')).not.toBeNull();

  expect(env.get('CONTRACT_NAME')).not.toBeNull();
  expect(env.get('ETH_CONTRACT_ADDRESS')).not.toBeNull();
  expect(env.get('POL_CONTRACT_ADDRESS')).not.toBeNull();
});
