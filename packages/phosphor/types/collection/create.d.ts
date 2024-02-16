/**
* Creates a collection.
*
* @param {CreateCollectionInput} data - The data to create the collection with.
* @returns {Promise} - A promise that resolves when the collection is created.
*/
export function createCollection(data: CreateCollectionInput): Promise<any>;
/**
 * @title Create a new collection with a custom contract (BYOC)
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export function createCollectionWithOwnContract(data: any): Promise<void>;
export function createCollectionWithExternalContract(data: any): Promise<void>;
export type FrozenERC721 = {
    /**
     * - The name of the token.
     */
    name: string;
    /**
     * - The token ID assignment strategy.
     */
    tokenIDAssignmentStrategy: "AUTOMATIC";
};
export type FrozenERC1155 = {
    /**
     * - The name of the token.
     */
    name: string;
    /**
     * - The token ID assignment strategy.
     */
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC721 = {
    /**
     * - The name of the token.
     */
    name: string;
    /**
     * - The token ID assignment strategy.
     */
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC1155 = {
    /**
     * - The name of the token.
     */
    name: string;
    /**
     * - The token ID assignment strategy.
     */
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type SignatureERC721 = {
    /**
     * - The name of the token.
     */
    name: string;
    /**
     * - The token ID assignment strategy.
     */
    tokenIDAssignmentStrategy: "EXTERNAL";
};
export type PlatformVariant = FrozenERC721 | FrozenERC1155 | FlexibleERC721 | FlexibleERC1155 | SignatureERC721;
export type DeploymentRequest = {
    /**
     * - The network ID.
     */
    networkId: number;
    /**
     * - The platform.
     */
    platform: {
        variant: PlatformVariant;
        symbol: string;
        maxSupply?: string;
        salt?: string;
        owner?: string;
    };
};
export type CollectionMedia = {
    /**
     * - The header image URL.
     */
    headerImageUrl: string;
    /**
     * - The thumbnail image URL.
     */
    thumbnailImageUrl: string;
};
export type CreateCollectionInput = {
    /**
     * - The name.
     */
    name: string;
    /**
     * - The description.
     */
    description?: string;
    /**
     * - The deployment request.
     */
    deploymentRequest: DeploymentRequest;
    /**
     * - The default item type ID.
     */
    defaultItemTypeId?: string;
    /**
     * - Whether the metadata is editable.
     */
    editableMetadata?: boolean;
    /**
     * - The external link.
     */
    externalLink: string;
    /**
     * - The image URL.
     */
    imageUrl?: string;
    /**
     * - Whether the collection is public.
     */
    isPublic?: boolean;
    /**
     * - The media.
     */
    media?: CollectionMedia;
    /**
     * - The preview metadata.
     */
    previewMetadata?: any | any[] | number | string | boolean | null;
    /**
     * - The reveal strategy.
     */
    revealStrategy?: "INSTANT" | "DELAYED";
};
