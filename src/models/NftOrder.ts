import { query } from "../db";

interface Order {
  player_id: number;
  nft_id: number;
  developer_id: number;
}

export const createOrder = async (order: Order) => {
  try {
    const { player_id: player_id, nft_id: nft_id, developer_id: developer_id } = order;
    const result = await query(
      "INSERT INTO orders(player_id, nft_id, developer_id) VALUES($1, $2, $3) RETURNING *",
      [player_id, nft_id, developer_id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readOrder = async (id: number) => {
  try {
    const result = await query("SELECT * FROM nftorders WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateOrder = async (id: number, updates: Partial<Order>) => {
  try {
    const { player_id: player_id, nft_id: nft_id, developer_id: developer_id } = updates;
    const result = await query(
      "UPDATE nftorders SET player_id=$1 , nft_id=$2 , developer_id=$3 WHERE id=$4 RETURNING *",
      [player_id, nft_id, developer_id, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const result = await query("DELETE FROM nftorders WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllNftOrders = async () => {
  try {
    const result = await query("SELECT * FROM nftorders", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};