import { resolve } from 'path';
import * as service from '../../src/services/ipfs.service';

test.skip('pinFile should work', async () => {
  const absolutePath = resolve('./test/teddy-bear.jpg');
  const result = await service.pinFile(absolutePath);
  expect(result).not.toBeNull();
  expect(result.cid).not.toBeNull();
  expect(result.ipfsUrl).not.toBeNull();
  expect(result.webUrl).not.toBeNull();
}, 10_000);

test.skip('pinJson should work', async () => {
  const result = await service.pinJson('ipfs.util.test.json', {
    name: 'Ted Vance',
    description: 'He is a good man.',
  });
  expect(result).not.toBeNull();
  expect(result.cid).not.toBeNull();
  expect(result.ipfsUrl).not.toBeNull();
  expect(result.webUrl).not.toBeNull();
});

test('getIpfsUrl should work', () => {
  const url = service.getIpfsUrl('bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
  expect(url).toEqual('ipfs://bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
});

test('getPinataWebUrl should work', () => {
  const url = service.getPinataWebUrl('bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
  expect(url).toEqual('https://gateway.pinata.cloud/ipfs/bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
});

test('getWebUrl should work', () => {
  const url = service.getWebUrl('bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
  expect(url).toEqual('https://ipfs.io/ipfs/bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy');
});
