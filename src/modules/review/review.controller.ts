import { Request, Response } from "express";
import { reviewServices } from "./review.service";

const createReview = async (
    req: Request,
    res: Response
) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result =
            await reviewServices.createReview(
                user.id,
                req.body
            );

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        return res.status(400).json({
            message: error.message,
        });
    }
};

const getMealReviews = async (
    req: Request,
    res: Response
) => {
    const result =
        await reviewServices.getMealReviews(
            req.params.mealId as string
        );

    return res.status(200).json({
        success: true,
        data: result,
    });
};

export const reviewController = {
    createReview,
    getMealReviews
}

