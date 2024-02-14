import express from "express";
import * as cartController from "../controllers/cartController";

const router = express.Router();

router.post("/add", cartController.addToCart);
router.get("/read/:developerId", cartController.readCart);
router.delete("/remove/:developerId/:nftId", cartController.removeFromCart);
router.post("/moveToOrders/:cartId/", cartController.moveToOrders);
router.get("/getAll", cartController.getAllCart);

export default router;
