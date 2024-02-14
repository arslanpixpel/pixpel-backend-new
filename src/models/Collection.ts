import { query } from "../db";

// interface Collection {
//   developer_id: number;
//   name: string;
// }

interface Kind {
  id: number;
  title: string;
}

interface Category {
  id: number;
  title: string;
}

interface SubCategory {
  id: number;
  title: string;
}

interface Collection {
  developer_id: number;
  name: string;
  url?: string;
  description?: string;
  logo_image?: string;
  featured_image?: string;
  banner_image?: string;
  kind?: Kind[];
  category?: Category[];
  sub_category?: SubCategory[];
  blockchain?: string;
  collection_address?: string;
}
// export const createCollection = async (collection: Collection) => {
//   try {
//     const { developer_id, name } = collection;
//     const result = await query("INSERT INTO collections(developer_id, name) VALUES($1, $2) RETURNING *", [
//       developer_id,
//       name,
//     ]);
//     return result.rows[0];
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };

export const createCollection = async (collection: Collection) => {
  try {
    const {
      developer_id,
      name,
      url,
      description,
      logo_image,
      featured_image,
      banner_image,
      kind,
      category,
      sub_category,
      blockchain,
      collection_address,
    } = collection;

    const result = await query(
      `
      INSERT INTO collections(
        developer_id, name, url, description, 
        logo_image, featured_image, banner_image, 
        kind, category, sub_category, blockchain, collection_address
      ) 
      VALUES(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      ) 
      RETURNING *
      `,
      [
        developer_id,
        name,
        url,
        description,
        logo_image,
        featured_image,
        banner_image,
        JSON.stringify(kind),
        JSON.stringify(category),
        JSON.stringify(sub_category),
        blockchain,
        collection_address,
      ]
    );

    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readCollectionsByCollectionId = async (collectionId: number) => {
  try {
    const result = await query("SELECT * FROM collections WHERE id = $1", [
      collectionId,
    ]);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readCollectionsByDeveloper = async (developerId: number) => {
  try {
    const result = await query(
      "SELECT * FROM collections WHERE developer_id = $1",
      [developerId]
    );
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteCollection = async (id: number) => {
  try {
    const result = await query("DELETE FROM collections WHERE id = $1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllCollections = async () => {
  try {
    const result = await query("SELECT * FROM collections", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
