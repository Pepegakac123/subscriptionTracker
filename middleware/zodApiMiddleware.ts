import { apiReference } from "@scalar/express-api-reference";
import type { Express } from "express";
import { openApiDocument } from "../config/zodOpenApi.ts";

export default async function setupZodApiAndScalar(
	app: Express,
): Promise<Express> {
	app.get("/openapi.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(openApiDocument);
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
