import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";

if (!process.env.ARCJET_KEY) {
	throw new Error("You are missing arcjet api key env");
}

const aj = arcjet({
	key: process.env.ARCJET_KEY,
	characteristics: ["ip.src"],
	rules: [
		shield({ mode: "LIVE" }),
		detectBot({
			mode: "LIVE",
			allow: ["CATEGORY:SEARCH_ENGINE"],
		}),
		tokenBucket({
			mode: "LIVE",
			refillRate: 5,
			interval: 10,
			capacity: 10,
		}),
	],
});

export default aj;
