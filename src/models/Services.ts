import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
    providerId: mongoose.Types.ObjectId;
    category: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
    {
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        duration: {
            type: Number,
            required: true,
            min: 1,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model<IService>(
    "Service",
    serviceSchema
);

export default Service;