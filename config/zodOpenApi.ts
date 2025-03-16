import { z } from "zod";
import {
	OpenAPIRegistry,
	extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { UserSchema } from "../schema/AuthSchemas.ts";
import { registerApiSchema } from "./apiSchemas/registerSchema.ts";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Rejestracja schematu
registry.register("User", UserSchema);

// Rejestracja endpointu
registry.registerPath(registerApiSchema);

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

export { openApiDocument, UserSchema };
