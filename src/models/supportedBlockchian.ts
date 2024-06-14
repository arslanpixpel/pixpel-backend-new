import { query } from "../db";

export const readBlockchain = async (id: number) => {
  try {
    const result = await query(
      "SELECT * FROM supported_blockchains WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const createBlockchain = async (blockchain: {
  logo: string;
  blockchain_name: string;
  symbol: string;
}) => {
  try {
    const result = await query(
      "INSERT INTO supported_blockchains (logo, blockchain_name, symbol) VALUES ($1, $2, $3) RETURNING *",
      [blockchain.logo, blockchain.blockchain_name, blockchain.symbol]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const updateBlockchain = async (
  id: number,
  blockchain: { logo: string; blockchain_name: string; symbol: string }
) => {
  try {
    const result = await query(
      "UPDATE supported_blockchains SET logo = $1, blockchain_name = $2, symbol = $3 WHERE id = $4 RETURNING *",
      [blockchain.logo, blockchain.blockchain_name, blockchain.symbol, id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteBlockchain = async (id: number) => {
  try {
    const result = await query(
      "DELETE FROM supported_blockchains WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const readAllBlockchains = async () => {
  try {
    const result = await query("SELECT * FROM supported_blockchains", []);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
