
// import { env } from "@/env"
// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: env.NEXT_PUBLIC_BACKEND_BASE_URL
// })


// after changing.

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    fetchOptions: {
        credentials: "include",
    },
});