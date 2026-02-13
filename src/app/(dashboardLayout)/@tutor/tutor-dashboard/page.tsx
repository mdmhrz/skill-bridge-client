import tutorServices from '@/services/tutor.service';
import { AlertCircle, TrendingUp, Users, Calendar, Star, DollarSign, BookOpen, Clock, Award, CheckCircle2, CalendarClock, MessageSquare, Activity } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TutorDashboard = async () => {
    const { data, error } = await tutorServices.getTutorProfile();

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">Failed to load dashboard</p>
                </div>
            </div>
        );
    }

    const tutor = data;
    const user = tutor.user;

    // Calculate real metrics
    const now = new Date();
    const bookings = tutor.bookings || [];
    const reviews = tutor.reviews || [];
    
    // Upcoming bookings (future sessions)
    const upcomingBookings = bookings.filter((b: any) => {
        const scheduleDate = new Date(b.scheduledDate);
        return scheduleDate > now;
    }).sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

    // Unique students count
    const uniqueStudents = new Set(bookings.map((b: any) => b.student.id)).size;

    // Total earnings calculation
    const hourlyRate = parseFloat(tutor.hourlyRate || '0');
    const totalBookings = bookings.length;
    const estimatedEarnings = totalBookings * hourlyRate;

    // Average rating
    const averageRating = reviews.length > 0 
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length 
        : 0;

    // Availability hours calculation
    const totalAvailabilityHours = tutor.availability.reduce((total: number, slot: any) => {
        const start = slot.startTime.split(':');
        const end = slot.endTime.split(':');
        const startHours = parseInt(start[0]) + parseInt(start[1]) / 60;
        const endHours = parseInt(end[0]) + parseInt(end[1]) / 60;
        return total + (endHours - startHours);
    }, 0);

    // Account age
    const accountAge = Math.floor((now.getTime() - new Date(tutor.createdAt).getTime()) / (1000 * 60 * 60 * 24));

    // Get initials
    const getInitials = (name: string) => {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    };

    // Format time
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Bookings by day distribution
    const bookingsByDay = bookings.reduce((acc: any, booking: any) => {
        const day = new Date(booking.scheduledDate).toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxBookingsPerDay = Math.max(...daysOfWeek.map(day => bookingsByDay[day] || 0), 1);

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-muted-foreground mt-1">Here's your teaching overview</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {tutor.isVerified && (
                            <Badge variant="default" className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified Tutor
                            </Badge>
                        )}
                        <Badge variant={user.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                {user.status}
                            </div>
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Students */}
                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{uniqueStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Unique students taught
                        </p>
                        <div className="mt-3">
                            <div className="flex items-center gap-1 text-xs text-primary">
                                <TrendingUp className="h-3 w-3" />
                                <span>Active learners</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Sessions */}
                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                        <div className="p-2.5 bg-blue-500/10 rounded-xl">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalBookings}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {upcomingBookings.length} upcoming
                        </p>
                        <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">This month</span>
                                <span className="font-medium">{totalBookings}</span>
                            </div>
                            <Progress value={(totalBookings / 20) * 100} className="h-1.5" />
                        </div>
                    </CardContent>
                </Card>

                {/* Earnings */}
                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Est. Earnings</CardTitle>
                        <div className="p-2.5 bg-green-500/10 rounded-xl">
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">৳{estimatedEarnings.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            ৳{hourlyRate}/hour rate
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{width: '75%'}} />
                            </div>
                            <span className="text-xs font-medium text-green-600">+75%</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Rating */}
                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{reviews.length > 0 ? averageRating.toFixed(1) : 'New'}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                        <div className="flex gap-0.5 mt-3">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted fill-muted'}`}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 lg:grid-cols-7">
                {/* Weekly Activity Chart */}
                <Card className="lg:col-span-4 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Weekly Activity
                                </CardTitle>
                                <CardDescription className="mt-1">Your sessions distribution</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Simple Bar Chart */}
                        <div className="space-y-4">
                            {daysOfWeek.map((day) => {
                                const count = bookingsByDay[day] || 0;
                                const percentage = maxBookingsPerDay > 0 ? (count / maxBookingsPerDay) * 100 : 0;
                                
                                return (
                                    <div key={day} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium w-12">{day}</span>
                                            <span className="text-muted-foreground">{count} sessions</span>
                                        </div>
                                        <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-lg transition-all duration-500 flex items-center justify-end px-3"
                                                style={{ width: `${percentage}%` }}
                                            >
                                                {count > 0 && (
                                                    <span className="text-xs font-bold text-primary-foreground">
                                                        {count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary */}
                        <div className="mt-6 pt-6 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Busiest Day</p>
                                    <p className="text-lg font-bold">
                                        {Object.entries(bookingsByDay).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Avg per Day</p>
                                    <p className="text-lg font-bold">
                                        {(totalBookings / 7).toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card className="lg:col-span-3 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarClock className="h-5 w-5 text-blue-500" />
                            Upcoming Sessions
                        </CardTitle>
                        <CardDescription>Your next scheduled classes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {upcomingBookings.length > 0 ? (
                            <div className="space-y-3">
                                {upcomingBookings.slice(0, 5).map((booking: any) => {
                                    const bookingDate = new Date(booking.scheduledDate);
                                    return (
                                        <div key={booking.id} className="flex gap-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border">
                                            <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
                                                <p className="text-xs font-medium text-primary">
                                                    {bookingDate.toLocaleDateString('en-US', { month: 'short' })}
                                                </p>
                                                <p className="text-2xl font-bold text-primary">
                                                    {bookingDate.getDate()}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-sm font-medium truncate">
                                                        {booking.student.name}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatTime(bookingDate)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {upcomingBookings.length > 5 && (
                                    <p className="text-xs text-center text-muted-foreground pt-2">
                                        +{upcomingBookings.length - 5} more sessions
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                                    <CalendarClock className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">No upcoming sessions</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Additional Stats & Info */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Teaching Stats */}
                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Teaching Statistics
                        </CardTitle>
                        <CardDescription>Your performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Experience */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Experience Level</span>
                                    <span className="text-muted-foreground">{tutor.experience} years</span>
                                </div>
                                <Progress value={(tutor.experience / 20) * 100} className="h-2" />
                            </div>

                            {/* Availability Hours */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Weekly Availability</span>
                                    <span className="text-muted-foreground">{totalAvailabilityHours.toFixed(1)} hrs</span>
                                </div>
                                <Progress value={(totalAvailabilityHours / 40) * 100} className="h-2" />
                            </div>

                            {/* Response Rate (Mock) */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Completion Rate</span>
                                    <span className="text-muted-foreground">100%</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>

                            <div className="pt-4 border-t grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="p-2 bg-primary/10 rounded-lg mx-auto w-fit mb-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-2xl font-bold">{tutor.categories.length}</p>
                                    <p className="text-xs text-muted-foreground">Subjects</p>
                                </div>
                                <div className="text-center">
                                    <div className="p-2 bg-blue-500/10 rounded-lg mx-auto w-fit mb-2">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <p className="text-2xl font-bold">{tutor.availability.length}</p>
                                    <p className="text-xs text-muted-foreground">Days Available</p>
                                </div>
                                <div className="text-center">
                                    <div className="p-2 bg-green-500/10 rounded-lg mx-auto w-fit mb-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    </div>
                                    <p className="text-2xl font-bold">{accountAge}</p>
                                    <p className="text-xs text-muted-foreground">Days Active</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-yellow-500" />
                            Recent Reviews
                        </CardTitle>
                        <CardDescription>What students are saying</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map((review: any) => (
                                    <div key={review.id} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={review.student.image || undefined} />
                                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                                    {getInitials(review.student.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-medium text-sm">{review.student.name}</p>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`h-3 w-3 ${
                                                                    i < review.rating 
                                                                        ? 'text-yellow-500 fill-yellow-500' 
                                                                        : 'text-muted fill-muted'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-foreground/90 italic">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">No reviews yet</p>
                                <p className="text-xs text-muted-foreground mt-1">Complete sessions to get reviews</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Profile Completion */}
            <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Profile Completion
                    </CardTitle>
                    <CardDescription>Complete your profile to attract more students</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Profile Strength</span>
                            <span className="text-2xl font-bold text-primary">85%</span>
                        </div>
                        <Progress value={85} className="h-3" />
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium">Bio Added</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium">Education</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium">Availability</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-medium">Get Verified</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TutorDashboard;