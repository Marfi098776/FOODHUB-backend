import { prisma } from "../../lib/prisma";

const createOrder = async (
    customerId: string,
    payload: {
        deliveryAddress: string;
        items: {
            mealId: string;
            quantity: number;
        }[];
    }
) => {
    let totalAmount = 0;

    const orderItemsData = [];

    for (const item of payload.items) {
        const meal = await prisma.meal.findUnique({
            where: {
                id: item.mealId,
            },
        });

        if (!meal) {
            throw new Error(
                `Meal not found: ${item.mealId}`
            );
        }

        totalAmount += meal.price * item.quantity;

        orderItemsData.push({
            mealId: meal.id,
            quantity: item.quantity,
            unitPrice: meal.price,
        });
    }

    return prisma.order.create({
        data: {
            customerId,
            deliveryAddress:
                payload.deliveryAddress,
            totalAmount,

            items: {
                create: orderItemsData,
            },
        },

        include: {
            items: true,
        },
    });
};

export const orderServices = {
    createOrder
}