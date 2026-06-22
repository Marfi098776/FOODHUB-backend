import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../middleware/auth";

const allowedTransitions: Record<
    OrderStatus,
    OrderStatus[]
> = {
    [OrderStatus.PLACED]: [
        OrderStatus.PREPARING,
        OrderStatus.CANCELLED,
    ],

    [OrderStatus.PREPARING]: [
        OrderStatus.READY,
    ],

    [OrderStatus.READY]: [
        OrderStatus.DELIVERED,
    ],

    [OrderStatus.DELIVERED]: [],

    [OrderStatus.CANCELLED]: [],
};

const createOrder = async (customerId: string, payload: { deliveryAddress: string; items: { mealId: string; quantity: number; }[]; }) => {
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

const getMyOrders = async (
    customerId: string
) => {
    return prisma.order.findMany({
        where: {
            customerId,
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getSingleOrder = async (orderId: string, customerId: string
) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.customerId !== customerId) {
        throw new Error("Forbidden");
    }

    return order;
};

const updateOrderStatus = async (orderId: string, userId: string, status: OrderStatus) => {
    const provider =
        await prisma.providerProfile.findUnique({
            where: {
                userId,
            },
        });

    if (!provider) {
        throw new Error(
            "Provider profile not found"
        );
    }

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    const ownsMeal = order.items.some(
        (item) =>
            item.meal.providerId === provider.id
    );

    if (!ownsMeal) {
        throw new Error("Forbidden");
    }

    const currentStatus = order.status;

    const validNextStatuses =
        allowedTransitions[currentStatus];

    if (!validNextStatuses.includes(status)) {
        throw new Error(
            `Invalid status transition from ${currentStatus} to ${status}`
        );
    }

    return prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
        },
    });
};

export const orderServices = {
    createOrder,
    getMyOrders,
    getSingleOrder,
    updateOrderStatus
}