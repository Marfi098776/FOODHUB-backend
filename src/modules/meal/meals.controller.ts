import { Request, Response } from "express";
import { MealsService } from "./meals.service";

const createMeal = async (req: Request, res: Response) => {
    const result = await MealsService.createMeal(req.body);

    res.status(201).json({
        success: true,
        data: result,
    });
};

export const mealsController = {
    createMeal,
}