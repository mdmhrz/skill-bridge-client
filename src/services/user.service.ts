import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

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
    }
}