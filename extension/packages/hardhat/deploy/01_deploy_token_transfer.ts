import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/**
 * Deploys the TokenTransfer contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTokenTransfer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const networkName = hre.network.name;
  const addresses = chainlinkAddresses[networkName];

  if (!addresses) {
    throw new Error(`No router and link addresses configured for network: ${networkName}`);
  }

  const { router } = addresses;

  await deploy("TokenTransfer", {
    from: deployer,
    args: [router],
    log: true,
    autoMine: true,
  });
};

export default deployTokenTransfer;

deployTokenTransfer.tags = ["TokenTransfer"];
