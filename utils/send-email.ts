import dayjs from "dayjs";
import type { ISubscription } from "../types/index.ts";
import { emailTemplates } from "./email-template.ts";
import { transporter, emailAddress } from "../config/nodemailer.ts";

if (!emailAddress)
	throw new Error("You do not have your EMAIL in the .env file");
export const sendRemainderEmail = async ({
	to,
	type,
	subscription,
}: { to: string; type: string; subscription: ISubscription }) => {
	if (!to || !type) throw new Error("Missing required parameters");

	const template = emailTemplates.find((t) => t.label === type);

	if (!template) throw new Error("Invalid email type");

	const mailInfo = {
		userName: subscription.user.name,
		subscriptionName: subscription.name,
		renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
		planName: subscription.name,
		price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
		paymentMethod: subscription.paymentMethod,
	};

	const message = template.generateBody(mailInfo);
	const subject = template.generateSubject(mailInfo);

	const mailOptions = {
		from: emailAddress,
		to,
		subject,
		html: message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return console.log(error);
		console.log(`Email sent ${info.response}`);
	});
};
