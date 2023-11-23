import { Request, Response } from "express";
import { orderServices } from "./order-services";
import { orderValidation } from "../../../validation/userValidation";

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
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: {
				code: 404,
				description: error.message,
			},
		});
	}
};
const updateOrder = async (req: Request, res: Response) => {
	try {
		const validatedOrderInfo = orderValidation.parse(req.body);
		await orderServices.updateOrder(req.params.userId, validatedOrderInfo);

		res.status(200).json({
			success: true,
			message: "Order updated successfully!",
			data: null,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: {
				code: 404,
				description: error.message,
			},
		});
	}
};
const calculateTotalPrice = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const result = await orderServices.calculateTotalPrice(userId);

		res.status(200).json({
			success: true,
			message: "Total price calculated successfully",
			data: result[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: {
				code: 404,
				description: error.message,
			},
		});
	}
};
export const orderController = {
	getAllOrdersOfSpecificUser,
	updateOrder,
	calculateTotalPrice,
};
