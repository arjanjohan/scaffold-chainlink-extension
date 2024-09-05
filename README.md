
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

### scaffold.config.ts
Add more networks, to allow for cross-chain testing.
```
targetNetworks: [chains.sepolia, chains.baseSepolia, chains.avalancheFuji],
```

### externalContracts.ts

The `FeedRegistry` of the `Price Feeds` page uses the contract on Ethereum Mainnet to fetch data. This requires the contract address and ABI, which you must add manually. Replace `scaffold-chainlink/packages/nextjs/contracts/externalContracts.ts` by the `externalContracts.ts` that is located in the root of your project.

## Links

- [Live dApp on Vercel](https://scaffold-chainlink.vercel.app/)

### Deployed contracts on Sepolia Testnet

- [AutomationConsumer](https://sepolia.etherscan.io/address/0xB24438749008195220687bB8beD20c32CFf9EF1A)
- [AutomationCounter](https://sepolia.etherscan.io/address/0x1721Be7a85C5c1CbdE925aA5c080efFF0862d849)
- [BGNFT](https://sepolia.etherscan.io/address/0xD9BaFcBE0625A03d826bc57546f876d9f6B734e4)
- [DestinationMinter](https://sepolia.etherscan.io/address/0x43DAdc4B1BaF5b2276fC5f578Bf16578aba7153c)
- [FunctionsConsumer](https://sepolia.etherscan.io/address/0x548051603370EBcEd09a66f30dFC51E4Bd36d163)
- [FunctionsConsumerExample](https://sepolia.etherscan.io/address/0xAc67f3f49A98faC8CcABd8B514bb40DC0441C20D)
- [MessageReceiver](https://sepolia.etherscan.io/address/0xE2703C374C75444EF21c2229f46FB647D62FfDeD)
- [MessageSender](https://sepolia.etherscan.io/address/0x1f2897544aBC80533986c6B8182576B3A0F0b2F1)
- [PriceConsumerV3](https://sepolia.etherscan.io/address/0x288DD9189309D51d05B2D644545D75431aF6E272)
- [RandomNumberDirectFundingConsumerV2Plus](https://sepolia.etherscan.io/address/0xE6f1630d702eD7Ac2c18B595Ed65aa3F7AB5A5aD)
- [SourceMinter](https://sepolia.etherscan.io/address/0xc22E5C02bDa3bd94D77f9Ab08875aB2877D2464B)
- [TokenSender](https://sepolia.etherscan.io/address/0xC4212157a984a6C3bfEdEE13004c1f04C412f699)
- [TokenTransfer](https://sepolia.etherscan.io/address/0x4cF2245268bb129D745772C75C5EB23289Aadd69)
- [TokenTransferor](https://sepolia.etherscan.io/address/0xc3b05f308731B8D18B0AF5FF8D5b45EA2c77D891)
