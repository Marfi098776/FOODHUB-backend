import express, { Router } from "express"
import { mealsController } from "./meals.controller";

const router = express.Router();

router.post("/", mealsController.createMeal);
// router.get("/", mealsController.getMeals);
// router.get("/:id", mealsController.getMeal);
// router.patch("/:id", mealsController.updateMeal);
// router.delete("/:id", mealsController.deleteMeal);

export const mealRouter: Router = router;