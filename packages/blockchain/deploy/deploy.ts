import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // You will get the phosphor api response here
  const response = await hre.phosphor.deploy("Ticket", {
    name: "Ticket",
    description: "A NFT deployed using phosphor",
    networkId: 5,
    // pass constructor arguments if any in order
    constructorArgs: ["ticket name", 10000, 1],
  });

  if (response.error) {
    console.error("Error deploying contract", response.error);
    return;
  }

  console.log(
    "Your contract is being deployed. View the progress in the phosphor dashboard; CollectionId",
    response.id
  );

  // You can also check the deployment status with this. This will probably return status as "PENDING" now
  // alternatively you can a setup a webhook to get the status
  const statusResponse = await hre.phosphor.getDeploymentStatus(response.id);

  if (response.error) {
    console.error("Error deploying contract", response.error);
    return;
  }

  console.log(
    `Deployment status: ${statusResponse.status} and tranasaction id id ${statusResponse.transaction_id}`
  );
};

export default deploy;
