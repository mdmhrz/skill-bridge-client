import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";


const API_URL = env.BACKEND_URL

export interface AvailabilityPaylod {
    dayOfWeek: string;
    startTime: string;
    endTime: string
}

export interface CreateAvailability extends AvailabilityPaylod {
    tutorProfileId: string;
}

export const availabilityService = {

    createAvailability: async ({ payload }: { payload: CreateAvailability }) => {
        const { data, error } = await serverFetch(`${API_URL}/api/availability`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        return { data, error };
    },



    updateAvailability: async ({ id, payload }: { id: string, payload: AvailabilityPaylod }) => {
        const { data, error } = await serverFetch(`${API_URL}/api/availability/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        return { data, error };
    },


    deleteAvailability: async (id: string) => {
        const { data, error } = await serverFetch(`${API_URL}/api/availability/${id}`, {
            method: "DELETE"
        })

        return { data, error };
    },


}