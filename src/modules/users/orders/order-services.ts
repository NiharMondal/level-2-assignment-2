import mongoose from "mongoose";
import { IOrder } from "../user-interface";
import User from "../user-model";

const getAllOrdersOfSpecificUser = async (userId: string) => {
	const result = await User.findById(userId).select("orders -_id");
	return result;
};
const updateOrder = async (userId: string, order: IOrder) => {
	const user = await User.myStaticMethod(userId);

	if (!user) {
		throw new Error("User not found!");
	}
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
	const user = await User.myStaticMethod(userId);

	if (!user) {
		throw new Error("User not found!");
	}

	const data = await User.aggregate([
		//stage 1 --->findby userId
		{ $match: { _id: new mongoose.Types.ObjectId(userId) } },

		// stage 2 ---> break oders array
		{ $unwind: "$orders" },

		//stage 3 ---> group by id and calculate totalprice
		{
			$group: {
				_id: null,
				totalprice: {
					$sum: { $multiply: ["$orders.price", "$orders.quantity"] },
				},
			},
		},
		{ $project: { _id: 0 } },
	]);

	return data;
};

export const orderServices = {
	getAllOrdersOfSpecificUser,
	updateOrder,
	calculateTotalPrice,
};
