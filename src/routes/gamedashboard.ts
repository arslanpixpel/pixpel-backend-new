import express from "express";
import * as gamedashboard from "../controllers/gamedashboardController";

const router = express.Router();

router.post("/creategamedashboard", gamedashboard.createGamedashboard);
router.get("/getgamedashboarddata", gamedashboard.getAllGamedashboard);
router.get(
  "/getgamedashboarddeveloperid/:developerId",
  gamedashboard.getGamedashboardByDeveloperId
);
router.get(
  "/getgamedashboardbywallet/:developerWallet",
  gamedashboard.getGamedashboardByWallet
);

export default router;
