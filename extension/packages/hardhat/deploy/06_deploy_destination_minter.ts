import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/**
 * Deploys the DestinationMinter contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployDestinationMinter: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const nftContract = await hre.ethers.getContract("BGNFT");
  const nftAddress = await nftContract.getAddress();

  const networkName = hre.network.name;
  const addresses = chainlinkAddresses[networkName];

  if (!addresses) {
    throw new Error(`No router and link addresses configured for network: ${networkName}`);
  }

  const { router } = addresses;

  await deploy("DestinationMinter", {
    from: deployer,
    args: [router, nftAddress],
    log: true,
    autoMine: true,
  });
};

export default deployDestinationMinter;

deployDestinationMinter.tags = ["DestinationMinter"];
