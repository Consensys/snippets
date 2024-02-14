export type FrozenERC721 = {
  name: "FrozenERC721";
  tokenIDAssignmentStrategy: "AUTOMATIC";
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

export type PlatformVariant =
  | FrozenERC721
  | FrozenERC1155
  | FlexibleERC721
  | FlexibleERC1155
  | SignatureERC721;

export type CreateCollectionInput = {
  name: string;
  description: string;
  owner: string;
  thumbnailImageUrl: string;
  networkId: number;
  symbol: string;
  variant: PlatformVariant;
  metadata: string;
};

export {};