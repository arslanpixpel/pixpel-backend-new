import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "Pixpel-backend",
  // database: "postgres",
  password: "ubuntu",
  port: 5432,
});

const createTable = async (tableName: string, columns: string) => {
  const result = await pool.query(
    `
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = $1
        )
    `,
    [tableName]
  );
  const tableExists = result.rows[0].exists;
  if (!tableExists) {
    await pool.query(`CREATE TABLE ${tableName} (${columns})`);
  }
};

// Assuming createTable is a function that executes SQL statements
createTable(
  "players",
  `
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  wallet TEXT NOT NULL,
  contact_details BIGINT NULL,
  password TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE NOT NULL,
  img TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  dateOfLaunch DATE DEFAULT CURRENT_DATE NOT NULL,
  country TEXT DEFAULT NULL,
  launchedAtPixpel TEXT DEFAULT 'No',
  legalName TEXT DEFAULT NULL,
  perPercentage TEXT DEFAULT NULL,
  percentage TEXT DEFAULT NULL,
  shareHolders TEXT DEFAULT NULL,
  zetawallet TEXT DEFAULT NULL
  `
);

createTable(
  "rockets",
  `
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  description TEXT NOT NULL,
  cancel BOOLEAN NOT NULL,
  cis2_amount INTEGER NOT NULL,
  cis2_price INTEGER NOT NULL,
  dev_paid INTEGER NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  hard_cap INTEGER NOT NULL,
  invest_amount INTEGER NOT NULL,
  address TEXT NOT NULL,
  amount INTEGER NOT NULL,
  live BOOLEAN NOT NULL,
  live_pause_count INTEGER NOT NULL,
  maximum_invest INTEGER NOT NULL,
  minimum_invest INTEGER NOT NULL,
  owner TEXT NOT NULL,
  pause_start TIMESTAMP WITH TIME ZONE NOT NULL,
  pause_until TIMESTAMP WITH TIME ZONE NOT NULL,
  soft_cap INTEGER NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  total_tx INTEGER NOT NULL,
  website_url TEXT NOT NULL,
  fb_url TEXT NOT NULL,
  twitter_url TEXT NOT NULL,
  telegram_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  discord_url TEXT NOT NULL,
  reddit_url TEXT NOT NULL,
  token_release_data JSONB NOT NULL,
  cliff_duration BIGINT NOT NULL,
  cliff_period TIMESTAMP WITH TIME ZONE NOT NULL,
  token TEXT NOT NULL,
  holders JSONB[],
  paused BOOLEAN NOT NULL
  `
);

createTable(
  "holders",
  `
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  claimable_token INTEGER,
  cycle_completed INTEGER,
  launchpad_id INTEGER,
  vested_date TIMESTAMP
  `
);

createTable(
  "developers",
  `
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  wallet TEXT NOT NULL,
  contact_details BIGINT NULL,
  password TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE NOT NULL,
  img TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  dateOfLaunch DATE DEFAULT CURRENT_DATE NOT NULL,
  country TEXT DEFAULT NULL,
  launchedAtPixpel TEXT DEFAULT 'No',
  legalName TEXT DEFAULT NULL,
  perPercentage TEXT DEFAULT NULL,
  percentage TEXT DEFAULT NULL,
  shareHolders TEXT DEFAULT NULL,
  zetawallet TEXT DEFAULT NULL
  `
);
// createTable(
//   "collections",
//   "id SERIAL PRIMARY KEY, developer_id INTEGER NOT NULL REFERENCES developers(id), name TEXT NOT NULL"
// );

createTable(
  "collections",
  `id SERIAL PRIMARY KEY, 
   developer_id INTEGER NOT NULL REFERENCES developers(id), 
   name TEXT NOT NULL, 
   url TEXT, 
   description TEXT, 
   logo_image TEXT, 
   featured_image TEXT, 
   banner_image TEXT, 
   kind JSONB, 
   category JSONB, 
   sub_category JSONB,
   collection_address TEXT DEFAULT NULL,  
   blockchain TEXT`
);

// createTable(
//   "nfts",
//   "id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, royalty_commission INTEGER NOT NULL, primary_owner TEXT NOT NULL, ownership TEXT[] NOT NULL, type TEXT NOT NULL CHECK (type IN ('mystery', 'open')), collection_id INTEGER REFERENCES collections(id)"
// );

createTable(
  "nfts",
  "id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, royalty_commission INTEGER NOT NULL, primary_owner TEXT NOT NULL, secondary_owner JSONB[], type TEXT NOT NULL, category TEXT NOT NULL, img TEXT NOT NULL ,collection_id INTEGER NOT NULL REFERENCES collections(id), kind TEXT NOT NULL, properties JSONB NOT NULL, blockchain TEXT NOT NULL, supply_quantity INTEGER NOT NULL, contact_address TEXT NOT NULL, token_id TEXT NOT NULL, token_standard TEXT NOT NULL, creator_fee TEXT NOT NULL, open_auction JSONB, fix_price JSONB, mystery_box JSONB, level INTEGER NOT NULL, sub_category TEXT NOT NULL, insurance_per_hour INTEGER NOT NULL, listingid TEXT DEFAULT NULL"
);

