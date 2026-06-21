import express, { Router } from "express"
import { mealsController } from "./meals.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/",
    auth(UserRole.PROVIDER),
    mealsController.createMeal);

export const mealRouter: Router = router;