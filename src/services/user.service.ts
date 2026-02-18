import { env } from "@/env";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import { StudentUser } from "@/types";


const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL

export type UpdateStudentProfilePayload = {
    name?: string
    phone?: string
    image?: string
}

export type AdminDashboardStats = {
    overview: {
        totalUsers: number
        totalStudents: number
        totalTutors: number
        totalAdmins: number
        activeUsers: number
        inactiveUsers: number
        bannedUsers: number
        totalTutorProfiles: number
        verifiedTutors: number
        totalBookings: number
        ongoingBookings: number
        upcomingBookings: number
        pastBookings: number
        totalReviews: number
        visibleReviews: number
        hiddenReviews: number
        totalCategories: number
        activeCategories: number
        totalAvailabilitySlots: number
        completedRevenue: number
        averageRating: number
    }
    charts: {
        usersTrend: Array<{ label: string; value: number }>
        bookingsTrend: Array<{ label: string; value: number }>
        reviewsTrend: Array<{ label: string; value: number }>
        bookingStatusBreakdown: Array<{ status: string; value: number }>
        topCategoryBreakdown: Array<{ label: string; value: number }>
    }
}

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
            `${BACKEND_URL}/api/users/${id}`
        )

        return {
            userData: data,
            error,
        }
    },

    getAllUsers: async () => {
        const { data, error } = await serverFetch(`${BACKEND_URL}/api/users`)

        return {
            data, error
        }
    },

    updateStudentProfile: async (payload: UpdateStudentProfilePayload) => {
        const { data, error } = await serverFetch(`${BACKEND_URL}/api/users/profile`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload),
        })

        return {
            data,
            error,
        }
    },

    getAdminDashboardStats: async (): Promise<{ data: AdminDashboardStats | null; error: { message: string } | null }> => {
        const { data, error } = await serverFetch(`${BACKEND_URL}/api/users/admin-dashboard-stats`)

        return {
            data,
            error,
        }
    }
}