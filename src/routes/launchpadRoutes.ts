import express from "express";
import * as launchpadController from "../controllers/lauchpadController";

const router = express.Router();

router.post("/create", launchpadController.createData);
router.get("/read/:id", launchpadController.readData);
router.put("/update/:id", launchpadController.updateData);
router.delete("/delete/:id", launchpadController.deleteData);
router.get("/getAll", launchpadController.getAllLaunchpadData);
router.post("/createrocket", launchpadController.createRocketTest);
router.post("/invest", launchpadController.invest);
router.put("/cancel/:rocketId", launchpadController.cancelRocket);
router.put("/pause/:rocketId", launchpadController.pauseRocket);
router.post("/createholders", launchpadController.createholder);
router.put(
  "/updatecyclecompleted/:id",
  launchpadController.updateCycleCompletedController
);
router.get("/getAllHolders", launchpadController.getAllHolders);
router.get("/getHolderbyId/:id", launchpadController.getHolderById);
router.post("/getAllRockets", launchpadController.getAllRockets);

export default router;
