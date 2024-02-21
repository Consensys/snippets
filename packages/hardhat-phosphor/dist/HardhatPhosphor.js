"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatPhosphor = void 0;
class HardhatPhosphor {
    constructor(hre, phosphorEndpoint, phosphorApiKey) {
        this.hre = hre;
        this.phosphorEndpoint = phosphorEndpoint;
        this.phosphorApiKey = phosphorApiKey;
    }
    async makeApiRequest(endpoint, method, body) {
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
        }
        catch (error) {
            console.error(`Failed to make API request to ${endpoint}:`, error);
            throw error;
        }
    }
    async deploy(contractName, args) {
        const { name, description, networkId, constructorArgs, salt, tokenIDAssignmentStrategy, defaultItemTypeId, editableMetadata, externalLink, imageUrl, isPublic, media, previewMetadata, revealStrategy, } = args;
        const abi = this.hre.artifacts.readArtifactSync(contractName).abi;
        const bytecode = this.hre.artifacts.readArtifactSync(contractName).bytecode;
        const body = {
            name,
            description,
            media: {
                header_image_url: media === null || media === void 0 ? void 0 : media.headerImageUrl,
                thumbnail_image_url: media === null || media === void 0 ? void 0 : media.thumbnailImageUrl,
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
    async getDeploymentStatus(collectionId) {
        return this.makeApiRequest(`/v1/collections/${collectionId}/deployment-request`, "GET");
    }
}
exports.HardhatPhosphor = HardhatPhosphor;
