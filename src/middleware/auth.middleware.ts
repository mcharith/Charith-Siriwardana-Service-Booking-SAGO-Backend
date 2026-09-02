import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/User";

interface JwtPayload {
    userId: string;
    role: UserRole;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Authentication token is required",
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({
                success: false,
                message: "JWT secret is not configured",
            });
            return;
        }

        const decoded = jwt.verify(
            token,
            secret
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;