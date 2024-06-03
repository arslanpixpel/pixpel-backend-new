import express from "express";
import cors from "cors";
import developerRoutes from "./routes/developerRoutes";
import playerRoutes from "./routes/playerRoutes";
import orderRoutes from "./routes/nftorderRoutes";
import nftRoutes from "./routes/nftRoutes";
import cartRoutes from "./routes/cartRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import launchpadRoutes from "./routes/launchpadRoutes";
import tokenreleaseRoutes from "./routes/tokenreleaseRoutes";
import gamedashboard from "./routes/gamedashboard";
import pinata from "./routes/pinata";
import emailValidate from "./routes/emailValidate";
import mobileValidate from "./routes/mobileValidate";
import nftTransection from "./routes/nftTransectionRoutes";
import nftMarket from "./routes/nftMarketRoutes";
import nftAuctions from "./routes/nftAuctionsRoutes";
import nftBidiing from "./routes/nftBiddingRoutes";
import uploadImage from "./routes/imageRoutes";
import fireblocks from "./routes/fireBlocks";
import authentication from "./routes/authRoutes";
import p2pProfile from "./routes/p2pProfileRoutes";
import dexTesting from "./routes/dexTestingRoutes";
const cron = require("node-cron");
import cookieParser from "cookie-parser";
import { query } from "./db";

const app = express();
const port = process.env.PORT ?? 3001;
const swaggerDoc = require("swagger-ui-express");
// const pinata = require("./routes/pinata");
// const emailValidate = require('./routes/emailValidate');
// const mobileValidate = require('./routes/mobileValidate');
const swaggerDocumentation = require("./helper/Documentation.ts");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

// app.use(
//   fileUpload({
//     useTempFiles: false,
//     safeFileNames: true,
//     preserveExtension: true,
//     tempFileDir: `${__dirname}/uploads/`,
//   })
// );
// app.use("/", upload);
app.use("/pinata", pinata);
app.use("/email", emailValidate);
app.use("/mobile", mobileValidate);
app.use("/developers", developerRoutes);
app.use("/players", playerRoutes);
app.use("/orders", orderRoutes);
app.use("/nfts", nftRoutes);
app.use("/cart", cartRoutes);
app.use("/collections", collectionRoutes);
app.use("/launchpad", launchpadRoutes);
app.use("/tokenrelease", tokenreleaseRoutes);
app.use("/gamedashboard", gamedashboard);
app.use("/nfttransection", nftTransection);
app.use("/nftMarket", nftMarket);
app.use("/nftauction", nftAuctions);
app.use("/nftbidding", nftBidiing);
app.use("/uploadimage", uploadImage);
app.use("/fireBlocks", fireblocks);
app.use("/authentication", authentication);
app.use("/p2pProfile", p2pProfile);
app.use("/dexTesting", dexTesting);

cron.schedule("* * * * *", async () => {
  try {
    const nfts = await query("SELECT * FROM nfts", []);
    if (nfts.rows.length) {
      const polygonInsuranceNfts = nfts.rows
        .filter((nft) => nft.blockchain !== "Concordium")
        .filter(
          (nft) =>
            nft.insurance_per_hour > 0 &&
            nft.secondary_owner.length > 0 &&
            nft.secondary_owner.some((owner: any) => owner.insurance === true)
        );
      // console.log(polygonInsuranceNfts);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
