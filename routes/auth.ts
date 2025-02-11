import { Router } from "express";

const router = Router();

router.route("/sign-up").post((req, res) => {
	// Handle sign up logic here
	res.send("Sign up endpoint");
});

router.route("/sign-in").post((req, res) => {
	// Handle sign in logic here
	res.send("Sign in endpoint");
});

router.route("/sign-out").post((req, res) => {
	// Handle sign out logic here
	res.send("Sign out endpoint");
});

export default router;
