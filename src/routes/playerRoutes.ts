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
router.post("/signup", playerController.signupPlayer);
router.post("/signin", playerController.signinPlayer);
router.post("/forgetPassword", playerController.updatePlayerPasswordController);
router.post("/checkemail", playerController.checkEmailController);
router.get("/hello", checkCookieMiddleware, playerController.hello);

export default router;
