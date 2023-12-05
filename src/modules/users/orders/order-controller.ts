/* eslint-disable @typescript-eslint/no-explicit-any */
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
			message: "User not found",
			error: {
				code: 404,
				description: error.message,
			},
		});
	}
};

//update orders list
const updateOrder = async (req: Request, res: Response) => {
	try {
		const validatedOrderInfo = orderValidation.parse(req.body);
		await orderServices.updateOrder(req.params.userId, validatedOrderInfo);

		res.status(200).json({
			success: true,
			message: "Order created successfully!",
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

//caculate total price of a specific user
const calculateTotalPrice = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const result = await orderServices.calculateTotalPrice(userId);

		//extra layer
		//checking user exists but has no orders array
		if (!result.length) {
			return res.status(200).json({
				success: true,
				message: "This user has no orders array in the documents",
			});
		}

		//here is ther actual result
		return res.status(200).json({
			success: true,
			message: "Total price calculated successfully!",
			data: result[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "User not found",
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
