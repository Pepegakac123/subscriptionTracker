import { apiReference } from "@scalar/express-api-reference";
import { openapiSpecification } from "../config/swagger.ts";
import type { Express } from "express";

export default async function setupSwaggerAndScalar(
	app: Express,
): Promise<Express> {
	app.get("/openapi.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(openapiSpecification);
	});

	app.use(
		"/reference",
		apiReference({
			url: "/openapi.json",
			defaultHttpClient: {
				targetKey: "node",
				clientKey: "axios",
			},
		}),
	);

	return app;
}
