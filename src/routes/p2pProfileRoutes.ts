import express from "express";
import * as p2pProfilePlayerController from "../controllers/p2pProfileController";
import { checkCookieMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create",
  checkCookieMiddleware,
  p2pProfilePlayerController.createP2PProfile
);
router.put("/update/:id", p2pProfilePlayerController.updateP2PProfile);
router.delete("/delete/:role/:id", p2pProfilePlayerController.deleteP2PProfile);
router.get("/getAll/:role", p2pProfilePlayerController.getAllP2PProfiles);
router.get(
  "/getByRefId/:role/:id",
  p2pProfilePlayerController.getP2PProfileByRefId
);
router.get(
  "/get/:role/:id",
  checkCookieMiddleware,
  p2pProfilePlayerController.getP2PProfileById
);

export default router;
