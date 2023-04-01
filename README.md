# NFT Mint

> Mint NFT

[![CI](https://github.com/gizrak/nft-mint/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/gizrak/nft-mint/actions/workflows/CI.yml)

## Getting Started

Prepare enviromnent variables. You can use different platform belows.

| Type   | Purpose                         | Platform                             | How to prepare                                                                                                   |
| ------ | ------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| IPFS   | Store minting original resource | [Pinata](https://docs.pinata.cloud/) | [API Key](https://knowledge.pinata.cloud/en/articles/6191471-how-to-create-an-pinata-api-key)                    |
| Web3   | Develop platform Web3 dApp      | [Alchemy](https://www.alchemy.com/)  | [API Key](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key)                     |
| Wallet | Personal Ethereum wallet        | [Metamask](https://metamask.io/)     | [Private Key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) |

Copy `.env.local` to `.env` and replace own settings.

```bash
cp .env.local .env
vi .env
npm install
```

Compile [smart contract files](./contracts/) and output would be generated in `./artifacts`.

```bash
$ npm run sol:compile

> nft-mint@1.0.0 sol:compile
> npx hardhat compile

Generating typings for: 15 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 23 typings!
Compiled 15 Solidity files successfully
```

Deploy smart contracts to blockchain.

- Blockchain network is decided by what you written in `.env` file.
- Dev environments are available. ([ETH](https://github.com/eth-clients/goerli), [POL](https://mumbai.polygonscan.com/))

```bash
$ npm run init

> nft-mint@1.0.0 init
> npx hardhat compile; npx ts-node ./src/cmd/contract.ts

Nothing to compile
No need to generate any newer typings.
Stored contract is ETH MyNFT 0x90150279923866cA64754c406b6FD4a728702c21
Stored contract is MATIC MyNFT 0x24150a728702c212766cA64759924c406D438b6F
```

Fill contract address in `.env` file.

```env
ETH_CONTRACT_ADDRESS=0x90150279923866cA64754c406b6FD4a728702c21
POL_CONTRACT_ADDRESS=0x24150a728702c212766cA64759924c406D438b6F
```

Mint the image using IPFS CID.

```bash
$ npm run mint matic bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy

> nft-mint@1.0.0 nft:mint
> npx ts-node ./cmd/nft.mint.ts "matic" "bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy"

NFT minted! contractAddress: 0x24150a728702c212766cA64759924c406D438b6F, tokenId: 8
```

Get NFT mint info using tokenId which is retrieved when minted.

```bash
$ npm run get matic 8

> nft-mint@1.0.0 nft:get
> npx ts-node ./cmd/nft.get.ts "matic" "8"

{
  contract: {
    address: '0x24150a728702c212766ca64759924c406d438b6f',
    name: 'MyNFT',
  },
  tokenId: '8',
  tokenType: 'ERC721',
  tokenUri: {
    gateway: 'https://ipfs.io/ipfs/bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy',
    raw: 'ipfs://bafkreibygvrdj4nf7ghhl7eubirhq5jr5zjxyhzojffrqae62hd4s62rsy'
  }
}
```

## Test

```bash
$ npm test
```

Upload a image which you want to mint into IPFS. You can use [test code](./test/services/ipfs.service.test.ts) and replace image file as you wish.

```bash
$ npm test -- test/services/ipfs.service.test.ts
```

## Others

### Add NFT into my wallet

- On Metamask App, use `Add NFT`
  - address: `contract address`
  - ID: `token ID`
- Minted image named `MyNFT` will display.

### Local Blockchain

- https://docs.openzeppelin.com/learn/deploying-and-interacting#local-blockchain
