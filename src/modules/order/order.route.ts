import express, { Router } from "express"
import auth, { UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";

const router = express.Router();


router.post(
    "/",
    auth(UserRole.CUSTOMER),
    orderController.createOrder
);

export const orderRouter: Router = router;