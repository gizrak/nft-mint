import fs from 'fs';
import env from '../lib/env';

const pinataSDK = require('@pinata/sdk');

const PINATA_API_KEY = env.get('PINATA_API_KEY');
const PINATA_API_SECRET = env.get('PINATA_API_SECRET');
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

export async function pinFile(
  path: string,
): Promise<{ cid: string; ipfsUrl: string; pinataUrl: string; webUrl: string }> {
  // deploy content to IPFS
  const readableStreamForFile = fs.createReadStream(path);
  const ipfsResult = await pinata.pinFileToIPFS(readableStreamForFile, {
    pinataOptions: {
      cidVersion: 1,
    },
  });
  console.debug(ipfsResult);

  const result = {
    cid: ipfsResult.IpfsHash,
    ipfsUrl: getIpfsUrl(ipfsResult.IpfsHash),
    pinataUrl: getPinataWebUrl(ipfsResult.IpfsHash),
    webUrl: getWebUrl(ipfsResult.IpfsHash),
  };
  console.debug(result);

  return result;
}

export async function pinJson(
  name: string,
  json: object,
): Promise<{ cid: string; ipfsUrl: string; pinataUrl: string; webUrl: string }> {
  // deploy JSON meta to IPFS
  const ipfsResult = await pinata.pinJSONToIPFS(json, {
    pinataMetadata: {
      name: name,
    },
    pinataOptions: {
      cidVersion: 1,
    },
  });
  console.debug(ipfsResult);

  const result = {
    cid: ipfsResult.IpfsHash,
    ipfsUrl: getIpfsUrl(ipfsResult.IpfsHash),
    pinataUrl: getPinataWebUrl(ipfsResult.IpfsHash),
    webUrl: getWebUrl(ipfsResult.IpfsHash),
  };
  console.debug(result);

  return result;
}

export function getIpfsUrl(cid: string) {
  return `ipfs://${cid}`;
}

export function getPinataWebUrl(cid: string) {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

export function getWebUrl(cid: string) {
  return `https://ipfs.io/ipfs/${cid}`;
}
