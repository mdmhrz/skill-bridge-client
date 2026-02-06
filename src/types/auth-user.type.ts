export type AuthSession = {
    id: string
    userId: string
    token: string
    ipAddress: string
    userAgent: string
    createdAt: string
    updatedAt: string
    expiresAt: string
}

export type AuthUser = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: "STUDENT" | "TUTOR" | "ADMIN"
    phone: string | null
    isBanned: boolean
    bannedReason: string | null
    createdAt: string
    updatedAt: string
}

export type AuthResponse = {
    session: AuthSession
    user: AuthUser
}
