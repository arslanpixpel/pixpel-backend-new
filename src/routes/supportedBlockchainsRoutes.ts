import express from "express";
import * as blockchainController from "../controllers/blockchainController";

const router = express.Router();

router.get("/read/:id", blockchainController.readBlockchain);
router.post("/create", blockchainController.createBlockchain);
router.put("/update/:id", blockchainController.updateBlockchain);
router.delete("/delete/:id", blockchainController.deleteBlockchain);
router.get("/readAll", blockchainController.readAllBlockchains);

export default router;
