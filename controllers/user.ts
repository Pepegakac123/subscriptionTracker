import User from "../db/models/user.model.ts";
import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/index.ts";

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const users = await User.find();
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		next(error);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const user = await User.findById(req.params.id).select("-password");

		if (!user) {
			throw new NotFoundError("User does not exists");
		}

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};