createTable(
  "nftorders",
  "id SERIAL PRIMARY KEY, player_id INTEGER NOT NULL REFERENCES players(id), nft_id INTEGER NOT NULL REFERENCES nfts(id), developer_id INTEGER NOT NULL REFERENCES developers(id)"
);

createTable(
  "nftmarket",
  "id SERIAL PRIMARY KEY, nft_id INTEGER NOT NULL REFERENCES nfts(id), listing BOOLEAN NOT NULL, seller TEXT NOT NULL, resell BOOLEAN NOT NULL, reselling_price FLOAT DEFAULT NULL, reselling_listingid INTEGER DEFAULT NULL, reselling_name TEXT DEFAULT NULL"
);

createTable(
  "nft_transection",
  "id SERIAL PRIMARY KEY, nfttoken_id INTEGER NOT NULL, nft_id INTEGER NOT NULL REFERENCES nfts(id), buyyer TEXT NOT NULL, seller TEXT NOT NULL, transection_hash TEXT NOT NULL, transection_time TEXT NOT NULL, price INTEGER NOT NULL"
);

createTable(
  "cart",
  "id SERIAL PRIMARY KEY, player_id INTEGER NOT NULL REFERENCES players(id), nft_id INTEGER NOT NULL REFERENCES nfts(id), developer_id INTEGER NOT NULL REFERENCES developers(id)"
);

// createTable(
//   "launchpad_data",
//   "id SERIAL PRIMARY KEY, cancel BOOLEAN NOT NULL, cis2_amount INTEGER NOT NULL, cis2_price INTEGER NOT NULL, cliff_duration INTEGER NOT NULL, cliff_period TEXT NOT NULL, description TEXT NOT NULL, dev_paid INTEGER NOT NULL, discord_url TEXT, end_time TEXT NOT NULL, fb_url TEXT, github_url TEXT, hard_cap INTEGER NOT NULL, holders INTEGER NOT NULL, address TEXT NOT NULL, amount INTEGER NOT NULL, instagram_url TEXT, invest_amount INTEGER NOT NULL, live BOOLEAN NOT NULL, live_pause_count INTEGER NOT NULL, logo_url TEXT NOT NULL, maximum_invest INTEGER NOT NULL, minimum_invest INTEGER NOT NULL, owner TEXT NOT NULL, pause_start TEXT NOT NULL, pause_until TEXT NOT NULL, reddit_url TEXT, soft_cap INTEGER NOT NULL,start_time TEXT NOT NULL,telegram_url TEXT,title TEXT NOT NULL,token_release_data INTEGER[] NOT NULL,total_tx INTEGER NOT NULL,twitter_url TEXT,website_url TEXT"
// );

createTable(
  "launchpad_data",
  "id SERIAL PRIMARY KEY, cancel BOOLEAN NOT NULL, cis2_amount INTEGER NOT NULL, cis2_price INTEGER NOT NULL, cliff_duration INTEGER NOT NULL, cliff_period TEXT NOT NULL, description TEXT NOT NULL, dev_paid INTEGER NOT NULL, discord_url TEXT, end_time TEXT NOT NULL, fb_url TEXT, github_url TEXT, hard_cap INTEGER NOT NULL, holders INTEGER NOT NULL, address TEXT NOT NULL, amount INTEGER NOT NULL, instagram_url TEXT, invest_amount INTEGER NOT NULL, live BOOLEAN NOT NULL, live_pause_count INTEGER NOT NULL, logo_url TEXT NOT NULL, maximum_invest INTEGER NOT NULL, minimum_invest INTEGER NOT NULL, owner TEXT NOT NULL, pause_start TEXT NOT NULL, pause_until TEXT NOT NULL, reddit_url TEXT, soft_cap INTEGER NOT NULL, start_time TEXT NOT NULL, telegram_url TEXT, title TEXT NOT NULL, token_release_data JSONB NOT NULL, total_tx INTEGER NOT NULL, twitter_url TEXT, website_url TEXT, token TEXT NOT NULL"
);

createTable(
  "token_release_data",
  "id SERIAL PRIMARY KEY, per_cycle_release INTEGER NOT NULL, release_time TEXT NOT NULL"
);

