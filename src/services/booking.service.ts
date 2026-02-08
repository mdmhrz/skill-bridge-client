import { env } from "@/env";
import { BookingData } from "@/types";
import { cookies } from "next/headers"

const API_URL = env.BACKEND_BASE_URL

export const bookingService = {
    createBooking: async (bookingData: BookingData) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/booking`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(bookingData)
            })

            const data = await res.json()

            if (data.error) {
                return {
                    data: null, error: {
                        message: data.error || "Error creating booking"
                    }
                }
            }

            return {
                data,
                error: null
            }

        } catch (error) {
            return {
                data: null,
                error: { message: 'Error creating booking' }
            };
        }
    }
}