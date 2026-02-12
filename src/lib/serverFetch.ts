// lib/serverFetch.ts

import { cookies } from "next/headers"

export async function serverFetch(
    url: string,
    options: RequestInit = {}
) {
    const cookieStore = cookies()

    const cookieHeader = (await cookieStore)
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ")

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Cookie: cookieHeader,
        },
        cache: "no-store",
    })

    const result = await res.json().catch(() => null)

    if (!res.ok) {
        return {
            data: null,
            error: {
                message: result?.message || "Request failed",
                status: res.status,
            },
        }
    }

    return {
        data: result?.data ?? result,
        error: null,
    }
}
