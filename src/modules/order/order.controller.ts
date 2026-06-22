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

const getMyOrders = async (
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
            await orderServices.getMyOrders(
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

const getSingleOrder = async (
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
            await orderServices.getSingleOrder(
                req.params.id as string,
                user.id
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        if (error.message === "Forbidden") {
            return res.status(403).json({
                message:
                    "You can only view your own orders",
            });
        }

        if (error.message === "Order not found") {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(400).json({
            message: error.message,
        });
    }
};

const updateOrderStatus = async (
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

        const result = await orderServices.updateOrderStatus(req.params.id as string,
            user.id,
            req.body.status
        );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        if (
            error.message.includes(
                "Invalid status transition"
            )
        ) {
            return res.status(400).json({
                message: error.message,
            });
        }

        if (error.message === "Forbidden") {
            return res.status(403).json({
                message:
                    "You can only update your own orders",
            });
        }

        return res.status(400).json({
            message: error.message,
        });
    }
};

export const orderController = {
    createOrder,
    getMyOrders,
    getSingleOrder,
    updateOrderStatus
}