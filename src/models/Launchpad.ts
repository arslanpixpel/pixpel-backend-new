import { query } from "../db";

interface Data {
  cancel: boolean;
  cis2_amount: number;
  cis2_price: number;
  cliff_duration: number;
  cliff_period: string;
  description: string;
  dev_paid: number;
  discord_url: string;
  end_time: string;
  fb_url: string;
  github_url: string;
  hard_cap: number;
  holders: number;
  address: string;
  amount: number;
  instagram_url: string;
  invest_amount: number;
  live: boolean;
  live_pause_count: number;
  logo_url: string;
  maximum_invest: number;
  minimum_invest: number;
  owner: string;
  pause_start: string;
  pause_until: string;
  reddit_url: string;
  soft_cap: number;
  start_time: string;
  telegram_url: string;
  title: string;
  // token_release_data: number[];
  token_release_data: {
    id: number;
    per_cycle_release: number;
    release_time: string;
  }[];
  total_tx: number;
  twitter_url: string;
  website_url: string;
}

// models.ts

export interface LaunchpadData {
  cancel: boolean;
  cis2_amount: number;
  cis2_price: number;
  cliff_duration: number;
  cliff_period: string;
  description: string;
  dev_paid: number;
  discord_url: string;
  end_time: string;
  fb_url: string;
  github_url: string;
  hard_cap: number;
  holders: string[];
  address: string;
  amount: number;
  instagram_url: string;
  invest_amount: number;
  live: boolean;
  live_pause_count: number;
  logo_url: string;
  maximum_invest: number;
  minimum_invest: number;
  owner: string;
  pause_start: string;
  pause_until: string;
  reddit_url: string;
  soft_cap: number;
  start_time: string;
  telegram_url: string;
  title: string;
  token_release_data: TokenReleaseData[];
  total_tx: number;
  twitter_url: string;
  website_url: string;
  token: string;
}

export interface TokenReleaseData {
  id: number;
  per_cycle_release: number;
  release_time: string;
}

