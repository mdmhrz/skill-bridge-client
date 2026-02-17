import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";
import { Tutor } from "@/types/tutorDetails.type";
interface TutorResponse<T> {
    data: T | null;
    error: { message: string } | null;
}

interface GetTutorsParams {
    sortBy?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortOrder?: string;
    experience?: number
}

export type TutorProfile = {
    bio: string;
    title: string;
    experience: number;
    hourlyRate: number;
    languages: string[];
    education: string;
    categories: number[];
};


const API_URL = env.BACKEND_URL

const tutorServices = {

    getTutors: async (params?: GetTutorsParams) => {

        try {
            const url = new URL(`${API_URL}/api/tutor`);


            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.set(key, String(value));
                    }
                })
            }

            console.log(url)

            const response = await fetch(url.toString());
            const tutors = await response.json();
            return { data: tutors, error: null };
        } catch (error) {
            return { data: null, error: { message: "Tutors data retrieval error" } };
        }

    },

    getTutorById: async (id: string): Promise<TutorResponse<Tutor>> => {
        try {
            const res = await fetch(`${API_URL}/api/tutor/${id}`, {
                next: { tags: [`tutor-${id}`] }
            });
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Error fetching tutor profile by ID' } };
        }
    },

    getTutorProfile: async function () {
        const { data, error } = await serverFetch(
            `${API_URL}/api/tutor/my-profile`
        )
        return {
            data,
            error,
        }
    },

    createTutor: async (payload: TutorProfile) => {
        const { data, error } = await serverFetch(
            `${API_URL}/api/tutor`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )

        return {
            data,
            error
        }
    },



    getFeaturedTutors: async () => {
        try {
            const res = await fetch(`${API_URL}/api/tutor/featured`);
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Error fetching featured tutors' } };
        }
    },



};

export default tutorServices;