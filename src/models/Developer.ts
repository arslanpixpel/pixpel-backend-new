import { query } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
interface Developer {
  name: string;
  email: string;
  wallet: string;
  contact_details: string;
  password: string;
  verified: string;
  img: string;
  address: string;
  dateOfLaunch: string;
  country: string;
  launchedAtPixpel: string;
  legalName: string;
  perPercentage: string;
  percentage: string;
  shareHolders: string;
  zetawallet: string;
  fireblocks_account_address: string;
  fireblocks_account_id: string;
  isdisable: string;
  created_at: string;
}

export const readDeveloper = async (id: number) => {
  try {
    const result = await query("SELECT * FROM developers WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

// export const readDeveloperByWallet = async (wallet: string | any) => {
//   try {
//     const result = await query("SELECT * FROM developers WHERE wallet = $1", [
//       wallet,
//     ]);
//     return result.rows[0];
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };

export const readDeveloperByWallet = async (
  wallet: string | any,
  zetawallet: string | any
) => {
  try {
    const result = await query(
      "SELECT * FROM developers WHERE wallet = $1 OR zetawallet = $2",
      [wallet, zetawallet]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readDeveloperByEmail = async (email: string | any) => {
  try {
    const result = await query("SELECT * FROM developers WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateDeveloperImage = async (
  id: number,
  updates: Partial<Developer>
) => {
  try {
    const { img } = updates;

    const result = await query(
      "UPDATE developers SET img=$1 WHERE id=$2 RETURNING *",
      [img, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateDeveloper = async (
  id: number,
  updates: Partial<Developer>
) => {
  try {
    const {
      name,
      email,
      wallet,
      contact_details,
      verified,
      img,
      address,
      country,
      launchedAtPixpel,
      legalName,
      perPercentage,
      percentage,
      shareHolders,
      zetawallet,
      isdisable,
    } = updates;

    const result = await query(
      "UPDATE developers SET name=$1, email=$2, wallet=$3, contact_details=$4, verified=$5, img=$6, address=$7, country=$8, launchedAtPixpel=$9, legalName=$10, perPercentage=$11, percentage=$12, shareHolders=$13, zetawallet=$14, isdisable=$15 WHERE id=$16 RETURNING *",
      [
        name,
        email,
        wallet,
        contact_details,
        verified,
        img,
        address,
        country,
        launchedAtPixpel,
        legalName,
        perPercentage,
        percentage,
        shareHolders,
        zetawallet,
        isdisable,
        id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteDeveloper = async (id: number) => {
  try {
    const result = await query("DELETE FROM developers WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllDevelopers = async () => {
  try {
    const result = await query("SELECT * FROM developers", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signupDeveloper = async (developer: Developer) => {
  try {
    const {
      name,
      email,
      wallet,
      contact_details,
      password,
      img,
      address,
      country,
      launchedAtPixpel,
      legalName,
      perPercentage,
      percentage,
      shareHolders,
      zetawallet,
      fireblocks_account_address,
      fireblocks_account_id,
      isdisable,
    } = developer;
    const hashedPassword = await bcrypt.hash(password, 10);
    const developer_id = uuidv4();
    const created_at = new Date().toISOString();
    const result = await query(
      "INSERT INTO developers(name, email, wallet, contact_details, password, img, address, country, launchedAtPixpel, legalName, perPercentage, percentage, shareHolders, zetawallet, developer_id, fireblocks_account_address, fireblocks_account_id, isdisable, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *",
      [
        name,
        email.toLowerCase(),
        wallet,
        contact_details,
        hashedPassword,
        img,
        address,
        country,
        launchedAtPixpel,
        legalName,
        perPercentage,
        percentage,
        shareHolders,
        zetawallet.toLowerCase(),
        developer_id,
        fireblocks_account_address,
        fireblocks_account_id,
        isdisable,
        created_at,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signinDeveloper = async (email: string, password: string) => {
  try {
    const result = await query("SELECT * FROM developers WHERE email = $1", [
      email.toLowerCase(),
    ]);
    const developer = result.rows[0];
    if (developer && (await bcrypt.compare(password, developer.password))) {
      return developer;
    } else {
      return null;
    }
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updatePlayerPassword = async (
  email: string,
  newPassword: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await query(
      "UPDATE developers SET password = $1 WHERE email = $2 RETURNING *",
      [hashedPassword, email.toLowerCase()]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    const result = await query(
      "SELECT email FROM developers WHERE email = $1",
      [email.toLowerCase()]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error("Error checking email:", err);
    throw new Error("An error occurred while checking the email");
  }
};

export const updateDeveloperDisableStatus = async (
  id: number,
  isDisable: boolean
) => {
  try {
    const result = await query(
      "UPDATE developers SET isdisable=$1 WHERE id=$2",
      [isDisable, id]
    );
    return result.rowCount;
  } catch (err) {
    throw err;
  }
};
