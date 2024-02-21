import { HardhatRuntimeEnvironment } from "hardhat/types";
export type CollectionMedia = {
    headerImageUrl: string;
    thumbnailImageUrl: string;
};
export type CreateCollectionWithOwnContractInput = {
    name: string;
    description?: string;
    networkId: number;
    constructorArgs: Array<object | any[] | number | string | boolean | null>;
    salt?: string;
    tokenIDAssignmentStrategy?: "AUTOMATIC" | "MANUAL" | "EXTERNAL" | null;
    defaultItemTypeId?: string;
    editableMetadata?: boolean;
    externalLink?: string;
    imageUrl?: string;
    isPublic?: boolean;
    media?: CollectionMedia;
    previewMetadata?: any | any[] | number | string | boolean | null;
    revealStrategy?: "INSTANT" | "DELAYED";
};
export declare class HardhatPhosphor {
    private hre;
    private phosphorEndpoint;
    private phosphorApiKey;
    constructor(hre: HardhatRuntimeEnvironment, phosphorEndpoint: string, phosphorApiKey: string);
    private makeApiRequest;
    deploy(contractName: string, args: CreateCollectionWithOwnContractInput): Promise<any>;
    getDeploymentStatus(collectionId: string): Promise<any>;
}
