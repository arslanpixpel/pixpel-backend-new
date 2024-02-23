import { query } from "../db";

interface Auction {
  nft_id: number;
  auction_startdate: string;
  auction_enddate: string;
  status: string;
}

export const createAuction = async (auction: Auction) => {
  try {
    const { nft_id, auction_startdate, auction_enddate, status } = auction;
    const result = await query(
      "INSERT INTO nftauction(nft_id, auction_startdate, auction_enddate, status) VALUES($1, $2, $3, $4) RETURNING *",
      [nft_id, auction_startdate, auction_enddate, status]
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

export const updateAuction = async (id: number, updates: Partial<Auction>) => {
  try {
    const { nft_id, auction_startdate, auction_enddate, status } = updates;
    const result = await query(
      "UPDATE nftauction SET nft_id=$1, auction_startdate=$2, auction_enddate=$3, status=$4 WHERE id=$5 RETURNING *",
      [nft_id, auction_startdate, auction_enddate, status, id]
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
