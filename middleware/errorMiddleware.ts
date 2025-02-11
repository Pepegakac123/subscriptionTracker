import type {
	NextFunction,
	Request,
	Response,
	ErrorRequestHandler,
} from "express";

const errMiddleware = (
	err: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
