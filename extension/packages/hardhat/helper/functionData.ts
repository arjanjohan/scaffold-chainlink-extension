// functionData.ts
interface FunctionArgs {
  [network: string]: {
    router: string;
    donId: string;
  };
}

const functionData: FunctionArgs = {
  avalancheFuji: {
    router: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    donId: "0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000",
  },
  sepolia: {
    router: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
    donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
  },
  baseSepolia: {
    router: "0xf9B8fc078197181C841c296C876945aaa425B278",
    donId: "0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000",
  },
};

export default functionData;
