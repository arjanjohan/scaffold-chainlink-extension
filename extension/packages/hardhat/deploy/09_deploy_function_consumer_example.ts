import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import chainlinkAddresses from "../helper/chainlinkAddresses";

/** Deploy FunctionsConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 *
 * @notice adds subscription to FunctionsRouter contract
 */

const functionsConsumerExample: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const networkName = hre.network.name;
  const data = chainlinkAddresses[networkName];

  if (!data) {
    throw new Error(`No router and donID  configured for network: ${networkName}`);
  }
  const { router } = data;

  await deploy("FunctionsConsumerExample", {
    from: deployer,
    args: [router],
    log: true,
    autoMine: true,
  });
};

export default functionsConsumerExample;

functionsConsumerExample.tags = ["functionExample", "all"];
