// types/express/index.d.ts
import type mongoose from "mongoose";
import User from "../../db/models/user.model"; // Remove the .ts extension

declare global {
	namespace Express {
		interface Request {
			user?: mongoose.Document & {
				name: string;
				email: string;
				password: string;
				createdAt: Date;
				updatedAt: Date;
			}; // Or use a more specific type
		}
	}
}
