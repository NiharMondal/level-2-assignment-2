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
	const result = await User.findById(id);
	return result;
};
const updateUser = async (id: string, userData: IUser) => {
	const result = await User.findByIdAndUpdate(id, userData, {
		new: true,
		runValidators: true,
	});
	return result;
};

const deleteUser = async (id: string) => {
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
