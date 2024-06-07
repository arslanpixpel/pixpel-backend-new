import express from "express";
import * as developerController from "../controllers/developerController";

const router = express.Router();

router.get("/read/:id", developerController.readDeveloper);
router.post("/wallet", developerController.readDeveloperByWallet);
router.post("/emailCheck", developerController.readDeveloperByEmail);
router.put("/update/:id", developerController.updateDeveloper);
router.put("/updateImg/:id", developerController.updateDeveloperImg);
router.delete("/delete/:id", developerController.deleteDeveloper);
router.get("/getAll", developerController.getAllDevelopers);
router.post(
  "/signup",
  express.urlencoded({ extended: false }),
  developerController.signupDeveloper
);
router.post(
  "/signin",
  express.urlencoded({ extended: false }),
  developerController.signinDeveloper
);
router.post(
  "/forgetPassword",
  developerController.updatePlayerPasswordController
);
router.post("/checkemail", developerController.checkEmailController);
router.put(
  "/updateDisableStatus/:id",
  developerController.updateDeveloperDisableStatusController
);

export default router;
