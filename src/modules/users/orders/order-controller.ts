import { Request, Response } from "express";
import { orderServices } from "./order-services";

const getAllOrdersOfSpecificUser = async (req: Request, res: Response) => {
	try {
		const result = await orderServices.getAllOrdersOfSpecificUser(
			req.params.userId
		);

		res.status(200).json({
			success: true,
			message: "Order fetched successfully!",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "User not found",
			error: error,
		});
	}
};
const updateOrder = async (req: Request, res: Response) => {
	try {
		const result = await orderServices.updateOrder(
			req.params.userId,
			req.body
		);

		res.status(200).json({
			success: true,
			message: "Order updated successfully!",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "User not found",
			error: error,
		});
	}
};
const calculateTotalPrice = async (req: Request, res: Response) => {
	try {
		const result = await orderServices.calculateTotalPrice(req.params.userId);

		res.status(200).json({
			success: true,
			message: "Total price calculated successfully",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "User not found",
			error: error,
		});
	}
};
export const orderController = {
	getAllOrdersOfSpecificUser,
	updateOrder,
	calculateTotalPrice,
};
