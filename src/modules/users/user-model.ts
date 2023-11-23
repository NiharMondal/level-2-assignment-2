import { Model, Schema, model } from "mongoose";
import { IUser, IOrder } from "./user-interface";
const orderSchema = new Schema<IOrder>({
	productName: String,
	price: Number,
	quantity: Number,
});

const userSchema = new Schema<IUser, UserModel>(
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
		orders: [orderSchema],
	},
	{
		toJSON: {
			virtuals: true,
			transform: true,
		},
	}
);

interface UserModel extends Model<IUser> {
	myStaticMethod(id: string): Promise<IUser>;
}
//exclude password field from user document
userSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});

userSchema.static("myStaticMethod", function myStaticMethod(id: string) {
	const user = User.findById(id);
	return user;
});
const User = model<IUser, UserModel>("User", userSchema);

export default User;
