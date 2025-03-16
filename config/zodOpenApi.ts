import { z } from "zod";
import {
	OpenAPIRegistry,
	extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { SignUpUserSchema } from "../schema/AuthSchemas.ts";
import { registerApiSchema } from "./apiSchemas/registerSchema.ts";
import { loginApiSchema } from "./apiSchemas/loginSchema.ts";
import { logoutApiSchema } from "./apiSchemas/logoutSchema.ts";

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

// Rejestracja endpointu
registry.registerPath(registerApiSchema);
registry.registerPath(loginApiSchema);
registry.registerPath(logoutApiSchema);

// Generowanie dokumentu OpenAPI
const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiDocument = generator.generateDocument({
	openapi: "3.0.0",
	info: {
		title: "Subscription Tracker - API",
		version: "1.0.0",
	},
	servers: [
		{
			url: "/api/v1",
			description: "API Server",
		},
	],
});

export { openApiDocument, SignUpUserSchema };
