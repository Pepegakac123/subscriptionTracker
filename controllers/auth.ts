import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../db/models/user.model.ts";
import { BadRequestError, NotFoundError } from "../errors/index.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET as string; // Upewniamy się, że to string
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN
	? Number(process.env.JWT_EXPIRES_IN)
	: "3600";

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
) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			throw new NotFoundError("User does not exists");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new BadRequestError("Invalid Password. Try again");
		}

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES,
		});

		res.status(StatusCodes.OK).json({
			success: true,
			message: "User signed in successfully",
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const signOut = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
