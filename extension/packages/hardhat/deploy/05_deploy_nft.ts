import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the BGNFT contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployBGNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BGNFT", {
    from: deployer,
    args: [], // Pass any constructor arguments here if needed
    log: true,
    autoMine: true,
  });
};

export default deployBGNFT;

deployBGNFT.tags = ["BGNFT"];
