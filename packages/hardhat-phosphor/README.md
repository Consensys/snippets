# Hardhat Phosphor 

  This Hardhat plugin enables developers to seamlessly connect Hardhat with the [Phosphor platform](https://www.phosphor.xyz/developer), facilitating the deployment and management of NFT collections directly within your Hardhat workflow. Phosphor simplifies the lifecycle management of NFT drops, offering a robust API for creating collections, managing NFTs, distributing and listing assets, and handling royalties and payments without the direct handling of smart contracts.

## Features

-   **Custom Contract Deployment**: Support for deploying custom contracts to Phosphor by incorporating ABI, bytecode, and constructor arguments into your Hardhat deployment scripts.
-   **Streamlined Workflow**: Enhance your NFT project's workflow by leveraging Phosphor's API capabilities directly within Hardhat.
  

##  Prerequisites
-   Node.js and npm installed.
-   An existing Hardhat project setup.
  

## Installation

  ```
  npm install --save-dev hardhat-phosphor
```

## Configuration

Import the plugin like this in your `hardhat.config` file and add your phosphor endpoint as well as the phosphor api key like this inside the config. So that it those can be picked up by the plugin. 

  ```
  import  "hardhat-phosphor"

const  config:  HardhatUserConfig  = {
	phosphor: {
		phosphorEndpoint:  {your-phosphor-endpoint},
		phosphorApiKey:  {your-phosphor-api-key,
	},
}

```


### Usage

You can integrate the plugin into your Hardhat deployment scripts. Instead of using `hre.deploy()`, you should use `hre.phosphor.deploy()` and provide the appropriate arguments. The arguments include `abi` and `bytecode` from the specified contract, which are then passed to the Phosphor API to create a collection.
You can setup a webhook or checkout the phosphor dashboard to view the progress of the contract deployment

```
  

const  deploy:  DeployFunction  =  async  function (hre:  HardhatRuntimeEnvironment) {

    // You will get the phosphor api response here
    const  response  =  await  hre.phosphor.deploy("Ticket", {
        name:  "Ticket",
        description:  "A NFT deployed using phosphor",
        networkId:  5,
        
        // pass constructor arguments if any in order
        constructorArgs: ["ticket name", 10000, 1],

    });

    if (response.error) {
        console.error("Error deploying contract", response.error);
        return;

    }

    console.log("Your contract is being deployed. View the progress in the phosphor dashboard; CollectionId",
        response.id );

    // You can also check the deployment status with this. This will probably return status as "PENDING" now

    // alternatively you can a setup a webhook to get the status

    const  statusResponse  =  await  hre.phosphor.getDeploymentStatus(response.id);

        if (response.error) {
            console.error("Error deploying contract", response.error);
            return; 
        }

        console.log(`Deployment status: ${statusResponse.status} and tranasaction id id ${statusResponse.transaction_id}`);

};

export  default  deploy;

```

## Learn More

To learn more about the Phosphor platform and its capabilities, visit [Phosphor's official documentation](https://docs.phosphor.xyz/).

## Support

For issues, feature requests, or contributions, please [open an issue](https://github.com/Consensys/snippets/issues) on GitHub.
