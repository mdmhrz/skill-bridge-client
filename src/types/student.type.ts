export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN'
export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'PENDING'

export type StudentBooking = {
    id: string
    studentId: string
    tutorProfileId: string
    categoryId: string
    scheduledDate: string
    duration: number
    totalPrice: string
    status: BookingStatus
    notes: string | null
    meetingLink: string | null
    cancellationReason: string | null
    cancelledAt: string | null
    completedAt: string | null
    createdAt: string
    updatedAt: string
}

export type Review = {
    id: string
    bookingId: string
    studentId: string
    tutorProfileId: string
    rating: number
    comment: string
    isVisible: boolean
    createdAt: string
    updatedAt: string
}

export type UserCount = {
    studentBookings: number
    reviews: number
}

export type StudentUser = {
    id: string
    name: string
    email: string
    image: string | null
    emailVerified: boolean
    phone: string | null
    isBanned: boolean
    bannedReason: string | null
    role: UserRole
    status: UserStatus
    createdAt: string
    updatedAt: string
    studentBookings: StudentBooking[]
    reviews: Review[]
    _count: UserCount
}

export type StudentDashboardResponse = {
    success: boolean
    message: string
    data: StudentUser
}
