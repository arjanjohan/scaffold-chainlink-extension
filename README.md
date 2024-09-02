
# 🏃 [Scaffold-ETH 2 Chainlink Extension](https://github.com/arjanjohan/scaffold-chainlink-extension)

This SE2 extension is meant as a beginners guide to working with Chainlink. This extensions comes with example smart contracts and frontend components, which can serve as the basis for your Chainlink based dApp or project. This extension includes these features:

- CCIP:
  - Transfer tokens across chains using Chainlink CCIP
  - Send and receive cross-chain messages
  - Mint NFTs on a destination chain via cross-chain requests
- Data Feeds
- VRF
- Automation
- Functions



## Installation

To create a SE2 project with this Chainlink extension, first execute this command:
```shell
npx create-eth@latest -e arjanjohan/scaffold-chainlink-extension
```

After that, some manual configuration is needed in `hardhat.config.ts` and `externalContracts.ts`.

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