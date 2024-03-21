import express from "express";
import * as biddingController from "../controllers/nftbiddingController";

const router = express.Router();

router.post("/createbidding", biddingController.createBidding);
router.get("/readbidding/:id", biddingController.readBidding);
router.put("/updatebidding/:id", biddingController.updateBidding);
router.delete("/deletebidding/:id", biddingController.deleteBidding);
router.get("/getAllbidding", biddingController.getAllBiddings);
router.get(
  "/getAllbiddingbynftauction/:id",
  biddingController.getAllBiddingsByAuction
);
router.get(
  "/getAllBiddingsWinnerByAuction/:id",
  biddingController.getAllBiddingsWinnerByAuction
);

export default router;
