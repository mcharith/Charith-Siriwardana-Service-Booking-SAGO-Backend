import mongoose, { Document, Schema } from "mongoose";

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export interface IBooking extends Document {
    customerId: mongoose.Types.ObjectId;
    providerId: mongoose.Types.ObjectId;
    serviceId: mongoose.Types.ObjectId;
    bookingDate: Date;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    rejectionReason?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        providerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },

        bookingDate: {
            type: Date,
            required: true,
        },

        startTime: {
            type: String,
            required: true,
        },

        endTime: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(BookingStatus),
            default: BookingStatus.PENDING,
        },

        rejectionReason: {
            type: String,
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model<IBooking>(
    "Booking",
    bookingSchema
);

export default Booking;