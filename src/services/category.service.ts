import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";
import { Tutor } from "@/types/tutorDetails.type";



const API_URL = env.BACKEND_URL

const categoryServices = {

    getCategories: async () => {
        try {
            const res = await fetch(`${API_URL}/api/categories`);
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Error fetching categories' } };
        }
    }

};

export default categoryServices;