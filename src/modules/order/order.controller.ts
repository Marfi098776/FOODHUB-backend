import { Request, Response } from "express";
import { orderServices } from "./order.service";


const createOrder = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result = await orderServices.createOrder(
            user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        return res.status(400).json({
            message: error.message,
        });
    }
};

export const orderController = {
    createOrder
}