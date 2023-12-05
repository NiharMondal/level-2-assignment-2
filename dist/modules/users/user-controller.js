"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user-services");
const userValidation_1 = require("../../validation/userValidation");
//create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedUser = userValidation_1.userValidation.parse(req.body);
        const user = yield user_services_1.userServices.createUser(validatedUser);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
//query all users
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_services_1.userServices.findAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
//find user by id
const findSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_services_1.userServices.findSingleUser(userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_services_1.userServices.updateUser(userId, req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
//delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield user_services_1.userServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.userController = {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
};
