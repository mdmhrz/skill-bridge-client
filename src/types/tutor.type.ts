export interface TutorUser {
    name: string
    email: string
    image: string
}

export interface TutorCategory {
    id: number
    name: string
    slug: string
    description: string
    icon: string
    isActive: boolean
}

export interface TutorCategoryRelation {
    id: number
    tutorProfileId: string
    categoryId: number
    category: TutorCategory
}

export interface Tutor {
    id: string
    userId: string
    bio: string
    title: string
    experience: number
    hourlyRate: string
    rating: string
    totalReviews: number
    isVerified: boolean
    languages: string[]
    education: string
    createdAt: string
    updatedAt: string
    user: TutorUser
    categories: TutorCategoryRelation[]
}
