'use server'

import { AvailabilityPaylod, availabilityService } from "@/services/availability.service";

export const updateAvailability = async (id: string, availabilityData: AvailabilityPaylod) => {
    const res = await availabilityService.updateAvailability({
        id,
        payload: availabilityData
    });

    return res;
}
