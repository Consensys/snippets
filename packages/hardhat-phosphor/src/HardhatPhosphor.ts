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

export class HardhatPhosphor {
  private phosphorEndpoint: string;
  private phosphorApiKey: string;

  constructor(
    private hre: HardhatRuntimeEnvironment,
    phosphorEndpoint: string,
    phosphorApiKey: string
  ) {
    this.phosphorEndpoint = phosphorEndpoint;
    this.phosphorApiKey = phosphorApiKey;
  }

  private async makeApiRequest(
    endpoint: string,
    method: string,
    body?: object
  ) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Phosphor-Api-Key", this.phosphorApiKey);

    try {
      const response = await fetch(`${this.phosphorEndpoint}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      return await response.json();
    } catch (error) {
      console.error(`Failed to make API request to ${endpoint}:`, error);
      throw error;
    }
  }

  async deploy(
    contractName: string,
    args: CreateCollectionWithOwnContractInput
  ) {
    const {
      name,
      description,
      networkId,
      constructorArgs,
      salt,
      tokenIDAssignmentStrategy,
      defaultItemTypeId,
      editableMetadata,
      externalLink,
      imageUrl,
      isPublic,
      media,
      previewMetadata,
      revealStrategy,
    } = args;

    const abi = this.hre.artifacts.readArtifactSync(contractName).abi;
    const bytecode = this.hre.artifacts.readArtifactSync(contractName).bytecode;

    const body = {
      name,
      description,
      media: {
        header_image_url: media?.headerImageUrl,
        thumbnail_image_url: media?.thumbnailImageUrl,
      },
      external_link: externalLink,
      deployment_request: {
        network_id: networkId,
        type: "CUSTOM",
        token_id_assignment_strategy: tokenIDAssignmentStrategy,
        custom: {
          abi,
          bytecode,
          constructor_args: constructorArgs,
          salt,
        },
      },
      is_public: isPublic,
      preview_metadata: previewMetadata,
      default_item_type_id: defaultItemTypeId,
      editable_metadata: editableMetadata,
      image_url: imageUrl,
      reveal_strategy: revealStrategy,
    };

    return this.makeApiRequest("/v1/collections", "POST", body);
  }

  async getDeploymentStatus(collectionId: string) {
    return this.makeApiRequest(
      `/v1/collections/${collectionId}/deployment-request`,
      "GET"
    );
  }
}
