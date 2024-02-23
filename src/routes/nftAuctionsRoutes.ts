import express from "express";
import * as auctionController from "../controllers/nftauctionController";

const router = express.Router();

router.post("/createauction", auctionController.createAuction);
router.get("/readauction/:id", auctionController.readAuction);
router.put("/updateauction/:id", auctionController.updateAuction);
router.delete("/deleteauction/:id", auctionController.deleteAuction);
router.get("/getAllauction", auctionController.getAllAuctions);
router.get("/getAllauctionbynft/:id", auctionController.getAllAuctionsByNft);

export default router;
