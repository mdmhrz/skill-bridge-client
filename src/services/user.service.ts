import { env } from "@/env"
import { cookies } from "next/headers"

const AUTH_URL = env.AUTH_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies() // <-- NO await
            const sessionToken = cookieStore.get("better-auth.session_token")?.value

            if (!sessionToken) {
                return { data: null, error: { message: "No session token found" } }
            }

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
                cache: "no-store",
            })

            if (!res.ok) {
                return { data: null, error: { message: "Session fetch failed" } }
            }

            const session = await res.json()
            return { data: session, error: null }
        } catch (error) {
            console.error("Error fetching session:", error)
            return { data: null, error: { message: "Error fetching session" } }
        }
    },
}
