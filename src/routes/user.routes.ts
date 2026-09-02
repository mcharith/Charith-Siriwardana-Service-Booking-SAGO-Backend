import { Router } from "express";

import {
    getUsers,
    getUserById,
    updateUser,
    updateUserStatus,
} from "../controller/user.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

import { UserRole } from "../models/User";

const router = Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(UserRole.ADMIN),
    getUsers
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(UserRole.ADMIN),
    getUserById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(UserRole.ADMIN),
    updateUser
);

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware(UserRole.ADMIN),
    updateUserStatus
);

export default router;