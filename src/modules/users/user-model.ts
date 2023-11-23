import { Schema, model } from "mongoose";
import { IUser, IOrder } from "./user-interface";
const orderSchema = new Schema<IOrder>({
	productName: String,
	price: Number,
	quantity: Number,
});

const userSchema = new Schema<IUser>(
	{
		userId: { type: Number, unique: true },
		username: {
			type: String,
			unique: true,
		},
		password: String,
		fullName: {
			firstName: String,
			lastName: String,
		},
		age: Number,
		email: String,
		isActive: {
			type: Boolean,
			default: true,
		},
		hobbies: [String],
		address: {
			street: String,
			city: String,
			country: String,
		},
		orders: {
			type: [orderSchema],
			default: undefined,
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: true,
		},
	}
);

//this is for exclude password field from user document
userSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});

const User = model<IUser>("User", userSchema);

export default User;
