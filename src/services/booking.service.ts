import { env } from "@/env";
import { BookingData } from "@/types";
import { cookies } from "next/headers"

const API_URL = env.BACKEND_BASE_URL

export const bookingService = {
    createBooking: async (bookingData: BookingData) => {
        try {
            const cookieStore = await cookies();
            // console.log('Making booking request to:', `${API_URL}/api/booking`)
            // console.log('Booking data:', bookingData)
            
            const res = await fetch(`${API_URL}/api/booking`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(bookingData)
            })

            // console.log('Response status:', res.status)
            // console.log('Response ok:', res.ok)

            const data = await res.json()
            console.log('Response data:', data)

            if (!res.ok || data.error) {
                return {
                    data: null, 
                    error: {
                        message: data.error || data.message || `HTTP ${res.status}: Error creating booking`
                    }
                }
            }

            return {
                data,
                error: null
            }

        } catch (error) {
            console.error('Booking service error:', error)
            return {
                data: null,
                error: { message: 'Error creating booking' }
            };
        }
    }
}