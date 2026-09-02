import { Request, Response } from "express";
import bookingService from "../services/booking.service";

export const createBooking = async (
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
            serviceId,
            bookingDate,
            startTime,
            endTime,
            notes,
        } = req.body;

        if (
            !serviceId ||
            !bookingDate ||
            !startTime ||
            !endTime
        ) {
            res.status(400).json({
                success: false,
                message:
                    "serviceId, bookingDate, startTime and endTime are required",
            });
            return;
        }

        const booking =
            await bookingService.createBooking(
                req.user.userId,
                {
                    serviceId,
                    bookingDate,
                    startTime,
                    endTime,
                    notes,
                }
            );

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Booking creation failed",
        });
    }
};

export const getMyBookings = async (
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

        const bookings =
            await bookingService.getMyBookings(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
        });
    }
};

export const getProviderBookings = async (
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

        const bookings =
            await bookingService.getProviderBookings(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get provider bookings",
        });
    }
};

export const confirmBooking = async (
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

        const booking =
            await bookingService.confirmBooking(
                <string>req.params.id,
                req.user.userId
            );

        res.status(200).json({
            success: true,
            message: "Booking confirmed successfully",
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Booking confirmation failed",
        });
    }
};

export const rejectBooking = async (
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

        const { rejectionReason } = req.body;

        if (!rejectionReason) {
            res.status(400).json({
                success: false,
                message: "Rejection reason is required",
            });
            return;
        }

        const booking =
            await bookingService.rejectBooking(
                <string>req.params.id,
                req.user.userId,
                rejectionReason
            );

        res.status(200).json({
            success: true,
            message: "Booking rejected successfully",
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Booking rejection failed",
        });
    }
};

export const cancelBooking = async (
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

        const booking =
            await bookingService.cancelBooking(
                <string>req.params.id,
                req.user.userId
            );

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Booking cancellation failed",
        });
    }
};

export const completeBooking = async (
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

        const booking =
            await bookingService.completeBooking(
                <string>req.params.id,
                req.user.userId
            );

        res.status(200).json({
            success: true,
            message: "Booking completed successfully",
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Booking completion failed",
        });
    }
};