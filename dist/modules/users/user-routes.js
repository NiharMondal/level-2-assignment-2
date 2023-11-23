"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user-controller");
const order_controller_1 = require("./orders/order-controller");
const router = (0, express_1.Router)();
//only get and post route
router
    .route("/")
    .post(user_controller_1.userController.createUser)
    .get(user_controller_1.userController.findAllUsers);
//user query route
router
    .route("/:userId")
    .get(user_controller_1.userController.findSingleUser)
    .patch(user_controller_1.userController.updateUser)
    .delete(user_controller_1.userController.deleteUser);
router
    .route("/:userId/orders")
    .get(order_controller_1.orderController.getAllOrdersOfSpecificUser)
    .patch(order_controller_1.orderController.updateOrder);
router
    .route("/:userId/orders/total-price")
    .get(order_controller_1.orderController.calculateTotalPrice);
exports.userRouter = router;
