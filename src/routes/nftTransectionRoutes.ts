import express from "express";
import * as transactionController from "../controllers/nftTransection";

const router = express.Router();

router.post("/createtransaction", transactionController.createTransaction);
router.get("/readtransaction/:id", transactionController.readTransaction);
router.put("/updatetransaction/:id", transactionController.updateTransaction);
router.delete(
  "/deletetransaction/:id",
  transactionController.deleteTransaction
);
router.get("/getAlltransaction", transactionController.getAllNftTransactions);
router.get(
  "/getAlltransectionbysellerwallet/:id",
  transactionController.getAllTransactionsBySellerWallet
);

export default router;
