/* eslint-disable no-unused-vars */
import { Model, Schema, model } from "mongoose";
import { IUser, IOrder } from "./user-interface";
import bcrypt from "bcryptjs";

const orderSchema = new Schema<IOrder>({
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser, UserModel>(
	{
		userId: { type: Number, unique: true, required: true },
		username: {
			type: String,
			unique: true,
			required: true,
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

interface UserModel extends Model<IUser> {
	isUserExists(id: string): Promise<IUser>;
}
//hash password before saving document

userSchema.pre("save", async function () {
	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;
});
//exclude password field from user document
userSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});

//static method for user --> exists or not
userSchema.static("isUserExists", function isUserExists(id: string) {
	const user = User.findOne({ userId: id });
	return user;
});
const User = model<IUser, UserModel>("User", userSchema);

export default User;
