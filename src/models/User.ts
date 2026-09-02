import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone: string;
    profileImage?: string
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        profileImage:{
            type: String,
            default: null,
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;