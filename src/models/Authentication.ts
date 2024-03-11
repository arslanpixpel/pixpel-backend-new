import { query } from "../db";
import { query as runQuery } from "../db";

export const createDeveloperAuth = async (data: any) => {
  const {
    developer_id,
    email,
    name,
    otp_enabled,
    otp_verified,
    otp_ascii,
    otp_hex,
    otp_base32,
    otp_auth_url,
  } = data;

  const query = `
      INSERT INTO developerauth (developer_id, email, name, otp_enabled, otp_verified, otp_ascii, otp_hex, otp_base32, otp_auth_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
  const values = [
    developer_id,
    email,
    name,
    otp_enabled,
    otp_verified,
    otp_ascii,
    otp_hex,
    otp_base32,
    otp_auth_url,
  ];

  try {
    const results = await runQuery(query, values);
    return results.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to create a record in the playerauth table
export const createPlayerAuth = async (data: any) => {
  const {
    player_id,
    email,
    name,
    otp_enabled,
    otp_verified,
    otp_ascii,
    otp_hex,
    otp_base32,
    otp_auth_url,
  } = data;

  const query = `
      INSERT INTO playerauth (player_id, email, name, otp_enabled, otp_verified, otp_ascii, otp_hex, otp_base32, otp_auth_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
  const values = [
    player_id,
    email,
    name,
    otp_enabled,
    otp_verified,
    otp_ascii,
    otp_hex,
    otp_base32,
    otp_auth_url,
  ];

  try {
    const result = await runQuery(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUserOTPInfo = async (user_id: string, tableName: string) => {
  try {
    const columnName =
      tableName === "playerauth" ? "player_id" : "developer_id";
    console.log("Column name: " + columnName);
    const queryText = `SELECT id, otp_base32, otp_enabled, otp_verified FROM ${tableName} WHERE ${columnName} = $1`;
    const values = [user_id];
    const result = await query(queryText, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateOTPInfo = async (
  tableName: string,
  user_id: string,
  otpauth_url: string,
  otp_base32: string
) => {
  try {
    const columnName =
      tableName === "playerauth" ? "player_id" : "developer_id";
    console.log("Column name: " + columnName);
    const queryText = `UPDATE ${tableName} SET otp_auth_url = $1, otp_base32 = $2 WHERE ${columnName} = $3`;
    const values = [otpauth_url, otp_base32, user_id];
    await query(queryText, values);
  } catch (error) {
    throw error;
  }
};

export const updateOTPStatus = async (
  tableName: string,
  user_id: string,
  otp_enabled: boolean,
  otp_verified: boolean
) => {
  try {
    const columnName =
      tableName === "playerauth" ? "player_id" : "developer_id";
    const queryText = `UPDATE ${tableName} SET otp_enabled = $1, otp_verified = $2 WHERE ${columnName} = $3`;
    const values = [otp_enabled, otp_verified, user_id];
    await query(queryText, values);
  } catch (error) {
    throw error;
  }
};
