import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/** Deploy FunctionsConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 *
 * @notice adds subscription to FunctionsRouter contract
 */

const functionsConsumerGettingStarted: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const networkName = hre.network.name;
  const data = chainlinkAddresses[networkName];

  if (!data) {
    throw new Error(`No router and donID  configured for network: ${networkName}`);
  }
  const { functions_router, donId } = data;

  await deploy("GettingStartedFunctionsConsumer", {
    from: deployer,
    args: [functions_router, donId],
    log: true,
    autoMine: true,
  });
};

export default functionsConsumerGettingStarted;

functionsConsumerGettingStarted.tags = ["functionExample", "all"];
