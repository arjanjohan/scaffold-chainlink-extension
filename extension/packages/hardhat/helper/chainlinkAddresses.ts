interface ChainlinkAddresses {
  [network: string]: {
    router: string;
    donId: string;
    link: string;
    vrf_wrapper: string;
    vrf_coordinator: string;
    priceFeedAddress: string;
  };
}

const chainlinkAddresses: ChainlinkAddresses = {
  avalancheFuji: {
    router: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
    donId: "0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000",
    link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    vrf_wrapper: "0x327B83F409E1D5f13985c6d0584420FA648f1F56",
    vrf_coordinator: "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE",
    priceFeedAddress: "0x86d67c3D38D2bCeE722E601025C25a575021c6EA",
  },
  sepolia: {
    router: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
    donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    vrf_wrapper: "0x195f15F2d49d693cE265b4fB0fdDbE15b1850Cc1",
    vrf_coordinator: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
    priceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  baseSepolia: {
    router: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
    donId: "0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000",
    link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    vrf_wrapper: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
    vrf_coordinator: "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE",
    priceFeedAddress: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
  },
};

export default chainlinkAddresses;
