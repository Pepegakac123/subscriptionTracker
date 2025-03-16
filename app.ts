import express from "express";
const port = process.env.PORT || "3000";
import authRouter from "./routes/auth.ts";
import userRouter from "./routes/user.ts";
import subscriptionRouter from "./routes/subscription.ts";
import { errorHandlerMiddleware } from "./middleware/errorMiddleware.ts";
import connectToDb from "./db/db.ts";
import { arcjetMiddleware } from "./middleware/arcjetMiddleware.ts";
import workflowRouter from "./routes/workflow.ts";
import { openapiSpecification } from "./config/swagger.ts";
import { apiReference } from "@scalar/express-api-reference";
import setupSwaggerAndScalar from "./middleware/swaggerMiddleware.ts";

const app = express();
app.use(arcjetMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Welcome to the subscription tracker");
});

app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workflows", workflowRouter);
await setupSwaggerAndScalar(app);

app.use(errorHandlerMiddleware);

try {
	app.listen(port, async () => {
		console.log(`Subscription Tracker Api is running on port ${port}`);
		await connectToDb();
	});
} catch (error) {
	console.log(error);
}
