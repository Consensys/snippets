export type Attributes = {
    title: string;
    description?: string;
    image_url?: string;
    otherAttributes?: Record<string, object | any[] | number | string | boolean | null>;
};
export type CreateItemInput = {
    collectionId: string;
    attributes: Attributes;
    itemTypeId?: string;
};
export type ItemRoyaltyInfo = {
    amount_bps: number;
    receiver: string;
};
export type EditableItem = {
    itemId: string;
    attributes?: Attributes;
    itemTypeId?: string;
    royaltyInfo?: ItemRoyaltyInfo;
};
export type LockItemsInput = {
    itemId?: string;
    itemIds?: string[];
    collectionId?: string;
    maxSupply?: string;
    tokenId?: string;
};
export type MintItemsInput = {
    itemId?: string;
    itemIds?: string[];
    collectionId?: string;
    tokenIds?: string[];
    tokenRanges?: any[];
    quantity?: string;
    quantities?: string[];
    toAddress: string;
    toAddresses?: string[];
};
export function createItem(data: CreateItemInput): Promise<any>;
export function lockItems(data: LockItemsInput): Promise<Response>;
export function mintItems(data: MintItemsInput): Promise<Response>;
export function checkMintRequest(mintRequestId: string): Promise<Response>;
export function deleteItem(itemId: string): Promise<Response>;
