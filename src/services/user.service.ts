import User from "../models/User";

const getUsers = async () => {
    return await User.find()
        .select("-password")
        .sort({ createdAt: -1 });
};

const getUserById = async (id: string) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const updateUser = async (
    id: string,
    data: {
        name?: string;
        phone?: string;
    }
) => {
    const user = await User.findById(id);

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

    return await User.findById(id).select("-password");
};

const updateUserStatus = async (
    id: string,
    isActive: boolean
) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    user.isActive = isActive;

    await user.save();

    return await User.findById(id).select("-password");
};

export default {
    getUsers,
    getUserById,
    updateUser,
    updateUserStatus,
};