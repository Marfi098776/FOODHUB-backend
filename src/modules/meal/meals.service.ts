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

const updateMeal = async (id: string, payload: any) => {
    return await prisma.meal.update({
        where: {
            id,
        },
        data: payload,
    });
};

const deleteMeal = async (id: string) => {
    return await prisma.meal.delete({
        where: {
            id,
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