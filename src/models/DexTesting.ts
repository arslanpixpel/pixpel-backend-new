import { query } from "../db";

interface dexTesting {
  fireblocks_account_address: string;
  fireblocks_account_id: string;
}

export const createVaultAccount = async (dexTesting: dexTesting) => {
  try {
    const { fireblocks_account_address, fireblocks_account_id } = dexTesting;
    const result = await query(
      "INSERT INTO dex_testing (fireblocks_account_address, fireblocks_account_id) VALUES ($1, $2) RETURNING *",
      [fireblocks_account_address, fireblocks_account_id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getVaultAccountByAddress = async (
  fireblocks_account_address: string
): Promise<dexTesting | null> => {
  try {
    const result = await query(
      "SELECT * FROM dex_testing WHERE fireblocks_account_address = $1",
      [fireblocks_account_address]
    );
    return result.rows.length ? result.rows[0] : null;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllVaultAccount = async (): Promise<dexTesting | null> => {
  try {
    const result = await query("SELECT * FROM dex_testing", []);
    return result.rows.length ? result.rows[0] : null;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
