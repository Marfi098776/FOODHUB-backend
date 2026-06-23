import express, { Router } from "express";
import { AdminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();


router.get(
    "/users",
    auth(UserRole.ADMIN),
    AdminController.getAllUsers
);

router.get(
    "/orders",
    auth(UserRole.ADMIN),
    AdminController.getAllOrders
);

router.patch(
    "/users/:id",
    auth(UserRole.ADMIN),
    AdminController.updateUserStatus
);

export const adminRoutes: Router = router;
