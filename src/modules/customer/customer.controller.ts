import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

const getProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result =
            await CustomerService.getProfile(
                user.id
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

const updateProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result =
            await CustomerService.updateProfile(
                user.id,
                req.body
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

export const CustomerController = {
    getProfile,
    updateProfile,
};