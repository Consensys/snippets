type CreateItemInput = {
    collectionId: string;
    attributes: Record<string, object | any[] | number | string | boolean | null>;
    itemTypeId: string;
};
/**
 * @title Create a new item associated with the given collection
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export declare function createItem(data: CreateItemInput): Promise<void>;
type ItemRoyaltyInfo = {
    amount_bps: number;
    receiver: string;
};
type EditableItem = {
    itemId: string;
    attributes: Record<string, object | any[] | number | string | boolean | null>;
    itemTypeId: string;
    royaltyInfo?: ItemRoyaltyInfo;
};
type EditItemMetadataInput = {
    items: EditableItem[];
};
/**
 * @title Edit Item metadata
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export declare function editItemMetadata(data: EditItemMetadataInput): Promise<void>;
/**
 * @title Edit Item
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export declare function editItem(id: string, data: EditableItem): Promise<void>;
export {};
