import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import aj from "../config/arcjet.ts";

export const arcjetMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const decision = await aj.protect(req, { requested: 1 });
		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				res
					.status(StatusCodes.TOO_MANY_REQUESTS)
					.json({ error: "Rate limit exceeded" });
				return;
			}
			if (decision.reason.isBot()) {
				res.status(StatusCodes.FORBIDDEN).json({ error: "Bot detected" });
				return;
			}
			res.status(StatusCodes.FORBIDDEN).json({ error: "Access denied" });
			return;
		}

		next();
	} catch (error) {
		console.error(`Arcjet Middleware Error: ${error}`);
		next(error);
	}
};
