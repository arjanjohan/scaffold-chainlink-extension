import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import automationNetworkConfig from "../helper/automation";

/**
 * Deploys the AutomationConsumer contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAutomationConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const networkName = hre.network.name;
  const data = automationNetworkConfig[networkName];

  if (!data) {
    throw new Error(`No router and donID  configured for network: ${networkName}`);
  }
  const { linkTokenAddress, registrarAddress, registryAddress } = data;

  await deploy("AutomationConsumer", {
    from: deployer,
    args: [linkTokenAddress, registrarAddress, registryAddress],
    log: true,
    autoMine: true,
  });
};

export default deployAutomationConsumer;

deployAutomationConsumer.tags = ["AutomationConsumer"];
