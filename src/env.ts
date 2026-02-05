import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
    server: {
        FRONTEND_BASE_URL: z.url(),
        BACKEND_BASE_URL: z.url(),
        AUTH_URL: z.url(),
    },


    //client example
    client: {
        NEXT_PUBLIC_BACKEND_BASE_URL: z.url(),
        NEXT_PUBLIC_FRONTEND_BASE_URL: z.url(),
    },


    runtimeEnv: {
        FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
    },
})