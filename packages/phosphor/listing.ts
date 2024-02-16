/* @module
 * @title Listing
 * @description Collections bind unique items into smart contracts on supported networks.
 * @docs {@link https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections}
 * @api {@link https://docs.consensys-nft.com/latest-admin-api#tag/Collection}
 * @author Chinthaka Weerakkody
 * @version v1
 * @packageDocumentation
 */

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
  paymentProviders:
    | "STRIPE"
    | "COINBASE"
    | "MINT_VOUCHER"
    | "EMAIL_CLAIM"
    | "BETA_FREE_MINT";
  policy: ListingPolicy;
  price: string;
  quentityListed: number | null;
  settlementCurrency: Record<string, "USD" | "ETH" | "ERC20" | "EUR"> | null;
  startTime?: string;
  tokenIds: string[] | null;
  tokenRanges:
    | {
        fromId: string;
        toId: string;
      }[]
    | null;
};

const phosphorApiKey = process.env.PHOSPHOR_API_KEY;

const phosphorApiUrl = process.env.PHOSPHOR_API_URL;

/**
 * @title Create a listing
 *
 * @description Initiates the creation of a new collection based on provided data.
 * The function asynchronously interacts with a backend service, requesting
 * the creation of a collection. Upon success, the collection is registered
 * in the specified blockchain network with the provided attributes.
 *
 */
export async function createListing(data: CreateListingInput) {
  const {
    campaignId,
    collectionId,
    currency,
    endTime,
    itemId,
    itemIds,
    maxQuantityPerTx,
    paymentProviders,
    policy: {
      emailAddresses,
      emailClaimDuration,
      ethAddresses,
      itemAssignmentStrategy,
      maxPerUser,
      paymentSessionDuration,
      snapshotId,
      txPayer,
      type,
    },
    price,
    quentityListed,
    settlementCurrency,
    startTime,
    tokenIds,
    tokenRanges,
  } = data;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    // Add the Phosphor API key to the headers like this
    headers.append("Phosphor-Api-Key", phosphorApiKey);

    const response = await fetch(`${phosphorApiUrl}/v1/listings`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        campaign_id: campaignId,
        collection_id: collectionId,
        currency,
        end_time: endTime,
        item_id: itemId,
        item_ids: itemIds,
        max_quantity_per_tx: maxQuantityPerTx,
        payment_providers: paymentProviders,
        policy: {
          email_addresses: emailAddresses,
          email_claim_duration: emailClaimDuration,
          eth_addresses: ethAddresses,
          item_assignment_strategy: itemAssignmentStrategy,
          max_per_user: maxPerUser,
          payment_session_duration: paymentSessionDuration
            ? {
                provider_override: paymentSessionDuration.providerOverride,
                timeout_seconds: paymentSessionDuration.timeoutSeconds,
              }
            : null,
          snapshot_id: snapshotId,
          tx_payer: txPayer,
          type,
          price,
          quentity_listed: quentityListed,
          settlement_currency: settlementCurrency,
          start_time: startTime,
          token_Ids: tokenIds,
          token_ranges: tokenRanges?.map((range) => ({
            from_id: range.fromId,
            to_id: range.toId,
          })),
        },
      }),
    });

    console.log("create collection", response);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
}
