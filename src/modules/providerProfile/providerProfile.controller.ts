import { Request, Response } from "express";
import { providerService } from "./providerProfile.service";

const createProfile = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const result = await providerService.createProfile({
            ...req.body,
            userId: user.id,
        });

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: "Provider profile creation failed",
        });
    }
};

const getMyProfile = async (
    req: Request,
    res: Response
) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const result = await providerService.getMyProfile(user.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getSingleProvider = async (
    req: Request,
    res: Response
) => {
    const id = req.params.id as string;
    const result = await providerService.getSingleProvider(id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateProfile = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const result = await providerService.updateProfile(user.id, req.body);

    res.status(200).json({
        success: true,
        data: result,
    });
};

export const providerController = {
    createProfile,
    getMyProfile,
    getSingleProvider,
    updateProfile
}