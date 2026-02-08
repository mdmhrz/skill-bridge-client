import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Star,
    Clock,
    DollarSign,
    BookOpen,
    Languages,
    GraduationCap,
    Calendar,
    MessageSquare,
    Shield,
    Mail,
    CalendarDays,
    User,
    Bookmark,
    BookCheck,
    Globe,
    Award,
    Clock3,
    AlertCircle
} from "lucide-react"

import tutorServices from "@/services/tutor.service"

import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { format } from "date-fns"
import { getInitials } from "@/lib/utils/geInitials"
import { Tutor, TutorCategoryRelation } from "@/types/tutorDetails.type"
import BookSessions from "./_components/BookSessions"
import { userService } from "@/services/user.service"

export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { data } = await userService.getSession();

    const response = await tutorServices.getTutorById(id)

    if (!response?.data) {
        notFound()
    }

    const tutor: Tutor = response.data

    return (
        <div className="container mx-auto px-6 py-8 ">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-background via-background to-muted/30 border rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Avatar Section */}
                    <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                            <AvatarImage src={tutor?.user?.image} alt={tutor?.user?.name} />
                            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                                {getInitials(tutor?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                        {tutor?.isVerified && (
                            <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-primary">Verified Tutor</span>
                            </div>
                        )}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {tutor?.user?.name || "Tutor Name"}
                                </h1>
                                <Badge className="text-base px-4 py-1">
                                    ${tutor?.hourlyRate || "0"}/hr
                                </Badge>
                            </div>
                            <p className="text-xl text-muted-foreground font-semibold mt-1">
                                {tutor?.title || "Professional Tutor"}
                            </p>

                            {/* Rating and Experience */}
                            <div className="flex items-center gap-4 mt-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={cn(
                                                    "h-5 w-5",
                                                    star <= (Number(tutor?.rating) || 0)
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "text-muted"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold">
                                        {Number(tutor?.rating)?.toFixed(1) || "0.0"}
                                        <span className="text-muted-foreground font-normal ml-1">
                                            ({tutor?.totalReviews || 0} reviews)
                                        </span>
                                    </span>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {tutor?.experience || 0} {tutor?.experience === 1 ? "year" : "years"} experience
                                    </span>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                <div className="flex items-center gap-2">
                                    <BookCheck className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {tutor?._count?.bookings || 0} bookings
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        {tutor?.categories && tutor.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {tutor.categories.slice(0, 5).map((cat: TutorCategoryRelation, index: number) => (
                                    <Badge key={cat?.category?.id || index} variant="secondary" className="px-3 py-1">
                                        {cat?.category?.name || "Category"}
                                    </Badge>
                                ))}
                                {tutor.categories.length > 5 && (
                                    <Badge variant="outline" className="px-3 py-1">
                                        +{tutor.categories.length - 5} more
                                    </Badge>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">No categories specified</span>
                            </div>
                        )}

                        {/* Contact CTA */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <BookSessions user={data?.user} tutor={tutor}></BookSessions>
                            <Button variant="outline" size="lg">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Contact Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {tutor?.user?.email ? (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium truncate">{tutor.user.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-muted-foreground p-3">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">Email not provided</span>
                                </div>
                            )}

                            <Separator />

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Member since</p>
                                    <p className="font-medium">
                                        {format(new Date(tutor?.createdAt || ""), "MMM yyyy")}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Languages Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Languages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tutor?.languages && tutor.languages.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {tutor.languages.map((lang, index) => (
                                        <Badge key={index} variant="outline" className="px-3 py-1">
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">No languages specified</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Education Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tutor?.education ? (
                                <p className="text-sm leading-relaxed">{tutor.education}</p>
                            ) : (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">Education information not provided</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Stats Card */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Tutor Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 rounded-lg bg-background">
                                    <p className="text-2xl font-bold">{tutor?.experience || 0}</p>
                                    <p className="text-xs text-muted-foreground">Years Experience</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-background">
                                    <p className="text-2xl font-bold">{tutor?._count?.reviews || 0}</p>
                                    <p className="text-xs text-muted-foreground">Reviews</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-background">
                                    <p className="text-2xl font-bold">{tutor?._count?.bookings || 0}</p>
                                    <p className="text-xs text-muted-foreground">Bookings</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-background">
                                    <p className="text-2xl font-bold">{tutor?._count?.availability || 0}</p>
                                    <p className="text-xs text-muted-foreground">Availability Slots</p>
                                </div>
                            </div>
                            <Button className="w-full" size="lg">
                                <Calendar className="mr-2 h-5 w-5" />
                                View Full Schedule
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <BookOpen className="h-6 w-6" />
                                About {tutor?.user?.name?.split(" ")[0] || "the Tutor"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tutor?.bio ? (
                                <div className="prose prose-gray max-w-none">
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {tutor.bio}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-muted-foreground p-8">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>No biography available</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Expertise & Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Expertise & Categories</CardTitle>
                            <CardDescription>
                                Subjects and topics I specialize in teaching
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {tutor?.categories && tutor.categories.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {tutor.categories.map((cat: TutorCategoryRelation, index: number) => (
                                        <Card key={cat?.category?.id || index} className="border">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">
                                                    {cat?.category?.name || "Unnamed Category"}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {cat?.category?.description ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        {cat.category.description}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground italic">
                                                        No description provided
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-muted-foreground p-8">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>No teaching categories specified</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Availability */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Clock3 className="h-6 w-6" />
                                Availability
                            </CardTitle>
                            <CardDescription>
                                Regular weekly availability for sessions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {tutor?.availability && tutor.availability.length > 0 ? (
                                <div className="space-y-3">
                                    {tutor.availability.map((slot, index) => (
                                        <div
                                            key={slot.id || index}
                                            className="flex items-center justify-between p-3 rounded-lg border"
                                        >
                                            <div>
                                                <p className="font-medium">{slot.dayOfWeek}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {slot.startTime} - {slot.endTime}
                                                </p>
                                            </div>
                                            <Badge variant="outline">Available</Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-muted-foreground p-8">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>No availability schedule set</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Reviews Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center justify-between">
                                <span>Student Reviews</span>
                                <Badge variant="secondary">
                                    {tutor?.totalReviews || 0} reviews
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tutor?.reviews && tutor.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {tutor.reviews.slice(0, 3).map((review) => (
                                        <div key={review.id} className="space-y-3 border-b pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback>
                                                            {getInitials(review.student.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{review.student.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {format(new Date(), "MMM d, yyyy")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={cn(
                                                                "h-4 w-4",
                                                                star <= review.rating
                                                                    ? "fill-yellow-500 text-yellow-500"
                                                                    : "text-muted"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{review.comment}</p>
                                        </div>
                                    ))}
                                    {tutor.totalReviews > 3 && (
                                        <div className="pt-4">
                                            <Button variant="outline" className="w-full">
                                                View all {tutor.totalReviews} reviews
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-2">No reviews yet</p>
                                    <p className="text-sm text-muted-foreground">
                                        Be the first to review this tutor
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )

}