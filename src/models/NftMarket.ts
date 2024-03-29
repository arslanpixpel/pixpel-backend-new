import { query } from "../db";

interface NftMarket {
  id?: number;
  nft_id: number;
  listing: boolean;
  seller: string;
  resell?: boolean;
  reselling_price?: any;
  reselling_listingid?: number;
  reselling_name?: string;
}

export const createNftMarket = async (nftMarket: NftMarket) => {
  try {
    const {
      nft_id,
      listing,
      seller,
      resell,
      reselling_price,
      reselling_listingid,
      reselling_name,
    } = nftMarket;
    const result = await query(
      "INSERT INTO nftmarket(nft_id, listing, seller, resell, reselling_price, reselling_listingid, reselling_name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        nft_id,
        listing,
        seller,
        resell,
        reselling_price,
        reselling_listingid,
        reselling_name,
      ]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const readNftMarket = async (id: number) => {
  try {
    const result = await query(
      "SELECT nftmarket.*, nfts.* FROM nftmarket JOIN nfts ON nftmarket.nft_id = nfts.id WHERE nftmarket.id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const updateNftMarket = async (
  id: number,
  updates: Partial<NftMarket>
) => {
  try {
    const {
      nft_id,
      listing,
      seller,
      resell,
      reselling_price,
      reselling_listingid,
      reselling_name,
    } = updates;
    const result = await query(
      "UPDATE nftmarket SET nft_id=$1, listing=$2, seller=$3, resell=$4, reselling_price=$5, reselling_listingid=$6, reselling_name=$7 WHERE id=$8 RETURNING *",
      [
        nft_id,
        listing,
        seller,
        resell,
        reselling_price,
        reselling_listingid,
        reselling_name,
        id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteNftMarket = async (id: number) => {
  try {
    const result = await query("DELETE FROM nftmarket WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    throw err;
  }
};

// export const getAllNftNftMarkets = async () => {
//   try {
//     const result = await query(
//       `
//         SELECT nftmarket.*, nfts.*
//         FROM nftmarket
//         JOIN nfts ON nftmarket.nft_id = nfts.id
//       `,
//       []
//     );
//     return result.rows;
//   } catch (err) {
//     throw err;
//   }
// };

export const getAllNftNftMarkets = async () => {
  try {
    const result = await query(
      `
        SELECT nftmarket.id AS nftmarket_id, nftmarket.*, nfts.*
        FROM nftmarket
        JOIN nfts ON nftmarket.nft_id = nfts.id
      `,
      []
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
