import express from "express";
import * as orderController from "../controllers/nftorderController";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/read/:id", orderController.readOrder);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.get("/getAll", orderController.getAllNftOrders);

export default router;
