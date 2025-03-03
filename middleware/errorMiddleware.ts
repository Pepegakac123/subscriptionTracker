import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.ts";

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
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
	return;
};