export const createData = async (data: LaunchpadData) => {
  try {
    const {
      cancel,
      cis2_amount,
      cis2_price,
      cliff_duration,
      cliff_period,
      description,
      dev_paid,
      discord_url,
      end_time,
      fb_url,
      github_url,
      hard_cap,
      holders,
      address,
      amount,
      instagram_url,
      invest_amount,
      live,
      live_pause_count,
      logo_url,
      maximum_invest,
      minimum_invest,
      owner,
      pause_start,
      pause_until,
      reddit_url,
      soft_cap,
      start_time,
      telegram_url,
      title,
      token_release_data,
      total_tx,
      twitter_url,
      website_url,
      token,
    } = data;

    // const result = await query(
    //   "INSERT INTO launchpad_data(cancel, cis2_amount, cis2_price, cliff_duration, cliff_period, description, dev_paid, discord_url, end_time, fb_url, github_url, hard_cap, holders, address, amount, instagram_url, invest_amount, live, live_pause_count, logo_url, maximum_invest, minimum_invest, owner, pause_start, pause_until, reddit_url, soft_cap, start_time, telegram_url, title, token_release_data, total_tx, twitter_url, website_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34) RETURNING *",
    //   [
    //     cancel,
    //     cis2_amount,
    //     cis2_price,
    //     cliff_duration,
    //     cliff_period,
    //     description,
    //     dev_paid,
    //     discord_url,
    //     end_time,
    //     fb_url,
    //     github_url,
    //     hard_cap,
    //     holders,
    //     address,
    //     amount,
    //     instagram_url,
    //     invest_amount,
    //     live,
    //     live_pause_count,
    //     logo_url,
    //     maximum_invest,
    //     minimum_invest,
    //     owner,
    //     pause_start,
    //     pause_until,
    //     reddit_url,
    //     soft_cap,
    //     start_time,
    //     telegram_url,
    //     title,
    //     token_release_data,
    //     total_tx,
    //     twitter_url,
    //     website_url,
    //   ]
    // );

    const result = await query(
      "INSERT INTO launchpad_data(cancel, cis2_amount, cis2_price, cliff_duration, cliff_period, description, dev_paid, discord_url, end_time, fb_url, github_url, hard_cap, holders, address, amount, instagram_url, invest_amount, live, live_pause_count, logo_url, maximum_invest, minimum_invest, owner, pause_start, pause_until, reddit_url, soft_cap, start_time, telegram_url, title, token_release_data, total_tx, twitter_url, website_url, token) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34) RETURNING *",
      [
        cancel,
        cis2_amount,
        cis2_price,
        cliff_duration,
        cliff_period,
        description,
        dev_paid,
        discord_url,
        end_time,
        fb_url,
        github_url,
        hard_cap,
        holders,
        address,
        amount,
        instagram_url,
        invest_amount,
        live,
        live_pause_count,
        logo_url,
        maximum_invest,
        minimum_invest,
        owner,
        pause_start,
        pause_until,
        reddit_url,
        soft_cap,
        start_time,
        telegram_url,
        title,
        JSON.stringify(
          token_release_data.map((release) => [
            release.id,
            release.per_cycle_release,
            release.release_time,
          ])
        ),
        total_tx,
        twitter_url,
        website_url,
        token,
      ]
    );

    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readData = async (id: number) => {
  try {
    // const result = await query("SELECT * FROM launchpad_data WHERE id = $1", [
    //   id,
    // ]);
    const result = await query("SELECT * FROM rockets WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateData = async (id: number, updates: Partial<Data>) => {
  try {
    const {
      cancel,
      cis2_amount,
      cis2_price,
      cliff_duration,
      cliff_period,
      description,
      dev_paid,
      discord_url,
      end_time,
      fb_url,
      github_url,
      hard_cap,
      holders,
      address,
      amount,
      instagram_url,
      invest_amount,
      live,
      live_pause_count,
      logo_url,
      maximum_invest,
      minimum_invest,
      owner,
      pause_start,
      pause_until,
      reddit_url,
      soft_cap,
      start_time,
      telegram_url,
      title,
      token_release_data,
      total_tx,
      twitter_url,
      website_url,
    } = updates;
    const result = await query(
      "UPDATE launchpad_data SET cancel=$1 , cis2_amount=$2 , cis2_price=$3 , cliff_duration=$4 , cliff_period=$5 , description=$6 , dev_paid=$7 , discord_url=$8 , end_time=$9 , fb_url=$10 , github_url=$11 , hard_cap=$12 , holders=$13 , address=$14 , amount=$15 , instagram_url=$16 , invest_amount=$17 , live=$18 , live_pause_count=$19 , logo_url=$20 , maximum_invest=$21 , minimum_invest=$22 , owner=$23 , pause_start=$24 , pause_until=$25 , reddit_url=$26 , soft_cap=$27 , start_time=$28 , telegram_url=$29 , title=$30 , token_release_data=ARRAY[$31]::integer[], total_tx=$32 , twitter_url=$33 , website_url=$34 WHERE id=$35 RETURNING *",
      [
        cancel,
        cis2_amount,
        cis2_price,
        cliff_duration,
        cliff_period,
        description,
        dev_paid,
        discord_url,
        end_time,
        fb_url,
        github_url,
        hard_cap,
        holders,
        address,
        amount,
        instagram_url,
        invest_amount,
        live,
        live_pause_count,
        logo_url,
        maximum_invest,
        minimum_invest,
        owner,
        pause_start,
        pause_until,
        reddit_url,
        soft_cap,
        start_time,
        telegram_url,
        title,
        token_release_data,
        total_tx,
        twitter_url,
        website_url,
        id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
export const deleteData = async (id: number) => {
  try {
    const result = await query("DELETE FROM launchpad_data WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllLaunchpadData = async () => {
  try {
    // const result = await query("SELECT * FROM launchpad_data", []);
    const result = await query("SELECT * FROM rockets", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const createRocketTest = async (rocketTest: any) => {
  try {
    const result = await query(
      "INSERT INTO rockets(title, logo_url, description, cancel, cis2_amount, cis2_price, dev_paid, end_time, hard_cap, invest_amount, address, amount, live, live_pause_count, maximum_invest, minimum_invest, owner, pause_start, pause_until, soft_cap, start_time, total_tx, website_url, fb_url, twitter_url, telegram_url, github_url, instagram_url, discord_url, reddit_url, token_release_data, cliff_duration, cliff_period, token, holders, paused) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36) RETURNING *",
      [
        rocketTest.title,
        rocketTest.logo_url,
        rocketTest.description,
        rocketTest.cancel,
        rocketTest.cis2_amount,
        rocketTest.cis2_price,
        rocketTest.dev_paid,
        rocketTest.end_time,
        rocketTest.hard_cap,
        rocketTest.invest_amount,
        rocketTest.address,
        rocketTest.amount,
        rocketTest.live,
        rocketTest.live_pause_count,
        rocketTest.maximum_invest,
        rocketTest.minimum_invest,
        rocketTest.owner,
        rocketTest.pause_start,
        rocketTest.pause_until,
        rocketTest.soft_cap,
        rocketTest.start_time,
        rocketTest.total_tx,
        rocketTest.website_url,
        rocketTest.fb_url,
        rocketTest.twitter_url,
        rocketTest.telegram_url,
        rocketTest.github_url,
        rocketTest.instagram_url,
        rocketTest.discord_url,
        rocketTest.reddit_url,
        JSON.stringify(rocketTest.token_release_data),
        rocketTest.cliff_duration,
        rocketTest.cliff_period,
        rocketTest.token,
        rocketTest.holders,
        rocketTest.paused,
      ]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getRocketById = async (rocketId: number) => {
  const rocketQuery = "SELECT * FROM rockets WHERE id = $1";
  const rocketResult = await query(rocketQuery, [rocketId]);
  return rocketResult.rows[0];
};

export const updateRocket = async (rocketId: number, updatedRocket: any) => {
  const updateRocketQuery =
    "UPDATE rockets SET holders = $1, invest_amount = $2, total_tx = $3 WHERE id = $4 RETURNING *";
  const updatedRocketResult = await query(updateRocketQuery, [
    updatedRocket.holders,
    updatedRocket.invest_amount,
    updatedRocket.total_tx,
    rocketId,
  ]);
  return updatedRocketResult.rows[0];
};

export const cancelRocket = async (rocketId: number) => {
  const updateRocketQuery =
    "UPDATE rockets SET cancel = true WHERE id = $1 RETURNING *";
  const updatedRocketResult = await query(updateRocketQuery, [rocketId]);

  return updatedRocketResult.rows[0];
};

export const pauseRocketData = async (rocketId: number, rocketData: any) => {
  const updateQuery = `
  UPDATE rockets
  SET
    pause_start = $1,
    pause_until = $2,
    live_pause_count = $3,
    live = $4,
    paused = $5
  WHERE id = $6
  RETURNING *;
`;

  const updateValues = [
    rocketData.pause_start,
    rocketData.pause_until,
    rocketData.live_pause_count,
    rocketData.live,
    rocketData.paused,
    rocketId,
  ];

  const { rows: updatedRocket } = await query(updateQuery, updateValues);

  return updatedRocket[0];
};

export const createholder = async (holders: any) => {
  const insertQuery = `
  INSERT INTO holders (address, claimable_token, cycle_completed, launchpad_id, vested_date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

  const values = [
    holders.address,
    holders.claimable_token,
    holders.cycle_completed,
    holders.launchpad_id,
    holders.vested_date,
  ];
  const result = await query(insertQuery, values);
  return result.rows[0];
};

export const getAllHolders = async () => {
  try {
    const selectAllQuery = "SELECT * FROM holders;";
    const result = await query(selectAllQuery, []);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all holders:", error);
    throw error;
  }
};

export const getHolderById = async (holderId: number) => {
  try {
    const selectByIdQuery = "SELECT * FROM holders WHERE id = $1;";
    const result = await query(selectByIdQuery, [holderId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching holder by ID:", error);
    throw error;
  }
};

export const updateCycleCompleted = async (holderId: number) => {
  try {
    const updateCycleQuery = `
      UPDATE holders
      SET cycle_completed = cycle_completed + 1
      WHERE id = $1
      RETURNING *;
    `;
    const result = await query(updateCycleQuery, [holderId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating cycle_completed:", error);
    throw error;
  }
};
