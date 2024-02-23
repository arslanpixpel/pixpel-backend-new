import { query } from "../db";

interface Bidding {
  nftauction_id: number;
  bidder_wallet: string;
  bidding_price: number;
  bidding_time: string;
}

export const createBidding = async (bidding: Bidding) => {
  try {
    const { nftauction_id, bidder_wallet, bidding_price, bidding_time } =
      bidding;
    const result = await query(
      "INSERT INTO nftbiding(nftauction_id, bidder_wallet, bidding_price, bidding_time) VALUES($1, $2, $3, $4) RETURNING *",
      [nftauction_id, bidder_wallet, bidding_price, bidding_time]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateBidding = async (id: number, updates: Partial<Bidding>) => {
  try {
    const { nftauction_id, bidder_wallet, bidding_price, bidding_time } =
      updates;
    const result = await query(
      "UPDATE nftbiding SET nftauction_id=$1, bidder_wallet=$2, bidding_price=$3, bidding_time=$4 WHERE id=$5 RETURNING *",
      [nftauction_id, bidder_wallet, bidding_price, bidding_time, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteBidding = async (id: number) => {
  try {
    const result = await query("DELETE FROM nftbiding WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readBidding = async (id: number) => {
  try {
    const result = await query(
      `
        SELECT nftbiding.*, nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftbiding
        INNER JOIN nftauction ON nftbiding.nftauction_id = nftauction.id
        INNER JOIN nfts ON nftauction.nft_id = nfts.id
        WHERE nftbiding.id = $1
        `,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllBiddings = async () => {
  try {
    const result = await query(
      `
        SELECT nftbiding.*, nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftbiding
        INNER JOIN nftauction ON nftbiding.nftauction_id = nftauction.id
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

export const getAllBiddingsByAuction = async (nftauction_id: number) => {
  try {
    const result = await query(
      `
        SELECT nftbiding.*, nftauction.id AS auction_id, nftauction.*, nfts.*
        FROM nftbiding
        INNER JOIN nftauction ON nftbiding.nftauction_id = nftauction.id
        INNER JOIN nfts ON nftauction.nft_id = nfts.id
        WHERE nftauction.id = $1
        `,
      [nftauction_id]
    );
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
