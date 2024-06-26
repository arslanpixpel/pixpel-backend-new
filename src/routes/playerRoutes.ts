import express from "express";
import * as playerController from "../controllers/playerController";
import { checkCookieMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/read/:id", playerController.readPlayer);
router.post("/wallet", playerController.readPlayerWallet);
router.post("/emailCheck", playerController.emailCheck);
router.put("/update/:id", playerController.updatePlayer);
router.put("/updateImg/:id", playerController.updatePlayerImg);
router.delete("/delete/:id", playerController.deletePlayer);
router.get("/getAll", playerController.getAllPlayers);
router.post(
  "/signup",
  express.urlencoded({ extended: false }),
  playerController.signupPlayer
);
router.post(
  "/signin",
  express.urlencoded({ extended: false }),
  playerController.signinPlayer
);
router.post("/forgetPassword", playerController.updatePlayerPasswordController);
router.post("/checkemail", playerController.checkEmailController);
router.get("/checkUser", checkCookieMiddleware, playerController.checkUser);
router.put(
  "/updateDisableStatus/:id",
  playerController.updatePlayerDisableStatusController
);
router.put("/setTwoFa/:id", playerController.updatePlayerTwoFA);
router.put("/updatePlayerWallet/:id", playerController.updatePlayerWallet);

export default router;
