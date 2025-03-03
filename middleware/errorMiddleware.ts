import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.ts";
import mongoose from "mongoose";

export const errorHandlerMiddleware: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof CustomAPIError) {
		res.status(err.statusCode).json({ msg: err.message });
		return;
	}
	// Check if it's a Mongoose error
	if (err instanceof mongoose.Error) {
		// Handle specific Mongoose error types
		if (err.name === "CastError") {
			const error = new Error("Resource not found");
			// @ts-ignore: Adding statusCode property
			error.statusCode = StatusCodes.NOT_FOUND;
			res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
			return;
		}

		if (err.name === "ValidationError") {
			// @ts-ignore: Accessing errors property on ValidationError
			const message = Object.values(err.errors)
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				.map((val: any) => val.message)
				.join(", ");
			const error = new Error(message);
			// @ts-ignore: Adding statusCode property
			error.statusCode = StatusCodes.BAD_REQUEST;
			res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
			return;
		}
	}

	// Handle MongoDB driver error for duplicate keys (not a Mongoose error)
	// @ts-ignore: Using any type to access code property
	if (err.name === "MongoServerError" && err.code === 11000) {
		const error = new Error("Duplicate field value entered");
		// @ts-ignore: Adding statusCode property
		error.statusCode = StatusCodes.BAD_REQUEST;
		res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
		return;
	}
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
	return;
};
