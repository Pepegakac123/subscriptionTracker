import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a subscription name"],
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		price: {
			type: Number,
			required: [true, "Please provide a subscription price"],
			min: [0, "Price cannot be negative"],
		},
		currency: {
			type: String,
			enum: ["PLN", "USD", "EUR", "GBP"],
			default: "PLN",
		},
		frequency: {
			type: String,
			enum: ["daily", "weekly", "monthly", "yearly"],
			default: "monthly",
		},
		category: {
			type: String,
			enum: ["entertainment", "food", "health", "other"],
			required: [true, "Please provide a subscription category"],
		},
		paymentMethod: {
			type: String,
			required: [true, "Please provide a payment method"],
			trim: true,
		},
		status: {
			type: String,
			enum: ["active", "cancelled", "expired"],
			default: "active",
		},
		startDate: {
			type: Date,
			required: [true, "Please provide a start date"],
			validate: {
				validator: (value: Date) => {
					return value < new Date();
				},
				message: "Start date cannot be in the future",
			},
		},
		renewalDate: {
			type: Date,
			validate: {
				validator: function (value: Date) {
					return value < this.startDate;
				},
				message: "Renewal date cannot be before start date",
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

subscriptionSchema.pre("save", function (next) {
	if (!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalPeriods[this.frequency],
		);
	}

	if (this.renewalDate < new Date()) {
		this.status = "expired";
	}

	next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
