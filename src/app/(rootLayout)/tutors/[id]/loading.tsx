import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TutorDetailsSkeleton() {
    return (
        <div className="container mx-auto px-6 py-8 max-w-7xl">
            {/* Hero Section Skeleton */}
            <div className="bg-gradient-to-br from-background via-background to-muted/30 border rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Avatar Skeleton */}
                    <div className="flex-shrink-0">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <Skeleton className="h-4 w-24 mt-4 mx-auto lg:mx-0" />
                    </div>

                    {/* Main Info Skeleton */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <Skeleton className="h-9 w-48" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                            <Skeleton className="h-6 w-64 mt-2" />

                            {/* Rating and Experience Skeleton */}
                            <div className="flex items-center gap-4 mt-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Skeleton key={i} className="h-5 w-5 rounded-full" />
                                        ))}
                                    </div>
                                    <Skeleton className="h-5 w-20" />
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                <Skeleton className="h-5 w-32" />

                                <Separator orientation="vertical" className="h-6" />

                                <Skeleton className="h-5 w-24" />
                            </div>
                        </div>

                        {/* Categories Skeleton */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-8 w-20 rounded-full" />
                            ))}
                        </div>

                        {/* CTA Buttons Skeleton */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Skeleton className="h-10 w-40 flex-1 min-w-[200px]" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar Skeleton */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Separator />
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-24" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {[1, 2].map((i) => (
                                    <Skeleton key={i} className="h-8 w-16" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-28" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-20" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                            <Skeleton className="h-10 w-full mt-4" />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Content Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-40" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {[1, 2].map((i) => (
                                    <Skeleton key={i} className="h-32 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-36" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <Skeleton className="h-7 w-32" />
                            <Skeleton className="h-6 w-16" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[1, 2].map((i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                                <div>
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-3 w-16 mt-1" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Skeleton key={star} className="h-4 w-4" />
                                                ))}
                                            </div>
                                        </div>
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}