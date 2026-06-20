import { prisma } from "../../lib/prisma";


const createCategory = async (payload: {
    name: string; slug: string; userId: string
}) => {
    return prisma.category.create({
        data: payload,
    });
};

const getCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getCategory = async (id: string) => {
    return prisma.category.findUnique({
        where: { id },
    });
};

const updateCategory = async (
    id: string,
    payload: any
) => {
    return prisma.category.update({
        where: { id },
        data: payload,
    });
};

const deleteCategory = async (id: string) => {
    return prisma.category.delete({
        where: { id },
    });
};

export const CategoryService = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};