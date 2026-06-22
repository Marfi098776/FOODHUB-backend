import express, { Router } from "express"
import auth, { UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";

const router = express.Router();


router.post(
    "/",
    auth(UserRole.CUSTOMER),
    orderController.createOrder
);

router.get(
    "/",
    auth(UserRole.CUSTOMER),
    orderController.getMyOrders
)

router.get(
    "/:id",
    auth(UserRole.CUSTOMER),
    orderController.getSingleOrder
)

router.patch(
    "/provider/:id",
    auth(UserRole.PROVIDER),
    orderController.updateOrderStatus
);

export const orderRouter: Router = router;