import express, { Router } from "express"
import { mealsController } from "./meals.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/",
    auth(UserRole.PROVIDER),
    mealsController.createMeal);

router.get(
    "/my-meals",
    auth(UserRole.PROVIDER),
    mealsController.getMyMeals
);

router.get(
    "/",
    mealsController.getAllMeals);

router.get(
    "/:id",
    mealsController.getSingleMeal);

router.patch(
    "/:id",
    auth(UserRole.PROVIDER),
    mealsController.updateMeal
);

router.delete(
    "/:id",
    auth(UserRole.PROVIDER),
    mealsController.deleteMeal
);

export const mealRouter: Router = router;