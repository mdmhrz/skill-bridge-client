'use server'
import { bookingService } from "@/services/booking.service"
import { BookingData } from "@/types"

export const createBooking = async (bookingData: BookingData) => {
    const res = await bookingService.createBooking(bookingData)
    return res;
}