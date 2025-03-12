import { Router } from "express";
import authorize from "../middleware/authMiddleware.ts";
import {
	createSubscription,
	getUserSubscriptions,
} from "../controllers/subscription.ts";

const router = Router();

router.route("/").all(authorize).post(createSubscription);
router.route("/:id");
router.route("/user/:id").all(authorize).get(getUserSubscriptions);
router.route("/:id/cancel");
router.route("/upcoming-renewals");

export default router;
