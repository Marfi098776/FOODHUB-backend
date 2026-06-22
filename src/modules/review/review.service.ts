import { prisma } from "../../lib/prisma";

const createReview = async (customerId: string, payload: { mealId: string; rating: number; comment?: string; }) => {

    if (
        payload.rating < 1 ||
        payload.rating > 5
    ) {
        throw new Error(
            "Rating must be between 1 and 5"
        );
    }

    const existingReview =
        await prisma.review.findFirst({
            where: {
                customerId,
                mealId: payload.mealId,
            },
        });

    if (existingReview) {
        throw new Error(
            "You already reviewed this meal"
        );
    }

    const orderedMeal =
        await prisma.orderItem.findFirst({
            where: {
                mealId: payload.mealId,

                order: {
                    customerId,
                    status: {
                        in: [
                            "READY",
                            "DELIVERED",
                        ],
                    },
                },
            },
        });

    if (!orderedMeal) {
        throw new Error(
            "You can only review meals you ordered"
        );
    }

    return prisma.review.create({
        data: {
            customerId,
            mealId: payload.mealId,
            rating: payload.rating,
            comment: payload.comment ?? null,
        },
    });
};

const getMealReviews = async (
    mealId: string
) => {
    return prisma.review.findMany({
        where: {
            mealId,
        },

        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
};

export const reviewServices = {
    createReview,
    getMealReviews
}