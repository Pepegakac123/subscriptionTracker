import { Router } from "express";
import { sendReminders } from "../controllers/workflow.ts";

const workflowRouter = Router();

workflowRouter.route("/subscription/reminder").post(sendReminders);

export default workflowRouter;
