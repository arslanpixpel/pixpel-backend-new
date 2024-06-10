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
import userWalletRoutes from "./routes/userWalletRoutes";
import uploadImage from "./routes/imageRoutes";
import fireblocks from "./routes/fireBlocks";
import authentication from "./routes/authRoutes";
import p2pProfile from "./routes/p2pProfileRoutes";
import dexTesting from "./routes/dexTestingRoutes";
const cron = require("node-cron");
import cookieParser from "cookie-parser";
import { query } from "./db";
import { deleteSessionByIp } from "./controllers/sessionController";
import { handleError } from "./helper/Responses";
import session from "express-session";

const app = express();
const port = process.env.PORT ?? 3001;
const swaggerDoc = require("swagger-ui-express");
// const pinata = require("./routes/pinata");
// const emailValidate = require('./routes/emailValidate');
// const mobileValidate = require('./routes/mobileValidate');
const swaggerDocumentation = require("./helper/Documentation.ts");

// app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "yoursecret",
    cookie: {
      domain: "pixpel.io",
      maxAge: 1000 * 60 * 24 * 30, // 30 days
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

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
app.use("/userWallets", userWalletRoutes);
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
app.get("/logout", async (req: any, res: any) => {
  try {
    req.session.token = null;
    req.session.save(function (err: any) {
      if (err) handleError(err, res);

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err: any) {
        if (err) handleError(err, res);
        res.sendStatus(200);
      });
    });
  } catch (error) {
    handleError(error, res);
  }
});
app.use("/dexTesting", dexTesting);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
