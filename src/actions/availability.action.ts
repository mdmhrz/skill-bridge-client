'use server'

import { AvailabilityPaylod, availabilityService, CreateAvailability } from "@/services/availability.service";

export const updateAvailability = async (id: string, availabilityData: AvailabilityPaylod) => {
    const res = await availabilityService.updateAvailability({
        id,
        payload: availabilityData
    });

    return res;
}


export const createAvailability = async (payload: CreateAvailability) => {
    const res = await availabilityService.createAvailability({ payload })
    return res
}

export const deleteAvailability = async (id: string) => {
    const res = await availabilityService.deleteAvailability(id)
    return res
}
