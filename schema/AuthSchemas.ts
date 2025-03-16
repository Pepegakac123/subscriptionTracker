import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const SignUpUserSchema = z.object({
	name: z
		.string()
		.min(2)
		.openapi({ description: "Username", example: "Andrzyj" }),
	email: z
		.string()
		.email()
		.openapi({ description: "User email", example: "Andrzyj@gmail.com" }),
	password: z
		.string()
		.min(6)
		.openapi({ description: "User password", example: "Andrzyj@#!@#" }),
});

export const SignInUserSchema = z.object({
	email: z
		.string()
		.email()
		.openapi({ description: "User email", example: "Andrzyj@gmail.com" }),
	password: z
		.string()
		.min(6)
		.openapi({ description: "User password", example: "Andrzyj@#!@#" }),
});
