import { Router } from "express";

const router = Router();

router.route("/");
router.route("/:id");
router.route("/user/:id");
router.route("/:id/cancel");
router.route("/upcoming-renewals");

export default router;
