import { z } from "zod";
import type { RouteConfig } from "@asteasolutions/zod-to-openapi";

export const logoutApiSchema: RouteConfig = {
	method: "post",
	path: "/auth/sign-out",
	tags: ["Authentication"],
	request: {
		// Tutaj możemy dodać nagłówek autoryzacji jeśli jest wymagany
		// headers: {
		// 	type: "object",
		// 	properties: {
		// 		Authorization: {
		// 			type: "string",
		// 			description: "Bearer token",
		// 		},
		// 	},
		// 	required: ["Authorization"],
		// },
	},
	responses: {
		200: {
			description: "User signed out successfully",
			content: {
				"application/json": {
					schema: z.object({
						success: z.boolean(),
						message: z.string(),
					}),
				},
			},
		},
		401: {
			description: "Unauthorized",
		},
	},
};
