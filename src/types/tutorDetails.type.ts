export interface Student {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    student: Student;
}

export interface Booking {
    id: string;
    scheduledDate: string;
    student: Student;
}

export interface Availability {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface TutorCategoryRelation {
    category: Category;
}

export interface Tutor {
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
    user: {
        name: string;
        email: string;
        image?: string;
    };
    categories: TutorCategoryRelation[];
    availability: Availability[];
    bookings: Booking[];
    reviews: Review[];
    _count: {
        reviews: number;
        bookings: number;
        availability: number;
    };
}

export interface TutorResponse {
    message: string;
    data: Tutor;
}