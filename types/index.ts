import type { NextFunction, Request } from "express";
import type { Types } from "mongoose";

export interface errorMiddleware {
	err: Error;
	req: Request;
	res: Response;
	next: NextFunction;
}

export type JwtPayload = {
	userId: string;
};

export interface IUser {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export type SubscriptionFrequency = "daily" | "weekly" | "monthly" | "yearly";
export type SubscriptionCurrency = "PLN" | "USD" | "EUR" | "GBP";
export type SubscriptionCategory =
	| "entertainment"
	| "food"
	| "health"
	| "other";
export type SubscriptionStatus = "active" | "cancelled" | "expired";

export interface ISubscription {
	id?: Types.ObjectId;
	name: string;
	price: number;
	currency: SubscriptionCurrency;
	frequency: SubscriptionFrequency;
	category: SubscriptionCategory;
	paymentMethod: string;
	status: SubscriptionStatus;
	startDate: Date;
	renewalDate?: Date;
	user: IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
