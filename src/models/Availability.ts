import mongoose, { Document, Schema } from "mongoose";

export interface IAvailability extends Document {
    providerId: mongoose.Types.ObjectId;
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

const availabilitySchema = new Schema<IAvailability>(
    {
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        day: {
            type: String,
            required: true,
            enum: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
            ],
        },

        startTime: {
            type: String,
            required: true,
        },

        endTime: {
            type: String,
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Availability = mongoose.model<IAvailability>(
    "Availability",
    availabilitySchema
);

export default Availability;