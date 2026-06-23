import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../middleware/auth";

const createProfile = async (payload: any) => {
    const existingProfile =
        await prisma.providerProfile.findUnique({
            where: {
                userId: payload.userId,
            },
        });

    if (existingProfile) {
        throw new Error("Profile already exists");
    }

    return prisma.providerProfile.create({
        data: payload,
    });
};

const getMyProfile = async (
    userId: string
) => {
    return prisma.providerProfile.findUnique({
        where: {
            userId,
        },
    });
};

const getSingleProvider = async (
    id: string
) => {
    console.log(id);
    return prisma.providerProfile.findUnique({
        where: {
            id,
        },
        include: {
            meals: true,
        },
    });
};

const updateProfile = async (
    userId: string,
    payload: any
) => {
    return prisma.providerProfile.update({
        where: {
            userId,
        },
        data: payload,
    });
};

const getProviderOrders = async (
    userId: string
) => {
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

    return prisma.order.findMany({
        where: {
            items: {
                some: {
                    meal: {
                        providerId: provider.id,
                    },
                },
            },
        },

        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },

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

const getDashboardStats = async (
    userId: string
) => {
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

    const totalMeals =
        await prisma.meal.count({
            where: {
                providerId: provider.id,
            },
        });

    const totalOrders =
        await prisma.order.count({
            where: {
                items: {
                    some: {
                        meal: {
                            providerId: provider.id,
                        },
                    },
                },
            },
        });

    const pendingOrders =
        await prisma.order.count({
            where: {
                status: {
                    in: [
                        OrderStatus.PLACED,
                        OrderStatus.PREPARING,
                    ],
                },

                items: {
                    some: {
                        meal: {
                            providerId: provider.id,
                        },
                    },
                },
            },
        });

    const completedOrders =
        await prisma.order.count({
            where: {
                status: OrderStatus.DELIVERED,

                items: {
                    some: {
                        meal: {
                            providerId: provider.id,
                        },
                    },
                },
            },
        });

    return {
        totalMeals,
        totalOrders,
        pendingOrders,
        completedOrders,
    };
};

export const providerService = {
    createProfile,
    getMyProfile,
    getSingleProvider,
    updateProfile,
    getProviderOrders,
    getDashboardStats
}