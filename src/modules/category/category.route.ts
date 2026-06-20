import express, { Router } from "express";
import { CategoryController } from "./category.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post(
    "/",
    auth(UserRole.ADMIN),
    CategoryController.createCategory
);

router.get(
    "/",
    CategoryController.getCategories
);

router.get(
    "/:id",
    CategoryController.getCategory
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    CategoryController.updateCategory
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    CategoryController.deleteCategory
);

export const categoryRoutes: Router = router;