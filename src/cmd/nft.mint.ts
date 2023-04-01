import Currency from '../lib/currency';
import * as service from '../services/nft.service';

const currency = process.argv[2];
const ipfsCid = process.argv[3];

if (currency === undefined || ipfsCid === undefined) {
  console.error('[USAGE] nft.mint.ts {eth|matic} {ipfsCid}');
  process.exit(-1);
}

service.mint(Currency.of(currency), ipfsCid).catch((err) => {
  console.log('Failed:', err);
});
