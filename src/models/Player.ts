import { query } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

interface Player {
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
  fireblocks_account_address: string;
  fireblocks_account_id: string;
}

export const readPlayer = async (id: number) => {
  try {
    const result = await query("SELECT * FROM players WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const emailChecker = async (email: string | any) => {
  try {
    const result = await query("SELECT * FROM players WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

// export const readPlayerByWallet = async (wallet: string) => {
//   try {
//     const result = await query("SELECT * FROM players WHERE wallet = $1", [
//       wallet,
//     ]);
//     return result.rows[0];
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };

export const readPlayerByWallet = async (
  wallet: string,
  zetawallet: string
) => {
  try {
    const result = await query(
      "SELECT * FROM players WHERE wallet = $1 OR zetawallet = $2",
      [wallet, zetawallet]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updatePlayerImage = async (
  id: number,
  updates: Partial<Player>
) => {
  try {
    const { img } = updates;

    const result = await query(
      "UPDATE players SET img=$1 WHERE id=$2 RETURNING *",
      [img, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updatePlayer = async (id: number, updates: Partial<Player>) => {
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
    } = updates;

    const result = await query(
      "UPDATE players SET name=$1, email=$2, wallet=$3, contact_details=$4, verified=$5, img=$6, address=$7, country=$8, launchedAtPixpel=$9, legalName=$10, perPercentage=$11, percentage=$12, shareHolders=$13 WHERE id=$14 RETURNING *",
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
        id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deletePlayer = async (id: number) => {
  try {
    const result = await query("DELETE FROM players WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllPlayers = async () => {
  try {
    console.log("haha");
    const result = await query("SELECT * FROM players", []);
    console.log("haha2");
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signupPlayer = async (player: {
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
  player_id: string;
  fireblocks_account_address: string;
  fireblocks_account_id: string;
}) => {
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
    } = player;
    const hashedPassword = await bcrypt.hash(password, 10);
    const player_id = uuidv4();
    const result = await query(
      "INSERT INTO players(name, email, wallet, contact_details, password, img, address, country, launchedAtPixpel, legalName, perPercentage, percentage, shareHolders, zetawallet, player_id, fireblocks_account_address, fireblocks_account_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *",
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
        zetawallet,
        player_id,
        fireblocks_account_address,
        fireblocks_account_id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signinPlayer = async (email: string, password: string) => {
  try {
    const result = await query("SELECT * FROM players WHERE email = $1", [
      email.toLowerCase(),
    ]);
    const player = result.rows[0];
    if (player && (await bcrypt.compare(password, player.password))) {
      return player;
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
      "UPDATE players SET password = $1 WHERE email = $2 RETURNING *",
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

    const result = await query("SELECT email FROM players WHERE email = $1", [
      email.toLowerCase(),
    ]);
    return result.rows.length > 0;
  } catch (err) {
    console.error("Error checking email:", err);
    throw new Error("An error occurred while checking the email");
  }
};
