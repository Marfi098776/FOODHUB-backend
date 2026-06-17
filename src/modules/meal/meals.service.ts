import { prisma } from "../../lib/prisma";

const createMeal = async (payload: any) => {
    const result = await prisma.meal.create({
        data: payload,
    });

    return result;
};

// const getMeals = async () => {
//     return prisma.meal.findMany({
//         include: {
//             category: true,
//             provider: true,
//         },
//     });
// };

// const getMeal = async (id: string) => {
//     return prisma.meal.findUnique({
//         where: { id },
//     });
// };

// const updateMeal = async (
//     id: string,
//     payload: Partial<TMeal>
// ) => {
//     return prisma.meal.update({
//         where: { id },
//         data: payload,
//     });
// };

// const deleteMeal = async (id: string) => {
//     return prisma.meal.delete({
//         where: { id },
//     });
// };

export const MealsService = {
    createMeal,
    // getMeals,
    // getMeal,
    // updateMeal,
    // deleteMeal
}