import { Nft } from 'alchemy-sdk';
import Currency from '../../src/lib/currency';
import * as service from '../../src/services/nft.service';

test('get should work', async () => {
  const tokenId = '2';
  const result: Nft = await service.get(Currency.MATIC, tokenId);
  expect(result).toMatchObject({
    contract: {
      address: '0x24150a728702c212766ca64759924c406d438b6f',
      name: 'MyNFT',
      symbol: 'NFT',
      totalSupply: undefined,
      tokenType: 'ERC721',
      openSea: {
        floorPrice: undefined,
        collectionName: undefined,
        safelistRequestStatus: undefined,
        imageUrl: undefined,
        description: undefined,
        externalUrl: undefined,
        twitterUsername: undefined,
        discordUrl: undefined,
        lastIngestedAt: '2023-04-01T12:42:13.000Z',
      },
      contractDeployer: '0x84cfc584c896169e3edfae44ae48776022c4e763',
      deployedBlockNumber: 33834144,
    },
    tokenId: '2',
    tokenType: 'ERC721',
    title: '',
    description: '',
    metadataError: 'Token metadata too large, do not retry',
    rawMetadata: { metadata: [], attributes: [] },
    tokenUri: {
      gateway: 'https://ipfs.io/ipfs/bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy',
      raw: 'ipfs://bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy',
    },
    media: [],
    spamInfo: undefined,
  });
}, 60_000);

test.skip('mint should work', async () => {
  const ipfsCid = 'bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy';
  const result = await service.mint(Currency.MATIC, ipfsCid);
  expect(result).toMatchObject({
    contract: {
      name: 'MyNFT',
      address: '0x24150a728702c212766cA64759924c406D438b6F',
    },
    transaction: {
      to: '0x24150a728702c212766cA64759924c406D438b6F',
    },
    receipt: {
      to: '0x24150a728702c212766cA64759924c406D438b6F',
      from: '0x84cFc584C896169E3eDfAe44aE48776022C4e763',
    },
  });
}, 600_000);
