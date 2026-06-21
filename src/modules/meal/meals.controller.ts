import { Request, Response } from "express";
import { MealsService } from "./meals.service";

const createMeal = async (req: Request, res: Response) => {
    try {
        const result = await MealsService.createMeal(req.body);
        console.log(result);
        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (err) {
        res.status(400).json({
            error: "meal creation failed"
        })
    }
};

export const mealsController = {
    createMeal,
}