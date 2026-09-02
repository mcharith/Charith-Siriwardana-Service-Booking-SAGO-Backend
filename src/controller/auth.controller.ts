import { Request, Response } from "express";
import authService from "../../src/services/auth.services";

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            name,
            email,
            password,
            phone,
            role,
        } = req.body;

        if (!name || !email || !password || !phone) {
            res.status(400).json({
                success: false,
                message:
                    "Name, email, password and phone are required",
            });
            return;
        }

        const profileImage = req.file
            ? `/uploads/profiles/${req.file.filename}`
            : undefined;

        const result = await authService.register({
            name,
            email,
            password,
            phone,
            role,
            profileImage,
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: result,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Registration failed";

        res.status(400).json({
            success: false,
            message,
        });
    }
};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }

        const result = await authService.login({
            email,
            password,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Login failed";

        res.status(401).json({
            success: false,
            message,
        });
    }
};

export const me = async (
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

        const user = await authService.getMe(req.user.userId);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to get user";

        res.status(404).json({
            success: false,
            message,
        });
    }
};

export const logout = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await authService.logout();

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};

export const updateProfile = async (
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

        const { name, phone } = req.body;

        const user = await authService.updateProfile(
            req.user.userId,
            {
                name,
                phone,
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Profile update failed";

        res.status(400).json({
            success: false,
            message,
        });
    }
};

export const changePassword = async (
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
            currentPassword,
            newPassword,
        } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required",
            });
            return;
        }

        if (newPassword.length < 6) {
            res.status(400).json({
                success: false,
                message:
                    "New password must be at least 6 characters",
            });
            return;
        }

        const result = await authService.changePassword(
            req.user.userId,
            currentPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Password change failed";

        res.status(400).json({
            success: false,
            message,
        });
    }
};

export const updateProfileImage = async (
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

        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Profile image is required",
            });
            return;
        }

        const profileImage =
            `/uploads/profiles/${req.file.filename}`;

        const result =
            await authService.updateProfileImage(
                req.user.userId,
                profileImage
            );

        res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            data: result,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Profile image update failed";

        res.status(400).json({
            success: false,
            message,
        });
    }
};

