import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../db/models/user.model.ts";
import { BadRequestError } from "../errors/index.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const signUp = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError("User already exists");
		}

		//Hashing

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session },
		);

		const JWT_SECRET = process.env.JWT_SECRET as string; // Upewniamy się, że to string
		const JWT_EXPIRES = process.env.JWT_EXPIRES_IN
			? Number(process.env.JWT_EXPIRES_IN)
			: "3600";

		if (!JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined in environment variables");
		}

		const token = jwt.sign({ userId: newUser[0].id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES, // Sprawdzamy, czy to poprawny format
		});

		await session.commitTransaction();
		session.endSession();

		res.status(StatusCodes.CREATED).json({
			success: true,
			message: "User created successfully",
			data: {
				token,
				user: newUser[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const signIn = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const signOut = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
