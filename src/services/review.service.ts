import { env } from "@/env";
import { BookingData, reviewPayload } from "@/types";
import { cookies } from "next/headers"

const API_URL = env.BACKEND_URL

export const reviewService = {
    createBooking: async (reviewData: reviewPayload) => {
        try {
            const cookieStore = await cookies();


            const res = await fetch(`${API_URL}/api/review`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(reviewData)
            })

            // console.log('Response status:', res.status)
            // console.log('Response ok:', res.ok)

            const data = await res.json()
            // console.log('Response data:', data)

            if (!res.ok || data.error) {
                return {
                    data: null,
                    error: {
                        message: data.error || data.message || `HTTP ${res.status}: Error creating review`
                    }
                }
            }

            return {
                data,
                error: null
            }

        } catch (error) {
            console.error('Review creating error:', error)
            return {
                data: null,
                error: { message: 'Error creating review' }
            };
        }
    }
}