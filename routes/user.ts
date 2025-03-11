import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.ts";
import authorize from "../middleware/authMiddleware.ts";
const router = Router();

router.route("/").get(authorize, getUsers);
router.route("/:id").get(authorize, getUser);

export default router;
