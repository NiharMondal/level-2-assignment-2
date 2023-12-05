import { Router } from "express";
import { userController } from "./user-controller";
import { orderController } from "./orders/order-controller";

const router = Router();
//only get and post route
router
	.route("/")
	.post(userController.createUser)
	.get(userController.findAllUsers);
//user query route
router
	.route("/:userId")
	.get(userController.findSingleUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

//order routes
router
	.route("/:userId/orders")
	.get(orderController.getAllOrdersOfSpecificUser)
	.put(orderController.updateOrder);

//total-price route
router
	.route("/:userId/orders/total-price")
	.get(orderController.calculateTotalPrice);

export const userRouter = router;
