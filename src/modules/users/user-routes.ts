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
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

router
	.route("/:userId/orders")
	.get(orderController.getAllOrdersOfSpecificUser)
	.patch(orderController.updateOrder);
router
	.route("/:userId/orders/total-price")
	.get(orderController.calculateTotalPrice);

export const userRouter = router;
