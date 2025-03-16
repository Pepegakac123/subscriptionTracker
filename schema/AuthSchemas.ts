import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const UserSchema = z.object({
	name: z.string().min(2).openapi({ description: "Username" }),
	email: z.string().email().openapi({ description: "User email" }),
	password: z.string().min(6).openapi({ description: "User password" }),
});
