'use server'
import tutorServices, { CreateTutor } from "@/services/tutor.service"


export const createTutor = async (payload: CreateTutor) => {
    const res = await tutorServices.createTutor(payload)
    return res;
}