import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        // const user = req.user;
        // if (!user) {
        //     return res.status(400).json({
        //         error: "Unauthorized"
        //     });
        // }
        const result = await CategoryService.createCategory(req.body);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            error: "category creation failed"
        })
    };
}


const getCategories = async (req: Request, res: Response) => {
    const result = await CategoryService.getCategories();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getCategory = async (
    req: Request,
    res: Response
) => {
    const id = req.params.id as string
    const result =
        await CategoryService.getCategory(id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateCategory = async (
    req: Request,
    res: Response
) => {
    const id = req.params.id as string
    const result =
        await CategoryService.updateCategory(
            id,
            req.body
        );

    res.status(200).json({
        success: true,
        data: result,
    });
};

const deleteCategory = async (
    req: Request,
    res: Response
) => {
    const id = req.params.id as string
    await CategoryService.deleteCategory(
        id
    );

    res.status(200).json({
        success: true,
        message: "Category deleted",
    });
};

export const CategoryController = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};