import { env } from "@/env";
import { Tutor } from "@/types";
interface TutorResponse<T> {
    data: T | null;
    error: { message: string } | null;
}


const API_URL = env.BACKEND_BASE_URL

const tutorServices = {

    getTutors: async () => {

        try {
            const response = await fetch(`${API_URL}/api/tutor`);
            const tutors = await response.json();
            return { data: tutors, error: null };
        } catch (error) {
            return { data: null, error: { message: "Tutors data retrieval error" } };
        }

    },

    getTutorById: async (id: string): Promise<TutorResponse<Tutor>> => {
        try {
            const res = await fetch(`${API_URL}/api/tutor/${id}`);
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Error fetching blog post by ID' } };
        }
    },

};

export default tutorServices;