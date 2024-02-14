import { query } from "../db";
import bcrypt from "bcrypt";
interface Developer {
  name: string;
  email: string;
  wallet: string;
  contact_details: string;
  password: string;
  verified: string;
  img: string ;
  address: string ;
  dateOfLaunch: string ;
  country: string ;
  launchedAtPixpel: string ;
  legalName: string ;
  perPercentage: string ;
  percentage: string ;
  shareHolders:string
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

export const readDeveloperByWallet = async (wallet: string | any) => {
  try {
    const result = await query("SELECT * FROM developers WHERE wallet = $1", [wallet]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readDeveloperByEmail = async (email: string | any) => {
  try {
    const result = await query("SELECT * FROM developers WHERE email = $1", [email]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateDeveloperImage = async (id: number, updates: Partial<Developer>) => {
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

export const updateDeveloper = async (id: number, updates: Partial<Developer>) => {
  try {
    const { name, email, wallet, contact_details, verified, img, address, country, launchedAtPixpel, legalName, perPercentage, percentage, shareHolders } = updates;

    const result = await query(
      "UPDATE developers SET name=$1, email=$2, wallet=$3, contact_details=$4, verified=$5, img=$6, address=$7, country=$8, launchedAtPixpel=$9, legalName=$10, perPercentage=$11, percentage=$12, shareHolders=$13 WHERE id=$14 RETURNING *",
      [name, email, wallet, contact_details, verified, img, address, country, launchedAtPixpel, legalName, perPercentage, percentage, shareHolders, id]
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
    const { name, email, wallet, contact_details, password, img ,address ,country ,launchedAtPixpel ,legalName ,perPercentage ,percentage ,shareHolders  } = developer;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO developers(name, email, wallet, contact_details, password, img, address, country, launchedAtPixpel, legalName, perPercentage, percentage, shareHolders) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [name, email, wallet, contact_details, hashedPassword, img ,address ,country ,launchedAtPixpel ,legalName ,perPercentage ,percentage ,shareHolders]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signinDeveloper = async (email: string, password: string) => {
  try {
    const result = await query("SELECT * FROM developers WHERE email = $1", [email]);
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