/**
 * Contract
 * @title Contract
 * @description How to interact with a your own contract on the Phosphor API
 * @module
 */

const phosphorApiKey = process.env.PHOSPHOR_API_KEY;

const phosphorApiUrl = process.env.PHOSPHOR_API_URL;

/**
 * Get contract functions.
 * @title Get all contract functions
 * @description This will return a paginated list of all the functions that are available on the contract.
 * @param {string} collectionId
 * @returns {Promise}
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/collection-contract/get-collection-contract-functions#get-multiple-contract-functions
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections~1{collection_id}~1functions/get
 */
async function getContractFunctions(collectionId) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/collections/${collectionId}/functions`, {
      method: "GET",
      headers,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get a specific contract function
 * @title Get a specific contract function
 * @description Just get one function from the contract by collectionId and functionId.
 * @param {string} collectionId
 * @param {string} functionId
 * @returns {Promise}
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/collection-contract/get-collection-contract-functions#get-multiple-contract-functions
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections~1{collection_id}~1functions~1{function_id}/get
 */
async function getContractFunction(collectionId, functionId) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(
      `${phosphorApiUrl}/v1/collections/${collectionId}/functions/${functionId}`,
      {
        method: "GET",
        headers,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * Read a value from a contract function
 * @title Read a value from a contract function
 * @description Use this api to read a value from a contract function. Make sure to pass the correct arguments for the function.
 * @param {string} collectionId
 * @param {string} functionId
 * @param {Array} args
 * @returns {Promise}
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/collection-contract/issue-collection-contract-function-request#read-a-value-from-a-contract-function
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections~1{collection_id}~1functions~1{function_id}~1call/post
 */
async function readContractFunction(collectionId, functionId, args) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(
      `${phosphorApiUrl}/v1/collections/${collectionId}/functions/${functionId}/call`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          arguments: args,
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * Execute a contract function
 * @title Execute a contract function
 * @description By default, contract functions aren't configured to be manually executed. A function must be configured for manual execution before it can be the target of this endpoint. Issue a PATCH to the /functions/{function_id} endpoint and pass in "enabled": true
 * @param {string} collectionId
 * @param {string} functionId
 * @param {Array} args
 * @returns {Promise}
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/collection-contract/issue-collection-contract-function-request#execute-a-contract-function
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections~1{collection_id}~1functions~1{function_id}~1execute/post
 */
async function executeContractFunction(collectionId, functionId, args) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    // Add the Phosphor API key to the headers like this
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(
      `${phosphorApiUrl}/${collectionId}/functions/${functionId}/execute`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          arguments: args,
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
}


export {
  getContractFunctions,
  getContractFunction,
  readContractFunction,
  executeContractFunction,
}