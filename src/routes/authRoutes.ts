import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/createDeveloperAuth", authController.createDeveloperAuth);
router.post("/createPlayerAuth", authController.createPlayerAuth);
router.post("/otp/generate", authController.generateOTP);
router.post("/otp/verify", authController.verifyOTP);
router.post("/otp/validate", authController.validateOTP);
router.post("/otp/disable", authController.disableOTP);

export default router;
