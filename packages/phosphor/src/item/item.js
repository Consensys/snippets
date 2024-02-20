/**
 * Item
 * @title Item
 * @description I an NFT for Phosphor Platform, created with a set of attributes in a NOT_MINTED state. The platform generates the item's metadata from these attributes automatically and pin it on IPFS
 * @module
 */

const phosphorApiKey =
  process.env.PHOSPHOR_API_KEY || "d7e0696ff49f4ca8ba5d585bfe46f71b";

const phosphorApiUrl =
  process.env.PHOSPHOR_API_URL || "https://admin-api.consensys-nft.com";

/**
 * @typedef {Object} Attributes
 * @property {string} title - The title of the item.
 * @property {string} [description] - The description of the item.
 * @property {string} [image_url] - optional image.
 * @property {Record<string, object | any[] | number | string | boolean | null>} [otherAttributes] - The other attributes of the item.
 */

/**
 * @typedef {Object} CreateItemInput
 * @property {string} collectionId - The ID of the collection.
 * @property {Attributes} attributes - The attributes of the item.
 * @property {string} [itemTypeId] - The ID of the item type.
 */

/**
 * @title Create a Item
 *
 * @description Initiates the creation of a new item based on provided data.
 *
 * @param {CreateItemInput} data - The data to create the item.
 * @returns {Promise} A promise that resolves to the created item.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/create-a-collection
 * @api  https://docs.consensys-nft.com/platform-features/digital-asset-creation/items/create-an-item
 */
