import { Request, Response } from "express";
import { MealsService } from "./meals.service";
import { prisma } from "../../lib/prisma";

const createMeal = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found",
            });
        }

        const result = await MealsService.createMeal({
            ...req.body,
            providerId: provider.id,
        });

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        res.status(400).json({
            error: "Meal creation failed",
            message: error.message
        });
    }
};

const getMyMeals = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const result = await MealsService.getMyMeals(
            user.id
        );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);

        res.status(400).json({
            error: "My Meal fetched failed",
        });
    }
};

const getAllMeals = async (req: Request, res: Response) => {
    try {
        const result = await MealsService.getAllMeals();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to get meals",
        });
    }
};

const getSingleMeal = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await MealsService.getSingleMeal(
            id
        );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to get meal",
        });
    }
};

const updateMeal = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await MealsService.updateMeal(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Meal update failed",
        });
    }
};

const deleteMeal = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await MealsService.deleteMeal(
            id
        );
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Meal delete failed",
        });
    }
};

export const mealsController = {
    createMeal,
    getMyMeals,
    getAllMeals,
    getSingleMeal,
    updateMeal,
    deleteMeal,
}