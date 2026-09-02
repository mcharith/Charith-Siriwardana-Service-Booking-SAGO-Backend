import { Request, Response } from "express";
import userService from "../services/user.service";

export const getUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await userService.getUsers();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get users",
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await userService.getUserById(
            <string>req.params.id
        );

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "User not found",
        });
    }
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await userService.updateUser(
            <string>req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "User update failed",
        });
    }
};

export const updateUserStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            res.status(400).json({
                success: false,
                message: "isActive must be true or false",
            });
            return;
        }

        const user =
            await userService.updateUserStatus(
                <string>req.params.id,
                isActive
            );

        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Status update failed",
        });
    }
};