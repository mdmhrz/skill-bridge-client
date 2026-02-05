import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    Shield
} from "lucide-react"
import { Tutor, TutorCategoryRelation } from "@/types"
import tutorServices from "@/services/tutor.service"

export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id, 'tutorId')

    const response = await tutorServices.getTutorById(id);

    if (!response?.data) {
        notFound();
    }

    const data = response.data;
    console.log(data, 'data')

    // Helper function to get initials
    const getInitials = (name?: string) => {
        if (!name) return "TU";
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="container mx-auto px-6 bg-linear-to-b from-background to-muted/20 ">
            {/* Hero Section */}
            <div className=" bg-primary/5 border-b rounded-md">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar Section */}
                        <div className="flex-shrink-0">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                <AvatarImage src={data?.user?.image} alt={data?.user?.name} />
                                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                                    {getInitials(data?.user?.name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Title and Basic Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                                    {data?.user?.name || "Tutor Name"}
                                </h1>
                                <p className="text-xl text-muted-foreground font-medium">
                                    {data?.title || "Professional Tutor"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {data?.user?.email}
                                </p>
                            </div>

                            {/* Rating and Stats */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 ${star <= (Number(data?.rating) || 0)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-lg">
                                        {Number(data?.rating)?.toFixed(1) || "0.0"}
                                    </span>
                                    <span className="text-muted-foreground">
                                        ({data?.totalReviews || 0} reviews)
                                    </span>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-5 h-5" />
                                    <span>
                                        {data?.experience || 0} {data?.experience === 1 ? "year" : "years"} experience
                                    </span>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    <span className="text-2xl font-bold text-green-600">
                                        ${data?.hourlyRate || 0}
                                    </span>
                                    <span className="text-muted-foreground">/ hour</span>
                                </div>

                                {data?.isVerified && (
                                    <>
                                        <Separator orientation="vertical" className="h-6" />
                                        <div className="flex items-center gap-2 text-primary">
                                            <Shield className="w-5 h-5" />
                                            <span className="font-medium">Verified</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Categories */}
                            {data?.categories && data.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.categories.map((cat: TutorCategoryRelation, index: number) => (
                                        <Badge key={cat?.category?.id || index} variant="secondary" className="text-sm px-3 py-1">
                                            {cat?.category?.name || "Category"}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Button size="lg" className="text-lg px-8">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book a Session
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className=" py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Quick Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Languages Card */}
                        {data?.languages && data.languages.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Languages className="w-5 h-5" />
                                        Languages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {data.languages.map((lang, index) => (
                                            <Badge key={index} variant="outline">
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Education Card */}
                        {data?.education && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <GraduationCap className="w-5 h-5" />
                                        Education
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed">{data.education}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Availability Card */}
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Calendar className="w-5 h-5" />
                                    Quick Book
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Available for sessions
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        ${data?.hourlyRate || 0}/hr
                                    </p>
                                </div>
                                <Button className="w-full" size="lg">
                                    Book Now
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Profile Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Profile Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Member since:</span>
                                    <span className="font-medium">
                                        {new Date(data?.createdAt || "").toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Last updated:</span>
                                    <span className="font-medium">
                                        {new Date(data?.updatedAt || "").toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Verification:</span>
                                    <Badge variant={data?.isVerified ? "default" : "secondary"} className="text-xs">
                                        {data?.isVerified ? "Verified" : "Not Verified"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content - About and Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <BookOpen className="w-6 h-6" />
                                    About {data?.user?.name || "Me"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-base">
                                    {data?.bio || "No bio available."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Category Details */}
                        {data?.categories && data.categories.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Teaching Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {data.categories.map((cat: TutorCategoryRelation, index: number) => (
                                            <div
                                                key={cat?.category?.id || index}
                                                className="p-4 bg-muted/50 rounded-lg space-y-2"
                                            >
                                                <h3 className="font-semibold text-lg">
                                                    {cat?.category?.name}
                                                </h3>
                                                {cat?.category?.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {cat.category.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews Placeholder */}
                        {data?.totalReviews === 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center justify-between">
                                        <span>Student Reviews</span>
                                        <Badge variant="secondary">
                                            {data.totalReviews} reviews
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8 text-muted-foreground">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No reviews yet. Be the first to leave a review!</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}