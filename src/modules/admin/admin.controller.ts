import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (
    req: Request,
    res: Response
) => {
    try {
        const result =
            await AdminService.getAllUsers();

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to fetch users",
        });
    }
};

const updateUserStatus = async (
    req: Request,
    res: Response
) => {
    try {


        const result =
            await AdminService.updateUserStatus(
                req.params.id as string,
                req.body.isActive
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getAllOrders = async (
    req: Request,
    res: Response
) => {
    try {
        const result =
            await AdminService.getAllOrders();

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getAllOrders
};
