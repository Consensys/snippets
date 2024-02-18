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
/**
 * @typedef {Object} FrozenERC721
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */
/**
 * @typedef {Object} FrozenERC1155
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */
/**
 * @typedef {Object} FlexibleERC721
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */
/**
 * @typedef {Object} FlexibleERC1155
 * @property {string} name - The name of the token.
 * @property {"AUTOMATIC" | "MANUAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */
/**
 * @typedef {Object} SignatureERC721
 * @property {string} name - The name of the token.
 * @property {"EXTERNAL"} tokenIDAssignmentStrategy - The token ID assignment strategy.
 */
/**
 * @typedef {FrozenERC721 | FrozenERC1155 | FlexibleERC721 | FlexibleERC1155 | SignatureERC721} PlatformVariant
 */
/**
 * @typedef {Object} DeploymentRequest
 * @property {number} networkId - The network ID.
 * @property {Object} platform - The platform.
 * @property {PlatformVariant} platform.variant - The platform variant.
 * @property {string} platform.symbol - The platform symbol.
 * @property {string} [platform.maxSupply] - The maximum supply.
 * @property {string} [platform.salt] - The salt.
 * @property {string} [platform.owner] - The owner.
 */
/**
 * @typedef {Object} CollectionMedia
 * @property {string} headerImageUrl - The header image URL.
 * @property {string} thumbnailImageUrl - The thumbnail image URL.
 */
/**
 * @typedef {Object} CreateCollectionInput
 * @property {string} name - The name.
 * @property {string} [description] - The description.
 * @property {DeploymentRequest} deploymentRequest - The deployment request.
 * @property {string} [defaultItemTypeId] - The default item type ID.
 * @property {boolean} [editableMetadata] - Whether the metadata is editable.
 * @property {string} externalLink - The external link.
 * @property {string} [imageUrl] - The image URL.
 * @property {boolean} [isPublic] - Whether the collection is public.
 * @property {CollectionMedia} [media] - The media.
 * @property {Object | any[] | number | string | boolean | null} [previewMetadata] - The preview metadata.
 * @property {"INSTANT" | "DELAYED"} [revealStrategy] - The reveal strategy.
 */
/**
 * Creates a collection.
 * @title Create Collection with platform contract
 * @param {CreateCollectionInput} data - The data to create the collection with.
 * @returns {Promise} - A promise that resolves when the collection is created.
 * @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/create-a-collection
 * @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections/post
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
/**
 * @title Create Collection with external contract
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export function createCollectionWithExternalContract(data: any): Promise<void>;
