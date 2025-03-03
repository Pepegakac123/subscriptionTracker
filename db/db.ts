import mongoose from "mongoose";

if (!process.env.DB_URL) {
	throw new Error("Please provide a database url inside a .env file");
}

const connectToDb = async () => {
	try {
		await mongoose.connect(process.env.DB_URL as string);

		console.log("Connected to database");
	} catch (error) {
		console.error("Error connecting to database", error);
		process.exit(1);
	}
};

export default connectToDb;
