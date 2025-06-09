import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingusers", mocksController.getUserMocks);
router.get("/mockingpets", mocksController.getPetMocks);
router.post("/generatedata",mocksController.postUserAndPetsMocks);

export default router;