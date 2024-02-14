/* @module
 * @title Create Collection
 * @description Collections bind unique items into smart contracts on supported networks.
 * @docs {@link https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections}
 * @api {@link https://docs.consensys-nft.com/latest-admin-api#tag/Collection}
 * @author Chinthaka Weerakkody
 * @version v1
 * @packageDocumentation
 */

export type FrozenERC721 = {
  name: "FrozenERC721";
  tokenIDAssignmentStrategy: "AUTOMATIC";
};

export type FrozenERC1155 = {
  name: "FrozenERC1155";
  tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};

export type FlexibleERC721 = {
  name: "FlexibleERC721";
  tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};

export type FlexibleERC1155 = {
  name: "FlexibleERC1155";
  tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};

export type SignatureERC721 = {
  name: "SignatureERC721";
  tokenIDAssignmentStrategy: "EXTERNAL";
};

export type PlatformVariant =
  | FrozenERC721
  | FrozenERC1155
  | FlexibleERC721
  | FlexibleERC1155
  | SignatureERC721;

export type CreateCollectionInput = {
  name: string;
  description: string;
  owner: string;
  thumbnailImageUrl: string;
  networkId: number;
  symbol: string;
  variant: PlatformVariant;
  metadata: string;
};


/**
 * @title Create a new collection
 * 
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export async function createCollection(data: CreateCollectionInput){
  const {
    name,
    symbol,
    description,
    owner,
    networkId,
    thumbnailImageUrl,
    variant,
    metadata,
  } = data;

  const { name: variantName, tokenIDAssignmentStrategy } = variant;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", "fe453756351e4114b45d4c1b77b22b45");

    const response = await fetch(
      "https://admin-api.consensys-nft.com/v1/collections",
      {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify({
          name,
          description,
          media: {
            thumbnail_image_url: thumbnailImageUrl,
          },
          external_link: metadata,
          deployment_request: {
            network_id: 5,
            type: "PLATFORM",
            token_id_assignment_strategy: tokenIDAssignmentStrategy,
            platform: {
              variant: variantName,
              symbol,
              owner,
            },
          },
        }),
      }
    );

    console.log("create collection", response);
    if (response.ok) {

    }
  } catch (error) {
    console.log(error);
  }
};



/**
 * @title Create a new collection with own contract (BYOC)
 * 
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export async function createCollectionWithOwnContract() {

}