// createTable(
//   "game_dashboard",
//   "id SERIAL PRIMARY KEY, title_1 TEXT NOT NULL, title_2 TEXT NOT NULL, para_1 TEXT NOT NULL, para_2 TEXT NOT NULL, banner_image_1 TEXT NOT NULL, banner_image_2 TEXT NOT NULL, banner_image_3 TEXT NOT NULL, team_members JSONB[]"
// );

createTable(
  "game_dashboard",
  "id SERIAL PRIMARY KEY, title_1 TEXT NOT NULL, title_2 TEXT NOT NULL, para_1 TEXT NOT NULL, para_2 TEXT NOT NULL, banner_image_1 TEXT NOT NULL, banner_image_2 TEXT NOT NULL, banner_image_3 TEXT NOT NULL, team_members JSONB[], developer_id INTEGER NOT NULL, developer_wallet TEXT NOT NULL, pixpel_studio_heading TEXT, pixpel_para1 TEXT, pixpel_para2 TEXT"
);

export const query = (text: string, params: any[]) => pool.query(text, params);

// import { Pool } from "pg";

// const pool = new Pool({
//   user: "postgres",
//   host: "127.0.0.1",
//   database: "postgres",
//   password: "postgres",
//   port: 5050,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// const connectDB = async () => {
//   try {
//     await pool.connect();
//     console.log("Database connected successfully");
//   } catch (err: any) {
//     console.error("Database connection error", err);
//   }
// };

// connectDB();

// const createTable = async (tableName: string, columns: string) => {
//   try {
//     const result = await pool.query(
//       `
//           SELECT EXISTS (
//               SELECT FROM information_schema.tables
//               WHERE table_name = $1
//           )
//       `,
//       [tableName]
//     );
//     const tableExists = result.rows[0].exists;
//     if (!tableExists) {
//       await pool.query(`CREATE TABLE ${tableName} (${columns})`);
//       console.log(`Table ${tableName} created successfully.`);
//     }
//   } catch (error) {
//     console.error(`Error creating table ${tableName}:`, error);
//   }
// };

// const createTables = async () => {
//   try {
//     await createTable(
//       "users",
//       "id SERIAL PRIMARY KEY , name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL"
//     );
//     await pool.query(
//       `INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password'), ('Jane Doe', 'jane@example.com', 'password'), ('Alice', 'alice@example.com', 'password'), ('Bob', 'bob@example.com', 'password'), ('Charlie', 'charlie@example.com', 'password');`
//     );

//     await createTable(
//       "collection",
//       "id SERIAL PRIMARY KEY, name TEXT, description TEXT, primary_owner INTEGER REFERENCES users(id)"
//     );
//     await pool.query(
//       `INSERT INTO collection (name, description, primary_owner) VALUES ('Collection 1', 'Description 1', 1), ('Collection 2', 'Description 2', 2), ('Collection 3', 'Description 3', 3), ('Collection 4', 'Description 4', 4), ('Collection 5', 'Description 5', 5);`
//     );

//     await createTable(
//       "nfts",
//       "id SERIAL PRIMARY KEY, name TEXT, nft_url TEXT, description TEXT, royalties TEXT, size TEXT, properties TEXT, price TEXT, on_sale BOOLEAN, primary_owner INTEGER REFERENCES users(id), current_owner INTEGER REFERENCES users(id)"
//     );
//     await pool.query(
//       `INSERT INTO nfts (name, nft_url, description, royalties, size, properties, price, on_sale, primary_owner, current_owner) VALUES ('NFT 1', 'url1.com', 'Description 1', '10%', '100x100', 'Properties 1', '$1000', true, 1, 1), ('NFT 2', 'url2.com', 'Description 2', '20%', '200x200', 'Properties 2', '$2000', false, 2, 2), ('NFT 3', 'url3.com', 'Description 3', '30%', '300x300', 'Properties 3', '$3000', true, 3, 3), ('NFT 4', 'url4.com', 'Description 4', '40%', '400x400', 'Properties 4', '$4000', false, 4, 4), ('NFT 5', 'url5.com', 'Description 5', '50%', '500x500', 'Properties 5', '$5000', true, 5, 5);`
//     );

//     await createTable(
//       "nft_collection",
//       "id SERIAL UNIQUE, collection_id INTEGER REFERENCES collection(id), nft_id INTEGER REFERENCES nfts(id), PRIMARY KEY (collection_id, nft_id)"
//     );
//     await pool.query(`
//     INSERT INTO nft_collection (collection_id, nft_id)
//     VALUES (1,1), (2,2), (3,3), (4,4), (5,5)
//     ON CONFLICT (collection_id, nft_id)
//     DO UPDATE SET collection_id = EXCLUDED.collection_id, nft_id = EXCLUDED.nft_id;
//   `);

//     console.log("Dummy data inserted successfully.");
//   } catch (error) {
//     console.error("Error creating tables:", error);
//   }
// };

// createTables();
