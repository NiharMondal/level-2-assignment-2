import { IOrder } from "../user-interface";
import User from "../user-model";

const getAllOrdersOfSpecificUser = async (userId: string) => {
	const result = await User.findById(userId).select("orders -_id");
	return result;
};
const updateOrder = async (userId: string, order: IOrder) => {
	const result = await User.findByIdAndUpdate(
		userId,
		{
			$push: { orders: order },
		},
		{ new: true, runValidators: true }
	);
	return result;
};

const calculateTotalPrice = async (userId: string) => {
	const result = await User.aggregate([
		//first match and find with id
		{ $match: { _id: userId } },

		//unwind orders;
		{ $unwind: "$orders" },
	]);
	return result;
};

export const orderServices = {
	getAllOrdersOfSpecificUser,
	updateOrder,
	calculateTotalPrice,
};
