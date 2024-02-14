import { query } from "../db";
interface TeamMember {
  jobTitle: string;
  name: string;
  image: string;
}

interface Gamedashboard {
  title_1: string;
  title_2: string;
  para_1: string;
  para_2: string;
  banner_image_1: string;
  banner_image_2: string;
  banner_image_3: string;
  team_members: TeamMember[];
  developer_id: number;
  developer_wallet: string;
  pixpel_studio_heading: string;
  pixpel_para1: string;
  pixpel_para2: string;
}

// export const createGamedashboard = async (game_dashoboard: Gamedashboard) => {
//   try {
//     const {
//       title_1,
//       title_2,
//       para_1,
//       para_2,
//       banner_image_1,
//       banner_image_2,
//       banner_image_3,
//       team_members,
//     } = game_dashoboard;

//     const result = await query(
//       "INSERT INTO game_dashboard (title_1, title_2, para_1, para_2, banner_image_1, banner_image_2, banner_image_3, team_members) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
//       [
//         title_1,
//         title_2,
//         para_1,
//         para_2,
//         banner_image_1,
//         banner_image_2,
//         banner_image_3,
//         team_members,
//       ]
//     );
//     return result.rows[0];
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };

export const createGamedashboard = async (game_dashoboard: Gamedashboard) => {
  try {
    const {
      title_1,
      title_2,
      para_1,
      para_2,
      banner_image_1,
      banner_image_2,
      banner_image_3,
      team_members,
      developer_id,
      developer_wallet,
      pixpel_studio_heading,
      pixpel_para1,
      pixpel_para2,
    } = game_dashoboard;

    const result = await query(
      "INSERT INTO game_dashboard (title_1, title_2, para_1, para_2, banner_image_1, banner_image_2, banner_image_3, team_members, developer_id, developer_wallet, pixpel_studio_heading, pixpel_para1, pixpel_para2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        title_1,
        title_2,
        para_1,
        para_2,
        banner_image_1,
        banner_image_2,
        banner_image_3,
        team_members,
        developer_id,
        developer_wallet,
        pixpel_studio_heading,
        pixpel_para1,
        pixpel_para2,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllGamedashboard = async () => {
  try {
    const result = await query("SELECT * FROM game_dashboard", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getGamedashboardByDeveloperId = async (developerId: string) => {
  try {
    const queryText = "SELECT * FROM game_dashboard WHERE developer_id = $1";

    const result = await query(queryText, [developerId]);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getGamedashboardByWallet = async (developerWallet: string) => {
  try {
    const queryText =
      "SELECT * FROM game_dashboard WHERE developer_wallet = $1";

    const result = await query(queryText, [developerWallet]);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
