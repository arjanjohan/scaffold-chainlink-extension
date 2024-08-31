import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the AutomationCounter contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAutomationCounter: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const automationUpdateInterval = 10;

  await deploy("AutomationCounter", {
    from: deployer,
    args: [automationUpdateInterval],
    log: true,
    autoMine: true,
  });
};

export default deployAutomationCounter;

deployAutomationCounter.tags = ["AutomationCounter"];
