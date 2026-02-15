import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import { StudentUser } from "@/types";


const AUTH_URL = env.AUTH_URL;
const BACKEND_BASE_URL = env.BACKEND_BASE_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies()
            // console.log(cookieStore.get("better-auth.session_token"));

            // const session = await authClient.getSession();

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: 'no-store'
            })

            const session = await res.json();

            if (session === null) {
                return { data: null, error: { message: 'Session not found' } };
            }
            return { data: session, error: null };
        } catch (error) {
            console.error('Error fetching session:', error);
            return { data: null, error: { message: 'Error fetching session' } };
        }
    },

    getUserDetailsById: async function (id: string): Promise<{ userData: StudentUser | null; error: { message: string } | null }> {
        if (!id) {
            return {
                userData: null,
                error: { message: "User ID is required" }
            }
        }

        const { data, error } = await serverFetch(
            `${BACKEND_BASE_URL}/api/users/${id}`
        )

        return {
            userData: data,
            error,
        }
    },

    getAllUsers: async () => {
        const { data, error } = await serverFetch(`${BACKEND_BASE_URL}/api/users`)

        return {
            data, error
        }
    }
}