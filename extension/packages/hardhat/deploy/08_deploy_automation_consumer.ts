import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/**
 * Deploys the AutomationConsumer contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAutomationConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const networkName = hre.network.name;
  const data = chainlinkAddresses[networkName];


  if (!data) {
    throw new Error(`No router and donID  configured for network: ${networkName}`);
  }
  const { link, automation_registry, automation_registrar } = data;

  await deploy("AutomationConsumer", {
    from: deployer,
    args: [link, automation_registrar, automation_registry],
    log: true,
    autoMine: true,
  });
};

export default deployAutomationConsumer;

deployAutomationConsumer.tags = ["AutomationConsumer"];
