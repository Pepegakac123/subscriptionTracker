import { Client as WorkflowClient } from "@upstash/workflow";

const qstashToken = process.env.QSTASH_TOKEN;
const qstashUrl = process.env.QSTASH_URL;

if (!qstashToken) {
	throw new Error("You don't have a qstashToken defined in your env");
}
if (!qstashUrl) {
	throw new Error("You don't have a qstashUrl defined in your env");
}

export const workflowClient = new WorkflowClient({
	baseUrl: qstashUrl,
	token: qstashToken,
});
