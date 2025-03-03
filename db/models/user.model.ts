import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name"],
			trim: true,
			minLength: 3,
			maxLength: 20,
		},
		email: {
			type: String,
			required: [true, "Please provide a email"],
			unique: true,
			trim: true,
			minLength: 5,
			maxLength: 255,
			match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minLength: 6,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
