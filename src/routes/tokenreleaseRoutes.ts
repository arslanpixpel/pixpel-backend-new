import express from "express";
import * as tokenReleaseDataController from "../controllers/tokenreleaseController";

const router = express.Router();

router.post("/create", tokenReleaseDataController.createTokenReleaseData);
router.get("/read/:id", tokenReleaseDataController.readTokenReleaseData);
router.put("/update/:id", tokenReleaseDataController.updateTokenReleaseData);
router.delete("/delete/:id", tokenReleaseDataController.deleteTokenReleaseData);
router.get("/getAll", tokenReleaseDataController.getAllTokenReleaseData);

export default router;
