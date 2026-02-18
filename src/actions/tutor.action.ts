'use server'
import tutorServices, { TutorProfile } from "@/services/tutor.service"

type TutorSearchParams = {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: string
    experience?: number
}


export const createTutor = async (payload: TutorProfile) => {
    const res = await tutorServices.createTutor(payload)
    return res;
}


export const featuredTutors = async () => {
    const res = await tutorServices.getFeaturedTutors()
    return res
}

export const searchTutors = async (params: TutorSearchParams) => {
    const res = await tutorServices.getTutors(params)
    return res
}