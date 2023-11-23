import { IUser } from "./user-interface";
import User from "./user-model";

const createUser = async (user: IUser) => {
	const result = await User.create(user);

	return result;
};
const findAllUsers = async () => {
	const result = await User.find();
	return result;
};
const findSingleUser = async (id: string) => {
	//checking user is found or not

	const user = await User.myStaticMethod(id);

	if (!user) {
		throw new Error("User not found!");
	}
	const result = await User.findById(id).select("-orders");
	return result;
};
const updateUser = async (id: string, userData: IUser) => {
	//checking user is found or not
	const user = await User.myStaticMethod(id);

	if (!user) {
		throw new Error("User not found!");
	}
	const result = await User.findByIdAndUpdate(id, userData, {
		new: true,
		runValidators: true,
	});
	return result;
};

const deleteUser = async (id: string) => {
	//checking user is found or not
	const user = await User.myStaticMethod(id);

	if (!user) {
		throw new Error("User not found!");
	}
	const result = await User.deleteOne({ _id: id });
	return result;
};

export const userServices = {
	createUser,
	findAllUsers,
	findSingleUser,
	updateUser,
	deleteUser,
};
