import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.get(
    "/profile",
    auth(UserRole.CUSTOMER),
    CustomerController.getProfile
);

router.patch(
    "/profile",
    auth(UserRole.CUSTOMER),
    CustomerController.updateProfile
);

export const customerRoutes: Router = router;