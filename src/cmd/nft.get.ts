import Currency from '../lib/currency';
import * as service from '../services/nft.service';

const currency = process.argv[2];
const tokenId = process.argv[3];

if (currency === undefined || tokenId === undefined) {
  console.error('[USAGE] nft.get.ts {eth|matic} {tokenId}');
  process.exit(-1);
}

service
  .get(Currency.of(currency), tokenId)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log('Failed:', err);
  });
