export type FrozenERC721 = {
    name: "FrozenERC721";
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FrozenERC1155 = {
    name: "FrozenERC1155";
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC721 = {
    name: "FlexibleERC721";
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type FlexibleERC1155 = {
    name: "FlexibleERC1155";
    tokenIDAssignmentStrategy: "AUTOMATIC" | "MANUAL";
};
export type SignatureERC721 = {
    name: "SignatureERC721";
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
    externalLink?: string;
    imageUrl?: string;
    isPublic?: boolean;
    media?: CollectionMedia;
    previewMetadata?: any | any[] | number | string | boolean | null;
    revealStrategy?: "INSTANT" | "DELAYED";
};
export type OwnContractDeploymentRequest = {
    networkId: number;
    abi: Array<object | any[] | number | string | boolean | null>;
    byteCode: string;
    constructorArgs: Array<object | any[] | number | string | boolean | null>;
    salt?: string;
    tokenIDAssignmentStrategy?: "AUTOMATIC" | "MANUAL" | "EXTERNAL" | null;
};
export type CreateCollectionWithOwnContractInput = {
    name: string;
    description?: string;
    deploymentRequest: OwnContractDeploymentRequest;
    defaultItemTypeId?: string;
    editableMetadata?: boolean;
    externalLink?: string;
    imageUrl?: string;
    isPublic?: boolean;
    media?: CollectionMedia;
    previewMetadata?: any | any[] | number | string | boolean | null;
    revealStrategy?: "INSTANT" | "DELAYED";
};
export type ExternalContractDeploymentRequest = {
    networkId: number;
    address: string;
    byteCode: string;
    tokenFilter: Record<string, object | any[] | number | string | boolean | null>;
    salt?: string;
    tokenType: "ERC721" | "ERC1155";
    tokenIDAssignmentStrategy?: "AUTOMATIC" | "MANUAL" | "EXTERNAL" | null;
};
export type CreateCollectionWithExternalContractInput = {
    name: string;
    description?: string;
    deploymentRequest: ExternalContractDeploymentRequest;
    defaultItemTypeId?: string;
    editableMetadata?: boolean;
    externalLink?: string;
    imageUrl?: string;
    isPublic?: boolean;
    media?: CollectionMedia;
    previewMetadata?: any | any[] | number | string | boolean | null;
    revealStrategy?: "INSTANT" | "DELAYED";
};
export function createCollection(data: CreateCollectionInput): Promise<any>;
export function createCollectionWithOwnContract(data: CreateCollectionWithOwnContractInput): Promise<any>;
export function createCollectionWithExternalContract(data: CreateCollectionWithExternalContractInput): Promise<any>;
