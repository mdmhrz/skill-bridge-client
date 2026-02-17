'use server'
import tutorServices, { TutorProfile } from "@/services/tutor.service"


export const createTutor = async (payload: TutorProfile) => {
    const res = await tutorServices.createTutor(payload)
    return res;
}


export const featuredTutors = async () => {
    const res = await tutorServices.getFeaturedTutors()
    return res
}