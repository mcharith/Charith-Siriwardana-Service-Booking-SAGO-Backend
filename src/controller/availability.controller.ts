import { Request, Response } from "express";
import availabilityService from "../services/availability.service";

export const getProviderAvailability = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const availability =
            await availabilityService.getProviderAvailability(
                <string>req.params.providerId
            );

        res.status(200).json({
            success: true,
            data: availability,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get availability",
        });
    }
};

export const createAvailability = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const {
            day,
            startTime,
            endTime,
            isAvailable,
        } = req.body;

        if (!day || !startTime || !endTime) {
            res.status(400).json({
                success: false,
                message:
                    "Day, startTime and endTime are required",
            });
            return;
        }

        const availability =
            await availabilityService.createAvailability(
                req.user.userId,
                {
                    day,
                    startTime,
                    endTime,
                    isAvailable,
                }
            );

        res.status(201).json({
            success: true,
            message: "Availability created successfully",
            data: availability,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Availability creation failed",
        });
    }
};

export const updateAvailability = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const availability =
            await availabilityService.updateAvailability(
                <string>req.params.id,
                req.user.userId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            data: availability,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Availability update failed",
        });
    }
};

export const deleteAvailability = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        await availabilityService.deleteAvailability(
            <string>req.params.id,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Availability deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Availability deletion failed",
        });
    }
};