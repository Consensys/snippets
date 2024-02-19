// /* @module
//  * @title Listing
//  * @description Collections bind unique items into smart contracts on supported networks.
//  * @docs {@link https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections}
//  * @api {@link https://docs.consensys-nft.com/latest-admin-api#tag/Collection}
//  * @author Chinthaka Weerakkody
//  * @version v1
//  * @packageDocumentation
//  */

// /**
//  * @typedef {Object} PaymentSessionDuration
//  * @property {Object|null} providerOverride
//  * @property {number|null} timeoutSeconds
//  */

// /**
//  * @typedef {Object} ListingPolicy
//  * @property {string[]|null} [emailAddresses]
//  * @property {number|null} [emailClaimDuration]
//  * @property {string[]|null} [ethAddresses]
//  * @property {"AUTOMATIC"|"RANDOM"|null} [itemAssignmentStrategy]
//  * @property {number|null} [maxPerUser]
//  * @property {PaymentSessionDuration|null} [paymentSessionDuration]
//  * @property {string|null} [snapshotId]
//  * @property {"BUYER"|"SELLER"|null} [txPayer]
//  * @property {"ALLOW_LIST"|"FCFS"|"LARGE_ALLOW_LIST"|null} [type]
//  */

// /**
//  * @typedef {Object} TokenRange
//  * @property {string} fromId
//  * @property {string} toId
//  */

// /**
//  * @typedef {Object} CreateListingInput
//  * @property {string} [campaignId]
//  * @property {string} [collectionId]
//  * @property {"USD"|"ETH"|"ERC20"|"EUR"} currency
//  * @property {string} [endTime]
//  * @property {string} [itemId]
//  * @property {string[]} [itemIds]
//  * @property {number} maxQuantityPerTx
//  * @property {("STRIPE"|"COINBASE"|"MINT_VOUCHER"|"EMAIL_CLAIM"|"BETA_FREE_MINT")[]} paymentProviders
//  * @property {ListingPolicy} policy
//  * @property {string} price
//  * @property {number|null} [quentityListed]
//  * @property {Record<string, "USD"|"ETH"|"ERC20"|"EUR">|null} [settlementCurrency]
//  * @property {string} [startTime]
//  * @property {string[]|null} [tokenIds]
//  * @property {TokenRange[]|null} [tokenRanges]
//  */

// const phosphorApiKey = process.env.PHOSPHOR_API_KEY || "d7e0696ff49f4ca8ba5d585bfe46f71b";

// const phosphorApiUrl = process.env.PHOSPHOR_API_URL || "https://admin-api.consensys-nft.com"

// /**
//  * @title Create a listing
//  *
//  * @description Initiates the creation of a new collection based on provided data.
//  * The function asynchronously interacts with a backend service, requesting
//  * the creation of a collection. Upon success, the collection is registered
//  * in the specified blockchain network with the provided attributes.
//  *
//  * @param {CreateListingInput} data - The data to create the listing
//  */
// export async function createListing(data) {
//   const {
//     campaignId,
//     collectionId,
//     currency,
//     endTime,
//     itemId,
//     itemIds,
//     maxQuantityPerTx,
//     paymentProviders,
//     policy: {
//       emailAddresses,
//       emailClaimDuration,
//       ethAddresses,
//       itemAssignmentStrategy,
//       maxPerUser,
//       paymentSessionDuration,
//       snapshotId,
//       txPayer,
//       type,
//     },
//     price,
//     quentityListed,
//     settlementCurrency,
//     startTime,
//     tokenIds,
//     tokenRanges,
//   } = data;

//   try {
//     const headers = new Headers();

//     headers.append("Content-Type", "application/json");

//     // Add the Phosphor API key to the headers like this
//     headers.append("Phosphor-Api-Key", phosphorApiKey);

//     return await fetch(`${phosphorApiUrl}/v1/listings`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({
//         campaign_id: campaignId,
//         collection_id: collectionId,
//         currency,
//         end_time: endTime,
//         item_id: itemId,
//         item_ids: itemIds,
//         max_quantity_per_tx: maxQuantityPerTx,
//         payment_providers: paymentProviders,
//         policy: {
//           email_addresses: emailAddresses,
//           email_claim_duration: emailClaimDuration,
//           eth_addresses: ethAddresses,
//           item_assignment_strategy: itemAssignmentStrategy,
//           max_per_user: maxPerUser,
//           payment_session_duration: paymentSessionDuration
//             ? {
//                 provider_override: paymentSessionDuration.providerOverride,
//                 timeout_seconds: paymentSessionDuration.timeoutSeconds,
//               }
//             : null,
//           snapshot_id: snapshotId,
//           tx_payer: txPayer,
//           type,
//         },
//         price,
//         quentity_listed: quentityListed,
//         settlement_currency: settlementCurrency,
//         start_time: startTime,
//         token_Ids: tokenIds,
//         token_ranges: tokenRanges?.map((range) => ({
//           from_id: range.fromId,
//           to_id: range.toId,
//         })),
//       }),
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }
