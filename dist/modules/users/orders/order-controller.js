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
exports.orderController = void 0;
const order_services_1 = require("./order-services");
const userValidation_1 = require("../../../validation/userValidation");
const getAllOrdersOfSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.getAllOrdersOfSpecificUser(req.params.userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
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
//update orders list
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedOrderInfo = userValidation_1.orderValidation.parse(req.body);
        yield order_services_1.orderServices.updateOrder(req.params.userId, validatedOrderInfo);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
//caculate total price of a specific user
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield order_services_1.orderServices.calculateTotalPrice(userId);
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
exports.orderController = {
    getAllOrdersOfSpecificUser,
    updateOrder,
    calculateTotalPrice,
};
