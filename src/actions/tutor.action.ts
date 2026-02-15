'use server'
import tutorServices, { TutorProfile } from "@/services/tutor.service"


export const createTutor = async (payload: TutorProfile) => {
    const res = await tutorServices.createTutor(payload)
    return res;
}