import { query } from "../db";

interface P2PProfile {
  id?: number;
  ref_id: number; // player_id for player, developer_id for developer
  full_name: string;
  bank_account_number: bigint;
  bank_name: string;
  payment_method: string;
  role?: string;
}

export const createP2PProfile = async (profileData: P2PProfile) => {
  try {
    const {
      ref_id,
      full_name,
      bank_account_number,
      bank_name,
      payment_method,
      role,
    } = profileData;

    let tableName;
    let refColumn;
    if (role === "player") {
      tableName = "p2p_profile_player";
      refColumn = "player_id";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
      refColumn = "developer_id";
    } else {
      throw new Error("Invalid role provided");
    }

    const result = await query(
      `INSERT INTO ${tableName} (${refColumn}, full_name, bank_account_number, bank_name, payment_method) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [ref_id, full_name, bank_account_number, bank_name, payment_method]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getP2PProfileById = async (role: string, id: number) => {
  try {
    let tableName;
    let refColumn;
    if (role === "player") {
      tableName = "p2p_profile_player";
      refColumn = "player_id";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
      refColumn = "developer_id";
    } else {
      throw new Error("Invalid role provided");
    }

    const queryText = `SELECT * FROM ${tableName} WHERE id = $1`;
    const result = await query(queryText, [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const updateP2PProfile = async (
  id: number,
  updatedProfile: P2PProfile
) => {
  try {
    const { full_name, bank_account_number, bank_name, payment_method, role } =
      updatedProfile;

    let tableName;
    let refColumn;
    if (role === "player") {
      tableName = "p2p_profile_player";
      refColumn = "player_id";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
      refColumn = "developer_id";
    } else {
      throw new Error("Invalid role provided");
    }

    const result = await query(
      `UPDATE ${tableName} 
       SET full_name = $1, bank_account_number = $2, bank_name = $3, payment_method = $4 
       WHERE ${refColumn} = $5 RETURNING *`,
      [full_name, bank_account_number, bank_name, payment_method, id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteP2PProfile = async (role: string, id: number) => {
  try {
    let tableName;
    let refColumn;
    if (role === "player") {
      tableName = "p2p_profile_player";
      refColumn = "player_id";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
      refColumn = "developer_id";
    } else {
      throw new Error("Invalid role provided");
    }

    const result = await query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getAllP2PProfiles = async (role: string) => {
  try {
    let tableName;
    if (role === "player") {
      tableName = "p2p_profile_player";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
    } else {
      throw new Error("Invalid role provided");
    }

    const queryText = `SELECT * FROM ${tableName}`;
    const result = await query(queryText, []);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const getP2PProfileByRefId = async (role: string, refId: number) => {
  try {
    let tableName;
    let refColumn;
    if (role === "player") {
      tableName = "p2p_profile_player";
      refColumn = "player_id";
    } else if (role === "developer") {
      tableName = "p2p_profile_developer";
      refColumn = "developer_id";
    } else {
      throw new Error("Invalid role provided");
    }

    if (role === "player") {
      const queryText = `
      SELECT * 
      FROM ${tableName}
      INNER JOIN players ON ${tableName}.${refColumn} = players.id
      WHERE ${tableName}.${refColumn} = $1;
      `;
      const result = await query(queryText, [refId]);
      return result.rows[0];
    } else {
      const queryText = `
      SELECT * 
      FROM ${tableName}
      INNER JOIN developers ON ${tableName}.${refColumn} = developers.id
      WHERE ${tableName}.${refColumn} = $1;
      `;
      const result = await query(queryText, [refId]);
      return result.rows[0];
    }
  } catch (err) {
    throw err;
  }
};
