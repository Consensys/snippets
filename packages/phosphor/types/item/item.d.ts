export function createItem(data: CreateItemInput): Promise<any>;
export function editItemMetadata(data: EditItemMetadataInput): Promise<any>;
export type CreateItemInput = {
    collectionId: string;
    attributes: Record<string, object | any[] | number | string | boolean | null>;
    itemTypeId: string;
};
export type ItemRoyaltyInfo = {
    amount_bps: number;
    receiver: string;
};
export type EditableItem = {
    itemId: string;
    attributes: Record<string, object | any[] | number | string | boolean | null>;
    itemTypeId: string;
    royaltyInfo?: ItemRoyaltyInfo;
};
export type EditItemMetadataInput = {
    items: EditableItem[];
};
