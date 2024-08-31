import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/**
 * Deploys the MessageSender contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployMessageSender: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const networkName = hre.network.name;
  const addresses = chainlinkAddresses[networkName];

  if (!addresses) {
    throw new Error(`No router and link addresses configured for network: ${networkName}`);
  }

  const { router, link } = addresses;

  await deploy("MessageSender", {
    from: deployer,
    args: [router, link],
    log: true,
    autoMine: true,
  });
};

export default deployMessageSender;

deployMessageSender.tags = ["MessageSender"];
