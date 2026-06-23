import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";


const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const updateUserStatus = async (
    userId: string,
    isActive: boolean
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (
        user.role === UserRole.ADMIN &&
        isActive === false
    ) {
        throw new Error(
            "Admin account cannot be deactivated"
        );
    }

    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isActive,
        },
    });
};

const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            customer: true,

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

export const AdminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders
};
