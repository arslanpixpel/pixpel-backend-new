import { Router } from "express";
import multer from "multer";
import { handlePinata } from "../controllers/pinataController";

const route = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/addJson", upload.single("file"), handlePinata);

export default route;
