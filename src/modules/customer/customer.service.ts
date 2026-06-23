import { prisma } from "../../lib/prisma";

const getProfile = async (
    userId: string
) => {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },

        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            isActive: true,
            createdAt: true,
        },
    });
};

const updateProfile = async (
    userId: string,
    payload: {
        name?: string;
        image?: string;
    }
) => {
    const data: {
        name?: string;
        image?: string;
    } = {};

    if (payload.name) {
        data.name = payload.name;
    }

    if (payload.image) {
        data.image = payload.image;
    }

    return prisma.user.update({
        where: {
            id: userId,
        },

        data,
    });
};

export const CustomerService = {
    getProfile,
    updateProfile,
};