/**
 * Collection
 * @title Collection
 * @description Unique grouping of items linked or deployed to a smart contract on a network supported by Phosphor. Each item within the collection is assigned a unique token ID based on a predetermined strategy
 * @module
 */

const phosphorApiKey = process.env.PHOSPHOR_API_KEY;

const phosphorApiUrl = process.env.PHOSPHOR_API_URL;

/**
 * @typedef {Object} FrozenERC721
 * @property {"FrozenERC721"} name
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy
 */

/**
 * @typedef {Object} FrozenERC1155
 * @property {"FrozenERC1155"} name
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy
 */

/**
 * @typedef {Object} FlexibleERC721
 * @property {"FlexibleERC721"} name
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy
 */

/**
 * @typedef {Object} FlexibleERC1155
 * @property {"FlexibleERC1155"} name
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy
 */

/**
 * @typedef {Object} SignatureERC721
 * @property {"SignatureERC721"} name
 * @property {"EXTERNAL"} tokenIDAssignmentStrategy
 */

/**
 * @typedef {FrozenERC721 | FrozenERC1155 | FlexibleERC721 | FlexibleERC1155 | SignatureERC721} PlatformVariant
 */

/**
 * @typedef {Object} DeploymentRequest
 * @property {number} networkId
 * @property {Object} platform
 * @property {PlatformVariant} platform.variant
 * @property {string} platform.symbol
 * @property {string} [platform.maxSupply]
 * @property {string} [platform.salt]
 * @property {string} [platform.owner]
 */

/**
 * @typedef {Object} CollectionMedia
 * @property {string} headerImageUrl
 * @property {string} thumbnailImageUrl
 */

/**
 * @typedef {Object} CreateCollectionInput
 * @property {string} name
 * @property {string} [description]
 * @property {DeploymentRequest} deploymentRequest
 * @property {string} [defaultItemTypeId]
 * @property {boolean} [editableMetadata]
 * @property {string} [externalLink]
 * @property {string} [imageUrl]
 * @property {boolean} [isPublic]
 * @property {CollectionMedia} [media]
 * @property {Object | any[] | number | string | boolean | null} [previewMetadata]
 * @property {"INSTANT" | "DELAYED"} [revealStrategy]
 */

/**
 * Creates a collection.
 * @title Create Collection with platform contract
 * @description get started with one of phosphor's platform contracts
 * @param {CreateCollectionInput} data - The data to create the collection with.
 * @returns {Promise} - A promise that resolves when the collection is created.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/create-a-collection
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections/post
 */
