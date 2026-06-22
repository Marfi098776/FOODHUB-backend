import { prisma } from "../../lib/prisma";

const createMeal = async (payload: any) => {
    const result = await prisma.meal.create({
        data: payload,
    });

    return result;
};

const getMyMeals = async (userId: string) => {
    const provider =
        await prisma.providerProfile.findUnique({
            where: {
                userId,
            },
        });

    return await prisma.meal.findMany({
        where: {
            providerId: provider!.id,
        },
        include: {
            category: true,
        },
    });
};

const getAllMeals = async () => {
    return prisma.meal.findMany({
        include: {
            provider: true,
            category: true,
        },
    });
};

const getSingleMeal = async (
    id: string
) => {
    return prisma.meal.findUnique({
        where: {
            id,
        },
        include: {
            provider: true,
            category: true,
            reviews: true,
        },
    });
};

const updateMeal = async (mealId: string, userId: string, payload: any) => {
    const provider = await prisma.providerProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    const meal = await prisma.meal.findUnique({
        where: {
            id: mealId,
        },
    });

    if (!meal) {
        throw new Error("Meal not found");
    }

    if (meal.providerId !== provider.id) {
        throw new Error("Forbidden");
    }
    return await prisma.meal.update({
        where: {
            id: mealId,
        },
        data: payload,
    });
};

const deleteMeal = async (mealId: string, userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    const meal = await prisma.meal.findUnique({
        where: {
            id: mealId,
        },
    });

    if (!meal) {
        throw new Error("Meal not found");
    }

    if (meal.providerId !== provider.id) {
        throw new Error("Forbidden");
    }

    return await prisma.meal.delete({
        where: {
            id: mealId,
        },
    });
};

export const MealsService = {
    createMeal,
    getMyMeals,
    getAllMeals,
    getSingleMeal,
    updateMeal,
    deleteMeal
}