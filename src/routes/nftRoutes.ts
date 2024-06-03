import express from "express";
import * as nftController from "../controllers/nftController";
import { query } from "../db";
const cron = require("node-cron");

const router = express.Router();

router.post("/create", nftController.createNft);
router.get("/read/:id", nftController.readNft);
router.put("/update/:id", nftController.updateNft);
router.delete("/delete/:id", nftController.deleteNft);
router.get("/getAll", nftController.getAllNfts);
router.post("/buynft", nftController.buyNft);
router.get(
  "/getNftsbycollection/:collectionid",
  nftController.getNftsByCollectionId
);
cron.schedule("0 * * * *", async () => {
  try {
    const nfts = await query("SELECT * FROM nfts", []);
    const currentDate = new Date();

    if (nfts.rows.length) {
      const polygonInsuranceNfts = nfts.rows
        .filter((nft) => nft.blockchain !== "Concordium")
        .filter(
          (nft) =>
            nft.insurance_per_hour > 0 &&
            nft.secondary_owner.length > 0 &&
            nft.secondary_owner.some((owner: any) => owner.insurance === true)
        );

      for (const nft of polygonInsuranceNfts) {
        const updatedSecondaryOwners = nft.secondary_owner.filter(
          (owner: any) =>
            !(
              owner.insurance &&
              new Date(owner.insurance_expirydate) <= currentDate
            )
        );

        if (updatedSecondaryOwners.length !== nft.secondary_owner.length) {
          // Update the secondary_owner array in the NFT table
          await query("UPDATE nfts SET secondary_owner = $1 WHERE id = $2", [
            updatedSecondaryOwners,
            nft.id,
          ]);

          // Update seller_wallet and listing field in the nftmarket table
          await query(
            "UPDATE nftmarket SET seller_wallet = $1, listing = $2 WHERE id = $3",
            [nft.primary_wallet, true, nft.id]
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