async function createItem(data) {
  const { collectionId, attributes, itemTypeId } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/items`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        collection_id: collectionId,
        attributes: {
          title: attributes.title,
          description: attributes.description,
          image_url: attributes.image_url,
          ...attributes.otherAttributes,
        },
        item_type_id: itemTypeId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @typedef {Object} ItemRoyaltyInfo
 * @property {number} amount_bps - The amount in basis points.
 * @property {string} receiver - The receiver of the royalty.
 */

/**
 * @typedef {Object} EditableItem
 * @property {string} itemId - The ID of the item.
 * @property {Attributes} [attributes] - The attributes of the item.
 * @property {string} [itemTypeId] - The ID of the item type.
 * @property {ItemRoyaltyInfo} [royaltyInfo] - The royalty information of the item.
 */

// /**
//  * @typedef {Object} EditItemMetadataInput
//  * @property {Object[]} items - The items to edit.
//  * @property {string} items[].itemId - The ID of the collection.
//  * @property {Attributes} [items[].attributes] - The attributes of the item.
//  * @property {string} [items[].itemTypeId] - The ID of the item type.
//  * @property {ItemRoyaltyInfo} [items[].royaltyInfo] - The royalty information of the item.
//  */

// /**
//  * @function editItemMetadata
//  * @param {EditItemMetadataInput} data - The data to create the item.
//  * @returns {Promise} A promise that resolves to the created item.
//  */
// export async function editItemMetadata(data) {
//   const { items } = data;

//   try {
//     const headers = new Headers();

//     headers.append("Content-Type", "application/json");
//     headers.append("Phosphor-Api-Key", phosphorApiKey);

//     return fetch(`${phosphorApiUrl}/v1/items/bulk`, {
//       method: "PATCH",
//       headers,
//       redirect: "follow",
//       body: JSON.stringify({
//         items: items.map((item) => ({
//           item_id: item.itemId,
//           attributes: item.attributes,
//           item_type_id: item.itemTypeId,
//           royalty_info: item.royaltyInfo,
//         }))
//       }),
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }

// /**
//  * @title Edit Item
//  *
//  * @description Specified attributes will replace all existing ones and must comply with the item type schema. Once an item is minted, its attributes can't be updated unless the collection allows metadata editing
//  */
// async function editItem(data) {
//   const { itemId, attributes, itemTypeId, royaltyInfo } = data;

//   try {
//     const headers = new Headers();

//     headers.append("Content-Type", "application/json");
//     headers.append("Phosphor-Api-Key", phosphorApiKey);

//     return await fetch(`${phosphorApiUrl}/v1/items/${itemId}`, {
//       method: "PATCH",
//       headers,
//       body: JSON.stringify({
//         attributes,
//         item_type_id: itemTypeId,
//         royalty_info: royaltyInfo,
//       }),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

/**
 * @typedef {Object} LockItemsInput
 * @property {string} [itemId] - The ID of a single item to lock.
 * @property {string[]} [itemIds] - The IDs of multiple items to lock.
 * @property {string} [collectionId] - The ID of a collection. All remaining unlocked items in this collection will be locked.
 * @property {string} [maxSupply] - The maximum supply for the item. For ERC721's, it should always be 1. For ERC1155's, it should be greater than 0.
 * @property {string} [tokenId] - The token ID. This can only be done for a single item and if the token assignment strategy of the collection is set to MANUAL.
 */

/**
 * @title Lock Items
 *
 * @description Locks items based on their IDs or a collection ID.
 * @param {LockItemsInput} data - The data to lock the items.
 * 
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/items/locking
 * @api  https://docs.consensys-nft.com/latest-admin-api#tag/Item/paths/~1v1~1items~1bulk/post
 */
async function lockItems(data) {
  const { itemId, itemIds, collectionId, maxSupply, tokenId } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/items/lock`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        item_id: itemId,
        item_ids: itemIds,
        collection_id: collectionId,
        max_supply: maxSupply,
        token_id: tokenId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @typedef {Object} MintItemsInput
 * @property {string} [itemId] - The ID of a single item to mint.
 * @property {string[]} [itemIds] - The IDs of multiple items to mint.
 * @property {string} [collectionId] - The ID of a collection. All locked and un-minted items in this collection will be minted.
 * @property {string[]} [tokenIds] - The token IDs of the items to mint.
 * @property {Object[]} [tokenRanges] - The token ranges of the items to mint.
 * @property {string} [quantity] - The quantity of the item to mint.
 * @property {string[]} [quantities] - The quantities of the items to mint.
 * @property {string} toAddress - The address that will receive the newly minted items.
 * @property {string[]} [toAddresses] - The addresses that will receive the newly minted items.
 */

/**
 * @title Mint Items
 *
 * @description Requests the minting of one or more items.
 * @param {MintItemsInput} data - The data to mint the items.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-distribution/mint-requests/create-mint-requests
 * @api  https://docs.consensys-nft.com/latest-admin-api#tag/Item/paths/~1v1~1mint-requests/post
 */
async function mintItems(data) {
  const {
    itemId,
    itemIds,
    collectionId,
    tokenIds,
    tokenRanges,
    quantity,
    quantities,
    toAddress,
    toAddresses,
  } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return await fetch(`${phosphorApiUrl}/v1/mint-requests`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        item_id: itemId,
        item_ids: itemIds,
        collection_id: collectionId,
        token_ids: tokenIds,
        token_ranges: tokenRanges,
        quantity: quantity,
        quantities: quantities,
        to_address: toAddress,
        to_addresses: toAddresses,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @title Check mint request
 *
 * @description Check the status of a mint request
 * @param {string} mintRequestId - Id of the mint request
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-distribution/mint-requests/get-mint-requests
 * @api  https://docs.consensys-nft.com/latest-admin-api#tag/Item/paths/~1v1~1mint-requests~1%7Bid%7D/get
 */
async function checkMintRequest(mintRequestId) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/mint-requests/${mintRequestId}`, {
      method: "GET",
      headers,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @title Delete a single item
 *
 * @description Delete items that are not minted or not being minted
 * @param {string} itemId - Id of the item
 * 
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/items/delete-an-item
 * @api  https://docs.consensys-nft.com/latest-admin-api#tag/Item/paths/~1v1~1items~1lock/post
 */
async function deleteItem(itemId) {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    return fetch(`${phosphorApiUrl}/v1/items/${itemId}`, {
      method: "DELETE",
      headers,
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  createItem,
  //editItem,
  lockItems,
  mintItems,
  checkMintRequest,
  deleteItem,
};
