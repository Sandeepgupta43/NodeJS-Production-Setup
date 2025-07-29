import { Router } from "express";

import apiController from "../controller/api.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = Router();


router.use(rateLimiter);
router.route("/self").get(apiController.self);
router.route("/health").get(apiController.health);
router.route("/users").get(apiController.getUser);

export default router;