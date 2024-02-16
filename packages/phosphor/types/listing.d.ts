interface PaymentSessionDuration {
    providerOverride: object | null;
    timeoutSeconds: number | null;
}
export type ListingPolicy = {
    emailAddresses: string[] | null;
    emailClaimDuration: number | null;
    ethAddresses: string[] | null;
    itemAssignmentStrategy: "AUTOMATIC" | "RANDOM" | null;
    maxPerUser: number | null;
    paymentSessionDuration: PaymentSessionDuration | null;
    snapshotId: string | null;
    txPayer: "BUYER" | "SELLER" | null;
    type: "ALLOW_LIST" | "FCFS" | "LARGE_ALLOW_LIST" | null;
};
export type CreateListingInput = {
    campaignId?: string;
    collectionId?: string;
    currency: "USD" | "ETH" | "ERC20" | "EUR";
    endTime?: string;
    itemId?: string;
    itemIds?: string[];
    maxQuantityPerTx: number;
    paymentProviders: "STRIPE" | "COINBASE" | "MINT_VOUCHER" | "EMAIL_CLAIM" | "BETA_FREE_MINT";
    policy: ListingPolicy;
    price: string;
    quentityListed: number | null;
    settlementCurrency: Record<string, "USD" | "ETH" | "ERC20" | "EUR"> | null;
    startTime?: string;
    tokenIds: string[] | null;
    tokenRanges: {
        fromId: string;
        toId: string;
    }[] | null;
};
/**
 * @title Create a listing
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export declare function createListing(data: CreateListingInput): Promise<void>;
export {};