async function createCollection(data) {
  const {
    name,
    description,
    deploymentRequest,

    defaultItemTypeId,
    editableMetadata,
    externalLink,
    imageUrl,
    isPublic,
    media,
    previewMetadata,
    revealStrategy,
  } = data;

  const {
    networkId,
    platform: { variant, symbol, maxSupply, salt, owner },
  } = deploymentRequest;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    // Add the Phosphor API key to the headers like this
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/collections`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        description,
        media: {
          header_image_url: media?.headerImageUrl,
          thumbnail_image_url: media?.thumbnailImageUrl,
        },
        external_link: externalLink,
        deployment_request: {
          // network id that is supported by Phosphor
          network_id: networkId,
          type: "PLATFORM",
          token_id_assignment_strategy: variant.tokenIDAssignmentStrategy,
          platform: {
            variant: variant.name,
            maxSupply,
            salt,
            symbol,
            owner,
          },
        },
        is_public: isPublic,
        preview_metadata: previewMetadata,
        default_item_type_id: defaultItemTypeId,
        editable_metadata: editableMetadata,
        image_url: imageUrl,
        reveal_strategy: revealStrategy,
      }),
    });

  } catch (error) {
    console.log(error);
  }
}

/**
 * @typedef {Object} OwnContractDeploymentRequest
 * @property {number} networkId
 * @property {Array.<object | any[] | number | string | boolean | null>} abi
 * @property {string} byteCode
 * @property {Array.<object | any[] | number | string | boolean | null>} constructorArgs
 * @property {string} [salt]
 * @property {"AUTOMATIC" | "MANUAL" | "EXTERNAL" | null} [tokenIDAssignmentStrategy]
 */


/**
 * @typedef {Object} CreateCollectionWithOwnContractInput
 * @property {string} name
 * @property {string} [description]
 * @property {OwnContractDeploymentRequest} deploymentRequest
 * @property {string} [defaultItemTypeId]
 * @property {boolean} [editableMetadata]
 * @property {string} [externalLink]
 * @property {string} [imageUrl]
 * @property {boolean} [isPublic]
 * @property {CollectionMedia} [media]
 * @property {Object | any[] | number | string | boolean | null} [previewMetadata]
 * @property {"INSTANT" | "DELAYED"} [revealStrategy]
 */

/**
 * @title Create a new collection with a custom contract (BYOC)
 *
 * @description Use your own smart contract to create a new collection (with restrictions)
 *
 * @param {CreateCollectionWithOwnContractInput} data - The data to create the collection with.
 * @returns {Promise} - A promise that resolves when the collection is created.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections#restrictions
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections/post
 */
async function createCollectionWithOwnContract(data) {
  const {
    name,
    description,
    deploymentRequest,

    defaultItemTypeId,
    editableMetadata,
    externalLink,
    imageUrl,
    isPublic,
    media,
    previewMetadata,
    revealStrategy,
  } = data;

  const { networkId, abi, byteCode, constructorArgs, salt, tokenIDAssignmentStrategy } = deploymentRequest;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    // Add the Phosphor API key to the headers like this
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(
      "https://admin-api.consensys-nft.com/v1/collections",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          description,
          media: {
            header_image_url: media?.headerImageUrl,
            thumbnail_image_url: media?.thumbnailImageUrl,
          },
          external_link: externalLink,
          deployment_request: {
            network_id: networkId,
            type: "CUSTOM",
            token_id_assignment_strategy: tokenIDAssignmentStrategy,
            custom: {
              abi,
              bytecode: byteCode,
              constructor_args: constructorArgs,
              salt,
            },
          },
          is_public: isPublic,
          preview_metadata: previewMetadata,
          default_item_type_id: defaultItemTypeId,
          editable_metadata: editableMetadata,
          image_url: imageUrl,
          reveal_strategy: revealStrategy,
        }),
      }
    );

  } catch (error) {
    console.log(error);
  }
}



/**
 * @typedef {Object} ExternalContractDeploymentRequest
 * @property {number} networkId
 * @property {string} address
 * @property {string} byteCode
 * @property {Record<string, object | any[] | number | string | boolean | null>}  tokenFilter
 * @property {string} [salt]
 * @property {"ERC721" | "ERC1155"} tokenType
 * @property {"AUTOMATIC" | "MANUAL" | "EXTERNAL" | null} [tokenIDAssignmentStrategy]
 */


/**
 * @typedef {Object} CreateCollectionWithExternalContractInput
 * @property {string} name
 * @property {string} [description]
 * @property {ExternalContractDeploymentRequest} deploymentRequest
 * @property {string} [defaultItemTypeId]
 * @property {boolean} [editableMetadata]
 * @property {string} [externalLink]
 * @property {string} [imageUrl]
 * @property {boolean} [isPublic]
 * @property {CollectionMedia} [media]
 * @property {Object | any[] | number | string | boolean | null} [previewMetadata]
 * @property {"INSTANT" | "DELAYED"} [revealStrategy]
 */

/**
 * @title Create a new collection with a External contract
 *
 * @description Use an external smart contract to create a new collection (with restrictions)
 *
 * @param {CreateCollectionWithExternalContractInput} data - The data to create the collection with.
 * @returns {Promise} - A promise that resolves when the collection is created.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections#restrictions
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections/post
 */
async function createCollectionWithExternalContract(data) {
  const {
    name,
    description,
    deploymentRequest,

    defaultItemTypeId,
    editableMetadata,
    externalLink,
    imageUrl,
    isPublic,
    media,
    previewMetadata,
    revealStrategy,
  } = data;

  const { networkId, address, tokenFilter, tokenType, salt, tokenIDAssignmentStrategy} =
    deploymentRequest;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    // Add the Phosphor API key to the headers like this
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    const response = await fetch(
      "https://admin-api.consensys-nft.com/v1/collections",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          description,
          media: {
            header_image_url: media?.headerImageUrl,
            thumbnail_image_url: media?.thumbnailImageUrl,
          },
          external_link: externalLink,
          deployment_request: {
            network_id: networkId,
            type: "EXTERNAL",
            token_id_assignment_strategy: tokenIDAssignmentStrategy,
            external: {
              address,
              token_filter: tokenFilter,
              token_type: tokenType,
              salt,
            },
          },
          is_public: isPublic,
          preview_metadata: previewMetadata,
          default_item_type_id: defaultItemTypeId,
          editable_metadata: editableMetadata,
          image_url: imageUrl,
          reveal_strategy: revealStrategy,
        }),
      }
    );

    console.log("create collection", response);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  createCollection,
  createCollectionWithOwnContract,
  createCollectionWithExternalContract,
};
