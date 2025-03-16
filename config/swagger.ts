import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Subscription Tracker - API",
			version: "1.0.0",
		},
		servers: [
			{
				url: `http://localhost:${PORT || 8000}/api/v1`,
				description: "API Server",
			},
		],
	},

	apis: [
		"./src/controllers/*.ts",
		"./controllers/*.ts",
		"./src/routes/*.ts",
		"./routes/*.ts",
		"../controllers/*.ts",
		path.join(__dirname, "../controllers/*.ts"),
	],
};

export const openapiSpecification = await swaggerJsdoc(options);
