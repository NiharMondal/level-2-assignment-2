import { IUser } from "./user-interface";
import User from "./user-model";

//create user
const createUser = async (user: IUser) => {
	const result = await User.create(user);

	return result;
};

//find all users
const findAllUsers = async () => {
	const result = await User.find().select("-orders");
	return result;
};

//find single user
const findSingleUser = async (id: string) => {
	//checking user is found or not

	const checkUser = await User.isUserExists(id);

	if (!checkUser) {
		throw new Error("User not found!");
	}
	const result = await User.findOne({ userId: id }).select("-orders");
	return result;
};

//update user
const updateUser = async (id: string, userData: IUser) => {
	//checking user is found or not
	const user = await User.isUserExists(id);

	if (!user) {
		throw new Error("User not found!");
	}
	const result = await User.findOneAndUpdate({ userId: id }, userData, {
		new: true,
		runValidators: true,
	});
	return result;
};

const deleteUser = async (id: string) => {
	//checking user is found or not
	const user = await User.isUserExists(id);

	if (!user) {
		throw new Error("User not found!");
	}
	await User.deleteOne({ userId: id });
};

export const userServices = {
	createUser,
	findAllUsers,
	findSingleUser,
	updateUser,
	deleteUser,
};
