/**
 * Item
 * @title Item
 * @docs ADO MOKO ME
 * @module
 */


const phosphorApiKey = process.env.PHOSPHOR_API_KEY;

const phosphorApiUrl = process.env.PHOSPHOR_API_URL;

/**
 * @typedef {Object} CreateItemInput
 * @property {string} collectionId - The ID of the collection.
 * @property {Record<string, object | any[] | number | string | boolean | null>} attributes - The attributes of the item.
 * @property {string} itemTypeId - The ID of the item type.
 */

/**
 * @function createItem
 * @param {CreateItemInput} data - The data to create the item.
 * @returns {Promise} A promise that resolves to the created item.
 */
export async function createItem(data) {
  const { collectionId, attributes, itemTypeId } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    const response = await fetch(`${phosphorApiUrl}/v1/collections`, {
      method: "POST",
      headers,
      redirect: "follow",
      body: JSON.stringify({
        collection_id: collectionId,
        attributes,
        item_type_id: itemTypeId,
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
 * @typedef {Object} ItemRoyaltyInfo
 * @property {number} amount_bps - The amount in basis points.
 * @property {string} receiver - The receiver of the royalty.
 */

/**
 * @typedef {Object} EditableItem
 * @property {string} itemId - The ID of the item.
 * @property {Record<string, object | any[] | number | string | boolean | null>} attributes - The attributes of the item.
 * @property {string} itemTypeId - The ID of the item type.
 * @property {ItemRoyaltyInfo} [royaltyInfo] - The royalty information of the item.
 */

/**
 * @typedef {Object} EditItemMetadataInput
 * @property {EditableItem[]} items - The items to edit.
 */


/**
 * @function editItemMetadata
 * @param {EditItemMetadataInput} data - The data to create the item.
 * @returns {Promise} A promise that resolves to the created item.
 */
export async function editItemMetadata(data) {
  const { items } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    const response = await fetch(`${phosphorApiUrl}/v1/collections`, {
      method: "POST",
      headers,
      redirect: "follow",
      body: JSON.stringify({
        items,
      }),
    });

    console.log("create collection", response);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
}

// /**
//  * @title Edit Item
//  *
//  * @description Initiates the creation of a new collection based on provided data.
//  * The function asynchronously interacts with a backend service, requesting
//  * the creation of a collection. Upon success, the collection is registered
//  * in the specified blockchain network with the provided attributes.
//  *
//  */
// export async function editItem(id: string, data: EditableItem) {
//   const { attributes, itemTypeId, royaltyInfo } = data;

//   try {
//     const headers = new Headers();

//     headers.append("Content-Type", "application/json");
//     headers.append("Phosphor-Api-Key", phosphorApiKey);

//     const response = await fetch(`${phosphorApiUrl}/v1/items${id}`, {
//       method: "PUT",
//       headers,
//       redirect: "follow",
//       body: JSON.stringify({
//         attributes,
//         item_type_id: itemTypeId,
//         royalty_info: royaltyInfo,
//       }),
//     });

//     console.log("create collection", response);
//     if (response.ok) {
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
