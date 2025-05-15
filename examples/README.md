# Counter Game

This is an implementation of a simple Counter Game. It showcases how to build a simple application with the state channels SDK.

The [contracts](./contracts/) hold the state machine logic that is ultimately enforced by a blockchain.

## Game Rules

1. Players take turns incrementing a counter by a number between 1 and 10
2. The first player to make the counter reach or exceed 100 wins
3. The winner receives the bet amount from the loser

## Installation
Note: Examples within this repository use the current version of the SDK(this repository) and not the remote package available on npm. This requires to install dependencies and build the SDK locally. Please make sure you've run `yarn && yarn build` in the root directory of this repository, before proceeding.

Continue with installation of local dependencies:
```shell
yarn
```

## Compile contracts
```shell
yarn hardhat compile
```
This will generate typechain-types and artifacts directories which contain typescript types, contract ABIs and bytecodes needed for deployment and interaction.

## EVM testnet
The SDK requires an underlying blockchain from which to inherit security. For testing purposes, we recommend using a local blockchain such as [Ganache](https://www.npmjs.com/package/ganache) with gas price set to 0.

Install ganache:
```shell
npm install -g ganache
```
Run a ganache node locally with gas price set to 0 and block time set to 2 seconds:
```shell
ganache -g 0 --chain.hardfork 'berlin' -b 2
```
This will run a node on http://localhost:8545

## Deploy contracts
To deploy to a custom network, add a .env file and define PROVIDER_URL (look at .env.example). Default network: http://localhost:8545
```shell
yarn hardhat run scripts/deployCounterGameContractsProxy.ts
```
Contracts should be deployed and a contracts.json file generated.