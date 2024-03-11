import express from "express";
import * as fireBlocks from "../controllers/fireBlocks";

const router = express.Router();

router.post("/createVaultAccount", fireBlocks.createVaultAccount);
router.get(
  "/getVaultAccountsWithPageInfo",
  fireBlocks.getVaultAccountsWithPageInfo
);
router.get("/getVaultAccountAsset", fireBlocks.getVaultAccountAsset);
router.post("/createVaultAsset", fireBlocks.createVaultAsset);
router.post("/createTransaction", fireBlocks.createTransaction);
router.get("/getVaultAccountById/:id", fireBlocks.getVaultAccountById);
router.get("/getSupportedAssets", fireBlocks.getSupportedAssets);
router.get("/getExchangeAccounts", fireBlocks.getExchangeAccounts);
router.get("/getTotalSupply", fireBlocks.getTotalSupply);
router.post("/getBalanceOf", fireBlocks.getBalanceOf);
router.post("/tokenTransfer", fireBlocks.tokenTransfer);

export default router;
