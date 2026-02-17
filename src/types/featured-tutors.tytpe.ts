
// Types

interface Category {
    id: number;
    tutorProfileId: string;
    categoryId: number;
    createdAt: string;
    category: {
        id: number;
        name: string;
        slug: string;
        description: string;
        icon: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

interface TutorUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    phone: string | null;
    isBanned: boolean;
    bannedReason: string | null;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface TutorProfile {
    id: string;
    userId: string;
    bio: string;
    title: string;
    experience: number;
    hourlyRate: string;
    rating: string;
    totalReviews: number;
    isVerified: boolean;
    languages: string[];
    education: string;
    createdAt: string;
    updatedAt: string;
    user: TutorUser;
    categories: Category[];
    availability: unknown[];
    _count: { reviews: number; bookings: number };
}
