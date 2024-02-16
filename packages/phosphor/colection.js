/**
 * Collection
 * @title Collection
 * @description Unique grouping of items linked or deployed to a smart contract on a network supported by Phosphor
 * @docs ADO MOKO ME
 * @module
 */

const phosphorApiKey = process.env.PHOSPHOR_API_KEY;

const phosphorApiUrl = process.env.PHOSPHOR_API_URL;

/**
 * @typedef {Object} FrozenERC721
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */

/**
 * @typedef {Object} FrozenERC1155
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */

/**
 * @typedef {Object} FlexibleERC721
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */

/**
 * @typedef {Object} FlexibleERC1155
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */

/**
 * @typedef {Object} SignatureERC721
 * @property {string} name - The name of the token.
 * @property {"EXTERNAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */

/**
 * @typedef {FrozenERC721 | FrozenERC1155 | FlexibleERC721 | FlexibleERC1155 | SignatureERC721} PlatformVariant
 */

/**
 * @typedef {Object} DeploymentRequest
 * @property {number} networkId - The network ID.
 * @property {Object} platform - The platform.
 * @property {PlatformVariant} platform.variant - The platform variant.
 * @property {string} platform.symbol - The platform symbol.
 * @property {string} [platform.maxSupply] - The maximum supply.
 * @property {string} [platform.salt] - The salt.
 * @property {string} [platform.owner] - The owner.
 */

/**
 * @typedef {Object} CollectionMedia
 * @property {string} headerImageUrl - The header image URL.
 * @property {string} thumbnailImageUrl - The thumbnail image URL.
 */

/**
 * @typedef {Object} CreateCollectionInput
 * @property {string} name - The name.
 * @property {string} [description] - The description.
 * @property {DeploymentRequest} deploymentRequest - The deployment request.
 * @property {string} [defaultItemTypeId] - The default item type ID.
 * @property {boolean} [editableMetadata] - Whether the metadata is editable.
 * @property {string} externalLink - The external link.
 * @property {string} [imageUrl] - The image URL.
 * @property {boolean} [isPublic] - Whether the collection is public.
 * @property {CollectionMedia} [media] - The media.
 * @property {Object | any[] | number | string | boolean | null} [previewMetadata] - The preview metadata.
 * @property {"INSTANT" | "DELAYED"} [revealStrategy] - The reveal strategy.
 */

/**
 * Creates a collection.
 * @title Create Collection with platform contract
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

    const response = await fetch(`${phosphorApiUrl}/v1/collections`, {
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

    console.log("create collection", response);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * @title Create a new collection with a custom contract (BYOC)
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
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
    tokenIDAssignmentStrategy,
  } = data;

  const { networkId, abi, byteCode, constructorArgs, salt } = deploymentRequest;

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
            type: "CUSTOM",
            token_id_assignment_strategy: tokenIDAssignmentStrategy,
            custom: {
              abi,
              byte_code: byteCode,
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

    console.log("create collection", response);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
}

// export type DeploymentRequestExternalContract = {
//   networkId: number;
//   address: string;
//   tokenFilter: Record<string, string> | null;
//   tokenType: "ERC721" | "ERC1155";
//   salt?: string;
// };

// export type CreateExternalCollectionInput = {
//   name: string;
//   description?: string;
//   deploymentRequest: DeploymentRequestExternalContract;

//   defaultItemTypeId?: string;
//   editableMetadata?: boolean;
//   externalLink: string;
//   imageUrl?: string;
//   isPublic?: boolean;
//   media?: CollectionMedia;
//   previewMetadata?: object | any[] | number | string | boolean | null;
//   revealStrategy?: "INSTANT" | "DELAYED";
//   tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL" | "EXTERNAL" | null;
// };

/**
 * @title Create Collection with external contract
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
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
    tokenIDAssignmentStrategy,
  } = data;

  const { networkId, address, tokenFilter, tokenType, salt } =
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
