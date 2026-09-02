import Service from "../models/Services";

const getServices = async (
    category?: string,
    search?: string
) => {
    const filter: any = {
        isActive: true,
    };

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    return await Service.find(filter)
        .populate("providerId", "name email phone profileImage")
        .sort({ createdAt: -1 });
};

const getServiceById = async (id: string) => {
    const service = await Service.findById(id)
        .populate(
            "providerId",
            "name email phone profileImage"
        );

    if (!service) {
        throw new Error("Service not found");
    }

    return service;
};

const createService = async (
    providerId: string,
    data: {
        category: string;
        name: string;
        description: string;
        price: number;
        duration: number;
    }
) => {
    return await Service.create({
        providerId,
        ...data,
        isActive: true,
    });
};

const updateService = async (
    id: string,
    providerId: string,
    data: any
) => {
    const service = await Service.findOne({
        _id: id,
        providerId,
    });

    if (!service) {
        throw new Error("Service not found");
    }

    Object.assign(service, data);

    await service.save();

    return service;
};

const deleteService = async (
    id: string,
    providerId: string
) => {
    const service = await Service.findOne({
        _id: id,
        providerId,
    });

    if (!service) {
        throw new Error("Service not found");
    }

    service.isActive = false;

    await service.save();

    return service;
};

export default {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
};