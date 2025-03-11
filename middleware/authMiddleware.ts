import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/user.model.ts";

const authorize: RequestHandler = async (req, res, next) => {
	try {
		// Logika autoryzacji
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			res.status(401).json({ message: "No token, authorization denied" });
			return;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			userId: string;
		};
		const user = await User.findById(decoded.userId);

		if (!user) {
			res.status(401).json({ message: "User not found" });
			return;
		}

		// Przypisanie usera do obiektu request
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token is not valid" });
	}
};

export default authorize;
