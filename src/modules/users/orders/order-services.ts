import { IOrder } from "../user-interface";
import User from "../user-model";

const getAllOrdersOfSpecificUser = async (userId: string) => {
	//checking user is found or not
	const user = await User.isUserExists(userId);

	if (!user) {
		throw new Error("User not found!");
	}
	const result = await User.findOne({ userId }).select("orders -_id");
	return result;
};
const updateOrder = async (userId: string, order: IOrder) => {
	//checking user is found or not
	const user = await User.isUserExists(userId);

	if (!user) {
		throw new Error("User not found!");
	}
	await User.findOneAndUpdate(
		{ userId },
		{
			$push: { orders: order },
		},
		{ new: true, runValidators: true }
	);
};

const calculateTotalPrice = async (userId: string) => {
	//checking user is found or not
	const user = await User.isUserExists(userId);

	if (!user) {
		throw new Error("User not found!");
	}

	const data = await User.aggregate([
		//stage 1 --> match by id
		{ $match: { userId: user.userId } },
		//stage 2 --> breaks orders array
		{ $unwind: "$orders" },

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
