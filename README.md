## Instructions

## Installation

```shell
npx create-eth@latest -e arjanjohan/scaffold-chainlink-extension
```

### hardhat.config.ts

#### Solidity version
The Chainlink contracts use Solidity version `0.8.19`. Update this in `hardhat.config.ts`:
```
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
```

#### Networks
This Chainlink extensions come preconfigured for 3 networks. Ethereum Sepolia, Base Sepolia and Avalanche Fuji. To use Avalanche Fuji in Hardhat, please add the network in `hardhat.config.ts`.
```
    avalancheFuji: {
      url: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
      accounts: [deployerPrivateKey],
    },
```

### externalContracts.ts

The `FeedRegistry` of the `Price Feeds` page uses the contract on Ethereum Mainnet to fetch data. This requires the contract address and ABI, which you must add manually. Replace `scaffold-chainlink/packages/nextjs/contracts/externalContracts.ts` by the `externalContracts.ts` that is located in the root of your project.