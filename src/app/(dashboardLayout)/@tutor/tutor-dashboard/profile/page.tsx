import tutorServices from '@/services/tutor.service';
import { AlertCircle, Mail, Phone, Award, BookOpen, Star, Clock, Calendar, Languages, GraduationCap, CheckCircle, Shield, MapPin } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const TutorProfilePage = async () => {
    const { data, error } = await tutorServices.getTutorProfile();

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">Failed to load profile</p>
                </div>
            </div>
        );
    }

    const tutor = data;
    const user = tutor.user;

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Calculate rating display
    const ratingValue = parseFloat(tutor.rating || '0');
    const hasReviews = tutor.totalReviews > 0;

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="relative">
                <Card className="border-t-4 border-t-primary">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="relative">
                                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                        <AvatarImage src={user.image || undefined} alt={user.name} />
                                        <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {tutor.isVerified && (
                                        <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
                                            <CheckCircle className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-3xl font-bold">{user.name}</h1>
                                        {tutor.isVerified && (
                                            <Badge variant="default" className="flex items-center gap-1">
                                                <Shield className="h-3 w-3" />
                                                Verified
                                            </Badge>
                                        )}
                                        <Badge variant="outline" className="capitalize">
                                            {user.status.toLowerCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-xl text-muted-foreground mt-1">{tutor.title}</p>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                                            <Star className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {hasReviews ? ratingValue.toFixed(1) : 'New'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {tutor.totalReviews} {tutor.totalReviews === 1 ? 'review' : 'reviews'}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator orientation="vertical" className="h-12" />

                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Award className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{tutor.experience} years</p>
                                            <p className="text-xs text-muted-foreground">Experience</p>
                                        </div>
                                    </div>

                                    <Separator orientation="vertical" className="h-12" />

                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <BookOpen className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{tutor._count.bookings}</p>
                                            <p className="text-xs text-muted-foreground">Total sessions</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hourly Rate */}
                                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-2xl font-bold text-primary">৳{tutor.hourlyRate}</p>
                                        <p className="text-xs text-muted-foreground">per hour</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About / Bio */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                About Me
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {tutor.bio || 'No bio provided yet.'}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">{tutor.education}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Academic Qualification</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Categories/Subjects */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Teaching Subjects
                            </CardTitle>
                            <CardDescription>Subjects I can help you with</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {tutor.categories.map((item: any) => (
                                    <div
                                        key={item.category.id}
                                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.category.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.category.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Contact & Additional Info */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                                    <p className="text-sm font-medium break-all">{user.email}</p>
                                    {user.emailVerified && (
                                        <Badge variant="outline" className="mt-1 text-xs">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {user.phone && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Phone className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                                        <p className="text-sm font-medium">{user.phone}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Languages */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Languages className="h-5 w-5 text-primary" />
                                Languages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {tutor.languages.map((language: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="px-3 py-1">
                                        {language}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Availability Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Availability
                            </CardTitle>
                            <CardDescription>My teaching schedule</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {tutor.availability.map((slot: any) => (
                                    <div
                                        key={slot.id}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-primary/10 rounded">
                                                <Calendar className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <span className="font-medium text-sm capitalize">
                                                {slot.dayOfWeek.toLowerCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{slot.startTime} - {slot.endTime}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Role</span>
                                <Badge variant="outline">{user.role}</Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Member Since</span>
                                <span className="font-medium">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Profile Updated</span>
                                <span className="font-medium">
                                    {new Date(tutor.updatedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Reviews Section */}
            {tutor.reviews && tutor.reviews.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            Student Reviews ({tutor.reviews.length})
                        </CardTitle>
                        <CardDescription>What students say about me</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tutor.reviews.map((review: any) => (
                                <div
                                    key={review.id}
                                    className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900"
                                >
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={review.student.image || undefined} />
                                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                                {getInitials(review.student.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-medium">{review.student.name}</p>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
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
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TutorProfilePage;