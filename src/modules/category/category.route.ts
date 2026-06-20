import express, { NextFunction, Request, Response, Router } from "express";
import { CategoryController } from "./category.controller";
import { auth as betterAuth } from "../../lib/auth"

const router = express.Router();

const auth = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = await betterAuth.api.getSession({
            headers: req.headers as any

        })
        console.log(session);
    }
}

router.post(
    "/",
    auth("CUSTOMER", "PROVIDER", "ADMIN"),
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
    CategoryController.updateCategory
);

router.delete(
    "/:id",
    CategoryController.deleteCategory
);

export const categoryRoutes: Router = router;