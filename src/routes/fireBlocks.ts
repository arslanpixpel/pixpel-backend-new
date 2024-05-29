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
router.get("/getTotalSupply/:vaultAccountId", fireBlocks.getTotalSupply);
router.post("/getBalanceOf", fireBlocks.getBalanceOf);
router.post("/tokenTransfer", fireBlocks.tokenTransfer);
router.post("/createCollection", fireBlocks.createCollection);
router.post("/mintNft", fireBlocks.mintNft);
router.post("/listNft", fireBlocks.listNft);
router.post("/setApprovalForAll", fireBlocks.setApprovalForAll);
router.post("/buyNft", fireBlocks.buyNft);
router.post("/createNonCustodialWallet", fireBlocks.createNonCustodialWallet);
router.post("/generateJwtToken", fireBlocks.generateJwtToken);
router.post("/createAuction", fireBlocks.createAuction);
router.post("/placeBid", fireBlocks.placeBid);
router.post("/endAuction", fireBlocks.endAuction);
router.post(
  "/createVaultAccountWithAsset",
  fireBlocks.createVaultAccountWithAsset
);
router.get("/getTransactionById", fireBlocks.getTransactionById);
router.get("/getTransactions", fireBlocks.getTransactions);
router.get("/getAllTransactionsById/:id", fireBlocks.getAllTransactionsById);
router.post("/createPair", fireBlocks.createPair);
router.post("/addLiquidity", fireBlocks.addLiquidity);
router.post("/removeLiquidity", fireBlocks.removeLiquidity);

router.post("/addToken", fireBlocks.addToken);
router.post("/swapExactTokensForTokens", fireBlocks.swapExactTokensForTokens);
router.post("/getReserves", fireBlocks.getReserves);
router.post("/addLiquidityETH", fireBlocks.addLiquidityETH);

export default router;
