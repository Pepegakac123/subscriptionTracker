import { StatusCodes } from "http-status-codes";
import Subscription from "../db/models/subscription.model.ts";
import type { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../errors/index.ts";

export const createSubscription = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user?.id,
		});

		res.status(StatusCodes.CREATED).json({ success: true, data: subscription });
	} catch (error) {
		next(error);
	}
};
export const getUserSubscriptions = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (req?.user?.id !== req.params.id) {
			throw new Unauthorized("You are not the owner of this account");
		}

		const subscriptions = await Subscription.find({ user: req.params.id });

		res.status(StatusCodes.OK).json({ success: true, data: subscriptions });
	} catch (error) {
		next(error);
	}
};
