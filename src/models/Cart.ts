import { query } from "../db";

interface Cart {
  player_id: number;
  nft_id: number;
  developer_id: number;
}

export const addToCart = async (cart: Cart) => {
  try {
    const { player_id: player_id, nft_id: nftId, developer_id: developerId } = cart;
    const result = await query("INSERT INTO cart(player_id, nft_id, developer_id) VALUES($1, $2, $3) RETURNING *", [
      player_id,
      nftId,
      developerId,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const readCart = async (cartId: number) => {
  try {
    const result = await query("SELECT * FROM cart WHERE id = $1", [cartId]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const removeFromCart = async (cartId: number) => {
  try {
    const result = await query("DELETE FROM cart WHERE id = $1", [cartId]);
    return result.rowCount;
  } catch (err) {
    throw err;
  }
};

export const moveToOrders = async (cartId: number) => {
  await query("BEGIN", []);

  try {
    let cartItems = await readCart(cartId);

    if (cartItems.length === 0) {
      throw new Error("Cart ID does not exist or cart is empty");
    }

    for (const item of cartItems) {
      const playerResult = await query("SELECT name FROM players WHERE id = $1", [item.player_id]);
      const playerName = playerResult.rows[0].name;

      await query("INSERT INTO nftorders(player_id, nft_id, developer_id) VALUES($1, $2, $3)", [
        item.player_id,
        item.nft_id,
        item.developer_id,
      ]);

      await query("UPDATE nfts SET primary_owner = $1, ownership = array_append(ownership, $2) WHERE id = $3", [
        playerName,
        item.developer_id,
        item.nft_id,
      ]);

      await removeFromCart(item.id);
    }

    await query("COMMIT", []);
  } catch (err) {
    await query("ROLLBACK", []);
    throw err;
  }
};

export const getAllCart = async () => {
  try {
    const result = await query("SELECT * FROM cart", []);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
