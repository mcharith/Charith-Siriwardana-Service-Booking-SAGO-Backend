import { Router } from "express";

import {
    getProviderAvailability,
    createAvailability,
    updateAvailability,
    deleteAvailability,
} from "../controller/availability.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

import { UserRole } from "../models/User";

const router = Router();

router.get(
    "/:providerId",
    getProviderAvailability
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    createAvailability
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    updateAvailability
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    deleteAvailability
);

export default router;