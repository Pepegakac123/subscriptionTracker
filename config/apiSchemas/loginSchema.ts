import { z } from "zod";
import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { SignInUserSchema } from "../../schema/AuthSchemas.ts";

export const loginApiSchema: RouteConfig = {
	method: "post",
	path: "/auth/sign-in",
	tags: ["Authentication"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: SignInUserSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "User signed in successfully",
			content: {
				"application/json": {
					schema: z.object({
						success: z.boolean(),
						message: z.string(),
						data: z.object({
							token: z.string(),
							user: SignInUserSchema.omit({ password: true }).extend({
								id: z.string(),
								name: z.string(),
								createdAt: z.date().optional(),
								updatedAt: z.date().optional(),
							}),
						}),
					}),
				},
			},
		},
		400: {
			description: "Invalid Password",
		},
		404: {
			description: "User does not exist",
		},
	},
};
