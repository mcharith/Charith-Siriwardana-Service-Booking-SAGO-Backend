import { Request, Response } from "express";
import serviceService from "../services/service.service";

export const getServices = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { category, search } = req.query;

        const services = await serviceService.getServices(
            category as string,
            search as string
        );

        res.status(200).json({
            success: true,
            data: services,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get services",
        });
    }
};

export const getServiceById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const service =
            await serviceService.getServiceById(<string>req.params.id);

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Service not found",
        });
    }
};

export const createService = async (
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
            category,
            name,
            description,
            price,
            duration,
        } = req.body;

        if (
            !category ||
            !name ||
            !description ||
            price === undefined ||
            !duration
        ) {
            res.status(400).json({
                success: false,
                message: "All service fields are required",
            });
            return;
        }

        const service =
            await serviceService.createService(
                req.user.userId,
                {
                    category,
                    name,
                    description,
                    price,
                    duration,
                }
            );

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Service creation failed",
        });
    }
};

export const updateService = async (
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

        const service =
            await serviceService.updateService(
                <string>req.params.id,
                req.user.userId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: service,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Service update failed",
        });
    }
};

export const deleteService = async (
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

        await serviceService.deleteService(
            <string>req.params.id,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Service deletion failed",
        });
    }
};