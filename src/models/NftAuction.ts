import { query } from "../db";

interface Auction {
  nft_id: number;
  auction_startdate: string;
  auction_enddate: string;
  status: string;
  auction_index: number;
  auction_minimum_bid_price: string;
  auction_token_index: string;
}

export const createAuction = async (auction: Auction) => {
  try {
    const {
      nft_id,
      auction_startdate,
      auction_enddate,
      status,
      auction_index,
      auction_minimum_bid_price,
      auction_token_index,
    } = auction;
    const result = await query(
      "INSERT INTO nftauction(nft_id, auction_startdate, auction_enddate, status, auction_index, auction_minimum_bid_price, auction_token_index) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        nft_id,
        auction_startdate,
        auction_enddate,
        status,
        auction_index,
        auction_minimum_bid_price,
        auction_token_index,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readAuction = async (id: number) => {
  try {
    const result = await query(
      `
        SELECT nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftauction
        INNER JOIN nfts ON nftauction.nft_id = nfts.id
        WHERE nftauction.id = $1
        `,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

// export const updateAuction = async (id: number, updates: Partial<Auction>) => {
//   try {
//     const {
//       nft_id,
//       auction_startdate,
//       auction_enddate,
//       status,
//       auction_index,
//       auction_minimum_bid_price,
//       auction_token_index,
//     } = updates;
//     const result = await query(
//       "UPDATE nftauction SET nft_id=$1, auction_startdate=$2, auction_enddate=$3, status=$4, auction_index=$5, auction_minimum_bid_price=$6, auction_token_index=$7 WHERE id=$8 RETURNING *",
//       [
//         nft_id,
//         auction_startdate,
//         auction_enddate,
//         status,
//         auction_index,
//         auction_minimum_bid_price,
//         auction_token_index,
//         id,
//       ]
//     );
//     return result.rows[0];
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };

export const updateAuction = async (id: number, updates: Partial<Auction>) => {
  try {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");
    const values = Object.values(updates);
    values.push(id); // Add the id at the end for WHERE clause

    const result = await query(
      `UPDATE nftauction SET ${setClause} WHERE id=$${values.length} RETURNING *`,
      values
    );

    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteAuction = async (id: number) => {
  try {
    const result = await query("DELETE FROM nftauction WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllAuctions = async () => {
  try {
    const result = await query(
      `
        SELECT nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftauction
        INNER JOIN nfts ON nftauction.nft_id = nfts.id
        `,
      []
    );
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllAuctionsByNft = async (nft_id: number) => {
  try {
    const result = await query(
      `
        SELECT nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftauction
        INNER JOIN nfts ON nftauction.nft_id = nfts.id
        WHERE nftauction.nft_id = $1
        `,
      [nft_id]
    );
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
