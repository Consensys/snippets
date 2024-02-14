/* @module
 * @title Create Item
 * @description An NFT for Phosphor Platform created with a set of attributes in a NOT_MINTED state
 * @api {@link https://docs.phosphor.xyz/latest-admin-api#tag/Item}
 * @author Chinthaka Weerakkody
 * @version v1
 * @packageDocumentation
 */

/**
 * @title Create an item attached to a collection
 * 
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export async function createItem(data) {
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
