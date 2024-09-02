interface NetworkConfigEntryTypes {
  [network: string]: {
    registrarAddress: string;
    linkTokenAddress: string;
    registryAddress: string;
  };
}

// Contracts have constructors that require contract address args that are network specific
const automationNetworkConfig: NetworkConfigEntryTypes = {
  sepolia: {
    linkTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    registrarAddress: "0x9a811502d843E5a03913d5A2cfb646c11463467A",
    registryAddress: "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad",
  },
};

export default automationNetworkConfig;
