import express from "express";
import * as dexTestingController from "../controllers/dexTesting";

const router = express.Router();

router.post("/createVaultAccount", dexTestingController.createVaultAccountDex);
router.get(
  "/getVaultAccountByAddress/:address",
  dexTestingController.getVaultAccountByAddress
);
router.get("/getAllVaultAccount", dexTestingController.getAllVaultAccount);

export default router;
