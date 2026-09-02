import Availability from "../models/Availability";

const getProviderAvailability = async (
    providerId: string
) => {
    return await Availability.find({
        providerId,
    }).sort({
        day: 1,
        startTime: 1,
    });
};

const createAvailability = async (
    providerId: string,
    data: {
        day: string;
        startTime: string;
        endTime: string;
        isAvailable?: boolean;
    }
) => {
    if (data.startTime >= data.endTime) {
        throw new Error(
            "Start time must be before end time"
        );
    }

    return await Availability.create({
        providerId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        isAvailable: data.isAvailable ?? true,
    });
};

const updateAvailability = async (
    id: string,
    providerId: string,
    data: {
        day?: string;
        startTime?: string;
        endTime?: string;
        isAvailable?: boolean;
    }
) => {
    const availability =
        await Availability.findOne({
            _id: id,
            providerId,
        });

    if (!availability) {
        throw new Error("Availability not found");
    }

    if (
        data.startTime &&
        data.endTime &&
        data.startTime >= data.endTime
    ) {
        throw new Error(
            "Start time must be before end time"
        );
    }

    Object.assign(availability, data);

    await availability.save();

    return availability;
};

const deleteAvailability = async (
    id: string,
    providerId: string
) => {
    const availability =
        await Availability.findOneAndDelete({
            _id: id,
            providerId,
        });

    if (!availability) {
        throw new Error("Availability not found");
    }

    return availability;
};

export default {
    getProviderAvailability,
    createAvailability,
    updateAvailability,
    deleteAvailability,
};