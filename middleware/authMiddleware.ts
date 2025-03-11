import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../db/models/user.model";
import type { JwtPayload } from "../types/index.ts";

const jwtSecret = process.env.JWT_SECRET;
const authorize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token: string | undefined;

		if (req.headers.authorization?.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token)
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: "Unauthorized" });

		if (!jwtSecret)
			throw new Error("You should have JWT_SECRET field in your .env ");
		const decoded: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;

		const user = await User.findById(decoded.userId);

		if (!user)
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: "Unauthorized" });

		req.user = user;
		next();
	} catch (error) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Unauthorized", error: error.message });
	}
};
