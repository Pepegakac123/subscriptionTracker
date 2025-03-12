import { StatusCodes } from "http-status-codes";
import Subscription from "../db/models/subscription.model.ts";
import type { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../errors/index.ts";
import { workflowClient } from "../config/upstash.ts";

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

		if (!process.env.SERVER_URL)
			throw new Error("You do not have SERVER_URL defined in your env file");

		const { workflowRunId } = await workflowClient.trigger({
			url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
			body: {
				subscriptionId: subscription.id,
			},
			headers: {
				"content-type": "application/json",
			},
			retries: 0,
		});

		res
			.status(201)
			.json({ success: true, data: { subscription, workflowRunId } });
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
