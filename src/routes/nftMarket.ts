import express from "express";
import * as marketController from "../controllers/nftmarketController";

const router = express.Router();

router.post("/createNftMarket", marketController.createNftMarket);
router.get("/readNftMarket/:id", marketController.readNftMarket);
router.put("/updateNftMarket/:id", marketController.updateNftMarket);
router.delete("/deleteNftMarket/:id", marketController.deleteNftMarket);
router.get("/getAllNftMarkets", marketController.getAllNftMarkets);

export default router;
