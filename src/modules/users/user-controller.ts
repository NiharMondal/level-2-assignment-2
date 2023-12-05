/* eslint-disable @typescript-eslint/no-explicit-any */
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
			message: "User created successfully!",
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
			message: "Users fetched successfully!",
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
			message: "User fetched successfully!",
			data: user,
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

//update user
const updateUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const user = await userServices.updateUser(userId, req.body);
		res.status(200).json({
			success: true,
			message: "User updated successfully!",
			data: user,
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

//delete user
const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		await userServices.deleteUser(userId);
		res.status(200).json({
			success: true,
			message: "User deleted successfully!",
			data: null,
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

export const userController = {
	createUser,
	findAllUsers,
	findSingleUser,
	updateUser,
	deleteUser,
};
