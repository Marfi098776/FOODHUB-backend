import { prisma } from "../../lib/prisma";

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

export const providerService = {
    createProfile,
    getMyProfile,
    getSingleProvider,
    updateProfile
}