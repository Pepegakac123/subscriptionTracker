import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth";

const router = Router();

router.route("/sign-up").post(signUp);

router.route("/sign-in").post(signIn);

router.route("/sign-out").post(signOut);

export default router;
