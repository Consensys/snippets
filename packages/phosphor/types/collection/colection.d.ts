export type FrozenERC721 = {
    name: string;
    tokenIDAssignmentStrategy: "AUTOMATIC";
};
export type FrozenERC1155 = {
    name: string;
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC721 = {
    name: string;
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC1155 = {
    name: string;
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type SignatureERC721 = {
    name: string;
    tokenIDAssignmentStrategy: "EXTERNAL";
};
export type PlatformVariant = FrozenERC721 | FrozenERC1155 | FlexibleERC721 | FlexibleERC1155 | SignatureERC721;
export type DeploymentRequest = {
    networkId: number;
    platform: {
        variant: PlatformVariant;
        symbol: string;
        maxSupply?: string;
        salt?: string;
        owner?: string;
    };
};
export type CollectionMedia = {
    headerImageUrl: string;
    thumbnailImageUrl: string;
};
export type CreateCollectionInput = {
    name: string;
    description?: string;
    deploymentRequest: DeploymentRequest;
    defaultItemTypeId?: string;
    editableMetadata?: boolean;
    externalLink: string;
    imageUrl?: string;
    isPublic?: boolean;
    media?: CollectionMedia;
    previewMetadata?: any | any[] | number | string | boolean | null;
    revealStrategy?: "INSTANT" | "DELAYED";
};
export function createCollection(data: CreateCollectionInput): Promise<any>;
export function createCollectionWithOwnContract(data: any): Promise<void>;
export function createCollectionWithExternalContract(data: any): Promise<void>;
