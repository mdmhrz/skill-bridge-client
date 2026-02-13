import { userService } from '@/services/user.service';
import { AlertCircle, XCircle } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { StudentUser, StudentBooking, Review } from '@/types';
import { KeyMetricsCards } from './_components/KeyMetricsCards';
import { BookingStatistics } from './_components/BookingStatistics';
import { UpcomingSessions } from './_components/UpcomingSessions';
import { RecentBookings } from './_components/RecentBookings';
import { UserReviews } from './_components/UserReviews';
import { AccountSummary } from './_components/AccountSummary';

const StudentDashboard = async () => {
    // Fetch session
    const { data: session, error: sessionError } = await userService.getSession()

    if (!session || sessionError) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">Unauthorized or session not found</p>
                </div>
            </div>
        )
    }

    const userId = session.user?.id
    if (!userId) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">User ID not found</p>
                </div>
            </div>
        )
    }

    // Fetch user details
    const { userData: user, error } = await userService.getUserDetailsById(userId)

    if (error || !user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <XCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">{error?.message || 'Failed to load profile'}</p>
                </div>
            </div>
        )
    }

    // Real data calculations from API
    const now = new Date();
    const bookings: StudentBooking[] = user.studentBookings || [];
    const reviews: Review[] = user.reviews || [];

    // Booking status calculations
    const completedBookings = bookings.filter((b: StudentBooking) => b.completedAt || b.status === 'COMPLETED').length;
    const confirmedBookings = bookings.filter((b: StudentBooking) => b.status === 'CONFIRMED').length;
    const cancelledBookings = bookings.filter((b: StudentBooking) => b.status === 'CANCELLED').length;

    // Upcoming bookings (scheduled in the future)
    const upcomingBookings = bookings.filter((b: StudentBooking) => {
        const scheduleDate = new Date(b.scheduledDate);
        return scheduleDate > now && b.status === 'CONFIRMED';
    }).sort((a: StudentBooking, b: StudentBooking) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

    // Past bookings
    const pastBookings = bookings.filter((b: StudentBooking) => {
        const scheduleDate = new Date(b.scheduledDate);
        return scheduleDate <= now;
    }).sort((a: StudentBooking, b: StudentBooking) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

    // Financial calculations
    const totalSpent = bookings.reduce((sum: number, booking: StudentBooking) => sum + parseFloat(booking.totalPrice || '0'), 0);
    const averageBookingPrice = bookings.length > 0 ? totalSpent / bookings.length : 0;

    // Total hours
    const totalHours = bookings.reduce((sum: number, booking: StudentBooking) => sum + (booking.duration || 0), 0) / 60;

    // Rating calculations
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviews.length
        : 0;

    // Account age
    const accountAge = Math.floor((now.getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));

    // Completion rate
    const totalBookings = bookings.length;
    const completionRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;

    // Helper functions are now in /utils/dateUtils.ts and imported by client components

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-muted-foreground mt-1">Here's your learning journey at a glance</p>
                    </div>
                    <Badge variant={user.status === 'ACTIVE' ? 'default' : 'secondary'} className="text-sm px-4 py-1.5 w-fit">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                            {user.status}
                        </div>
                    </Badge>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <KeyMetricsCards
                totalBookings={bookings.length}
                confirmedBookings={confirmedBookings}
                upcomingBookings={upcomingBookings}
                totalHours={totalHours}
                bookings={bookings}
                reviews={reviews}
                averageRating={averageRating}
            />

            {/* Main Content Grid */}
            <div className="grid gap-4 lg:grid-cols-7">
                {/* Booking Statistics */}
                <div className="lg:col-span-4">
                    <BookingStatistics
                        confirmedBookings={confirmedBookings}
                        completedBookings={completedBookings}
                        cancelledBookings={cancelledBookings}
                        totalSpent={totalSpent}
                        averageBookingPrice={averageBookingPrice}
                    />
                </div>

                {/* Upcoming Sessions Timeline */}
                <div className="lg:col-span-3">
                    <UpcomingSessions upcomingBookings={upcomingBookings} />
                </div>
            </div>

            {/* Recent Activity & Reviews */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Recent Bookings */}
                <RecentBookings
                    bookings={bookings}
                />

                {/* Your Reviews */}
                <UserReviews
                    reviews={reviews}
                />
            </div>

            {/* Account Summary */}
            <AccountSummary
                user={user}
                accountAge={accountAge}
            />
        </div>
    );
};

export default StudentDashboard;