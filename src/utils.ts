import jwt from "jsonwebtoken";
import { UserRole } from "../src/models/User";

interface JwtPayload {
    userId: string;
    role: UserRole;
}

const generateToken = (userId: string, role: UserRole): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in .env");
    }

    return jwt.sign(
        {
            userId,
            role,
        },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        } as jwt.SignOptions
    );
};

export default generateToken;