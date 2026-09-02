import Booking, {
    BookingStatus,
} from "../models/Booking";
import Service from "../models/Services";


const createBooking = async (
    customerId: string,
    data: {
        serviceId: string;
        bookingDate: Date;
        startTime: string;
        endTime: string;
        notes?: string;
    }
) => {
    const service = await Service.findById(
        data.serviceId
    );

    if (!service) {
        throw new Error("Service not found");
    }

    if (!service.isActive) {
        throw new Error("Service is not active");
    }

    const booking = await Booking.create({
        customerId,
        providerId: service.providerId,
        serviceId: data.serviceId,
        bookingDate: data.bookingDate,
        startTime: data.startTime,
        endTime: data.endTime,
        notes: data.notes,
        status: BookingStatus.PENDING,
    });

    return await Booking.findById(booking._id)
        .populate("customerId", "name email phone")
        .populate("providerId", "name email phone")
        .populate("serviceId");
};

const getMyBookings = async (
    customerId: string
) => {
    return await Booking.find({
        customerId,
    })
        .populate("providerId", "name email phone")
        .populate("serviceId")
        .sort({ createdAt: -1 });
};

const getProviderBookings = async (
    providerId: string
) => {
    return await Booking.find({
        providerId,
    })
        .populate("customerId", "name email phone")
        .populate("serviceId")
        .sort({ createdAt: -1 });
};

const confirmBooking = async (
    id: string,
    providerId: string
) => {
    const booking = await Booking.findOne({
        _id: id,
        providerId,
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.status !== BookingStatus.PENDING) {
        throw new Error(
            "Only pending bookings can be confirmed"
        );
    }

    booking.status = BookingStatus.CONFIRMED;

    await booking.save();

    return booking;
};

const rejectBooking = async (
    id: string,
    providerId: string,
    rejectionReason: string
) => {
    const booking = await Booking.findOne({
        _id: id,
        providerId,
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.status !== BookingStatus.PENDING) {
        throw new Error(
            "Only pending bookings can be rejected"
        );
    }

    booking.status = BookingStatus.REJECTED;
    booking.rejectionReason = rejectionReason;

    await booking.save();

    return booking;
};

const cancelBooking = async (
    id: string,
    customerId: string
) => {
    const booking = await Booking.findOne({
        _id: id,
        customerId,
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (
        booking.status !== BookingStatus.PENDING &&
        booking.status !== BookingStatus.CONFIRMED
    ) {
        throw new Error(
            "This booking cannot be cancelled"
        );
    }

    booking.status = BookingStatus.CANCELLED;

    await booking.save();

    return booking;
};

const completeBooking = async (
    id: string,
    providerId: string
) => {
    const booking = await Booking.findOne({
        _id: id,
        providerId,
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
        throw new Error(
            "Only confirmed bookings can be completed"
        );
    }

    booking.status = BookingStatus.COMPLETED;

    await booking.save();

    return booking;
};

export default {
    createBooking,
    getMyBookings,
    getProviderBookings,
    confirmBooking,
    rejectBooking,
    cancelBooking,
    completeBooking,
};