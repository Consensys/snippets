/* @module
 * @title Update Collection
 * @description Collections bind unique items into smart contracts on supported networks.
 * @docs {@link https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections}
 * @api {@link https://docs.consensys-nft.com/latest-admin-api#tag/Collection}
 * @author Chinthaka Weerakkody
 * @version v1
 * @packageDocumentation
 */


/**
 * @title Update a existing collection
 * 
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export async function updateCollection(collectionId: string): Promise<void> {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", "fe453756351e4114b45d4c1b77b22b45");

    const response = await fetch(
      "https://admin-api.consensys-nft.com/v1/collections",
      {
        method: "PUT",
        headers,
        redirect: "follow",
        // body: JSON.stringify({
        //   name,
        //   description,
        //   media: {
        //     thumbnail_image_url: thumbnailImageUrl,
        //   },
        //   external_link: metadata,
        //   deployment_request: {
        //     network_id: 5,
        //     type: "PLATFORM",
        //     token_id_assignment_strategy: tokenIDAssignmentStrategy,
        //     platform: {
        //       variant: variantName,
        //       symbol,
        //       owner,
        //     },
        //   },
        // }),
      }
    );

    console.log("create collection", response);
    if (response.ok) {

    }
  } catch (error) {
    console.log(error);
  }
};
