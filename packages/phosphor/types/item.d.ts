/**
 * Item
 * @title Item
 * @docs ADO MOKO ME
 * @module
 */
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
export declare function createItem(data: any): Promise<void>;
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
export declare function editItemMetadata(data: any): Promise<void>;
