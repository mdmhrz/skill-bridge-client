
import { env } from "@/env"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BACKEND_BASE_URL,
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    })
  },
})