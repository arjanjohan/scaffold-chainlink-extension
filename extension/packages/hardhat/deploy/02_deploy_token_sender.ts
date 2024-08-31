import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/**
 * Deploys the TokenSender contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTokenSender: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const networkName = hre.network.name;
  const addresses = chainlinkAddresses[networkName];

  if (!addresses) {
    throw new Error(`No router and link addresses configured for network: ${networkName}`);
  }

  const { router, link } = addresses;

  await deploy("TokenSender", {
    from: deployer,
    args: [router, link],
    log: true,
    autoMine: true,
  });
};

export default deployTokenSender;

deployTokenSender.tags = ["TokenSender"];
