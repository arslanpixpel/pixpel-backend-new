import { query } from "../db";

interface Transaction {
  nfttoken_id: number;
  nft_id: number;
  buyer: string;
  seller: string;
  transaction_hash: string;
  transaction_time: string;
  price: number;
}

export const createTransaction = async (transaction: Transaction) => {
  try {
    const {
      nfttoken_id,
      nft_id,
      buyer,
      seller,
      transaction_hash,
      transaction_time,
      price,
    } = transaction;
    const result = await query(
      "INSERT INTO nft_transection(nfttoken_id, nft_id, buyyer, seller, transection_hash, transection_time, price) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        nfttoken_id,
        nft_id,
        buyer,
        seller,
        transaction_hash,
        transaction_time,
        price,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readTransaction = async (id: number) => {
  try {
    const result = await query("SELECT * FROM nft_transection WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateTransaction = async (
  id: number,
  updates: Partial<Transaction>
) => {
  try {
    const {
      nfttoken_id,
      nft_id,
      buyer,
      seller,
      transaction_hash,
      transaction_time,
      price,
    } = updates;
    const result = await query(
      "UPDATE nft_transection SET nfttoken_id=$1, nft_id=$2, buyyer=$3, seller=$4, transection_hash=$5, transection_time=$6, price=$7 WHERE id=$8 RETURNING *",
      [
        nfttoken_id,
        nft_id,
        buyer,
        seller,
        transaction_hash,
        transaction_time,
        price,
        id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const result = await query("DELETE FROM nft_transection WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllNftTransactions = async () => {
  try {
    const result = await query("SELECT * FROM nft_transection", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllTransactionsBySellerWallet = async (nft_id: number) => {
  try {
    const result = await query(
      "SELECT * FROM nft_transection WHERE nft_id = $1",
      [nft_id]
    );
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
