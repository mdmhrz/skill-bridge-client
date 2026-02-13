import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";


const API_URL = env.BACKEND_BASE_URL

export interface AvailabilityPaylod {
    dayOfWeek: string;
    startTime: string;
    endTime: string
}

export const availabilityService = {
    updateAvailability: async ({ id, payload }: { id: string, payload: AvailabilityPaylod }) => {
        const { data, error } = await serverFetch(`${API_URL}/api/availability/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        return { data, error };
    }

}