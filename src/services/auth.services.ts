import bcrypt from "bcryptjs";
import User, { UserRole } from "../models/User";
import generateToken from "../../src/utils";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: UserRole;
    profileImage?: string;
}

interface LoginData {
    email: string;
    password: string;
}

const register = async (data: RegisterData) => {
    const {
        name,
        email,
        password,
        phone,
        role = UserRole.CUSTOMER,
        profileImage,
    } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        profileImage,
        isActive: true,
    });

    const token = generateToken(
        user._id.toString(),
        user.role
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
            role: user.role,
            isActive: user.isActive,
        },
    };
};

const login = async (data: LoginData) => {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
        throw new Error("Your account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(
        user._id.toString(),
        user.role
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
        },
    };
};

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const logout = async () => {
    return {
        message: "Logout successful",
    };
};

const updateProfile = async (
    userId: string,
    data: {
        name?: string;
        phone?: string;
    }
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (data.name !== undefined) {
        user.name = data.name;
    }

    if (data.phone !== undefined) {
        user.phone = data.phone;
    }

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        isActive: user.isActive,
    };
};

const changePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return {
        message: "Password changed successfully",
    };
};

const updateProfileImage = async (
    userId: string,
    profileImage: string
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.profileImage = profileImage;

    await user.save();

    return {
        profileImage: user.profileImage,
    };
};

export default {
    register,
    login,
    getMe,
    logout,
    updateProfile,
    changePassword,
    updateProfileImage,
};