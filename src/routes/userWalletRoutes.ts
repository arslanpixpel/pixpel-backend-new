import express from "express";
import * as userWalletsControllers from "../controllers/userWalletsController";

const router = express.Router();

router.post("/create", userWalletsControllers.createWallet);
router.get("/get", userWalletsControllers.getAllWalletsAndAccounts);
router.get("/getUserByWallet/:wallet", userWalletsControllers.getDevByWallet);
router.get("/getWalletByUser/:userId", userWalletsControllers.getDeveloperById);
router.delete("/delete/:userId", userWalletsControllers.deleteWalletByUserId);

export default router;
