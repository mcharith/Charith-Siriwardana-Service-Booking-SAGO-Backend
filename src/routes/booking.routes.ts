import { Router } from "express";

import {
    createBooking,
    getMyBookings,
    getProviderBookings,
    confirmBooking,
    rejectBooking,
    cancelBooking,
    completeBooking,
} from "../controller/booking.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

import { UserRole } from "../models/User";

const router = Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(UserRole.CUSTOMER),
    createBooking
);

router.get(
    "/my-bookings",
    authMiddleware,
    roleMiddleware(UserRole.CUSTOMER),
    getMyBookings
);

router.get(
    "/provider",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    getProviderBookings
);

router.put(
    "/:id/confirm",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    confirmBooking
);

router.put(
    "/:id/reject",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    rejectBooking
);

router.put(
    "/:id/cancel",
    authMiddleware,
    roleMiddleware(UserRole.CUSTOMER),
    cancelBooking
);

router.put(
    "/:id/complete",
    authMiddleware,
    roleMiddleware(UserRole.PROVIDER),
    completeBooking
);

export default router;