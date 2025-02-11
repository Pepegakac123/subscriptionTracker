import type { NextFunction, Request } from "express";

export interface errorMiddleware {
	err: Error;
	req: Request;
	res: Response;
	next: NextFunction;
}
