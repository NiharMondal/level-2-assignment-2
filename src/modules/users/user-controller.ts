import { Request, Response } from "express";
import { userServices } from "./user-services";
import { userValidation } from "../../validation/userValidation";

//create user
const createUser = async (req: Request, res: Response) => {
	try {
		const validatedUser = userValidation.parse(req.body);
		const user = await userServices.createUser(validatedUser);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

//query all users
const findAllUsers = async (req: Request, res: Response) => {
	try {
		const user = await userServices.findAllUsers();
		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

//find user by id
const findSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const user = await userServices.findSingleUser(userId);
		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

const updateUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		const user = await userServices.updateUser(userId, req.body);
		res.status(200).json({
			success: true,
			message: "User has been updated successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const user = await userServices.deleteUser(userId);
		res.status(200).json({
			success: true,
			message: "User has been deleted successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const userController = {
	createUser,
	findAllUsers,
	findSingleUser,
	updateUser,
	deleteUser,
};
