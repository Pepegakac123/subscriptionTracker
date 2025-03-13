import nodemailer from "nodemailer";
export const emailAddress = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
if (!emailAddress)
	throw new Error("You do not have your EMAIL in the .env file");
if (!emailPassword)
	throw new Error("You do not have your EMAIL_PASSWORD in the .env file");

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: emailAddress,
		pass: emailPassword,
	},
});
