// networks.ts
interface NetworkConfig {
  name: string;
  chainId: number;
  ccipChainId: bigint;
}

export const networks: NetworkConfig[] = [
  {
    name: "Sepolia",
    chainId: 11155111,
    ccipChainId: 16015286601757825753n,
  },
  {
    name: "Base Sepolia",
    chainId: 84532,
    ccipChainId: 10344971235874465080n,
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    ccipChainId: 14767482510784806043n,
  },
];

interface ChainlinkAddresses {
  [network: string]: {
    router: string;
    link: string;
  };
}

export const chainlinkAddresses: ChainlinkAddresses = {
  Ethereum: {
    router: "0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D",
    link: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
  "Avalanche Fuji": {
    router: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
    link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
  },
  Sepolia: {
    router: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
    link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  },
  "Base Sepolia": {
    router: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
    link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
  },
};

interface tokenAddresses {
  [network: string]: {
    assets: Record<string, string>;
  };
}

export const tokenAddresses: tokenAddresses = {
  Ethereum: {
    assets: {
      LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      USD: "0x0000000000000000000000000000000000000348",
    },
  },
  "Avalanche Fuji": {
    assets: {
      BnM: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
    },
  },
  Sepolia: {
    assets: {
      BnM: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
    },
  },
  "Base Sepolia": {
    assets: {
      BnM: "0x88a2d74f47a237a62e7a51cdda67270ce381555e",
    },
  },
};
