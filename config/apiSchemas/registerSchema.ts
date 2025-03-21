import { z } from "zod";
import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { SignUpUserSchema } from "../zodOpenApi.ts";
// import { UserSchema } from "../../schema/AuthSchemas.ts";

export const registerApiSchema = {
	method: "post",
	path: "/auth/sign-up",
	tags: ["Authentication"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: SignUpUserSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "User created successfully",
			content: {
				"application/json": {
					schema: z.object({
						success: z.boolean(),
						message: z.string(),
						data: z.object({
							token: z.string(),
							user: SignUpUserSchema.omit({ password: true }),
						}),
					}),
				},
			},
		},
		400: {
			description: "Wrong Data",
		},
		404: {
			description: "User Already Exists",
		},
	},
} as RouteConfig;
