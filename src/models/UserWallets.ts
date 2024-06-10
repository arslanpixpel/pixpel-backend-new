import { query } from "../db";

interface UserWallets {
  userId: number;
  userType: string;
  wallet: string;
}

export const createWallet = async (data: UserWallets) => {
  try {
    const { userId, userType, wallet } = data;
    const result = await query(
      "INSERT INTO user_wallets (userId, userType ,wallet) VALUES ($1, $2, $3) RETURNING *",
      [userId, userType, wallet]
    );
    return result?.rows[0];
  } catch (e: any) {
    const error = e as Error;
    throw error;
  }
};

export const getAllWalletsAndAccounts = async () => {
  try {
    const result = await query("SELECT * FROM user_wallets", []);
    return result?.rows[0];
  } catch (e: any) {
    const error = e as Error;
    throw error;
  }
};

export const getDeveloperByWallet = async (wallet: string) => {
  try {
    const result = await query("SELECT * FROM user_wallets WHERE wallet = $1", [
      wallet,
    ]);
    return result.rows[0];
  } catch (e: any) {
    const error = e as Error;
    throw error;
  }
};

export const deleteDeveloperWalletById = async (userId: number) => {
  try {
    const result = await query("DELETE FROM user_wallets WHERE userId = $1", [
      userId,
    ]);
    return result.rows[0];
  } catch (e: any) {
    const error = e as Error;
    throw error;
  }
};
export const getWalletByDeveloper = async (userId: number) => {
  try {
    const result = await query("SELECT * FROM user_wallets WHERE userId = $1", [
      userId,
    ]);
    return result.rows[0];
  } catch (e: any) {
    const error = e as Error;
    throw error;
  }
};
