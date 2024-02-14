import { query } from "../db";

interface TokenReleaseData {
  id: number;
  per_cycle_release: number;
  release_time: string;
}

export const createTokenReleaseData = async (data: TokenReleaseData) => {
  try {
    const { id, per_cycle_release, release_time } = data;
    const result = await query(
      "INSERT INTO token_release_data(id, per_cycle_release, release_time) VALUES($1, $2, $3) RETURNING *",
      [id, per_cycle_release, release_time]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readTokenReleaseData = async (id: number) => {
  try {
    const result = await query("SELECT * FROM token_release_data WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateTokenReleaseData = async (id: number, updates: Partial<TokenReleaseData>) => {
  try {
    const { per_cycle_release, release_time } = updates;
    const result = await query(
      "UPDATE token_release_data SET per_cycle_release = $1, release_time = $2 WHERE id = $3 RETURNING *",
      [per_cycle_release, release_time, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteTokenReleaseData = async (id: number) => {
  try {
    const result = await query("DELETE FROM token_release_data WHERE id = $1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllTokenReleaseData = async () => {
  try {
    const result = await query("SELECT * FROM token_release_data", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
