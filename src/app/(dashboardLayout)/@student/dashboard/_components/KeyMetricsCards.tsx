'use client'

import { BookOpen, CalendarClock, Clock, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StudentBooking, Review } from '@/types'
import { formatTime, formatDate } from '@/utils/dateUtils'

interface KeyMetricsCardsProps {
    totalBookings: number
    confirmedBookings: number
    upcomingBookings: StudentBooking[]
    totalHours: number
    bookings: StudentBooking[]
    reviews: Review[]
    averageRating: number
}

export function KeyMetricsCards({
    totalBookings,
    confirmedBookings,
    upcomingBookings,
    totalHours,
    bookings,
    reviews,
    averageRating
}: KeyMetricsCardsProps) {

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Bookings */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                        <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{totalBookings}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {confirmedBookings} confirmed
                    </p>
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{confirmedBookings}/{totalBookings}</span>
                        </div>
                        <Progress value={(confirmedBookings / totalBookings) * 100} className="h-1.5" />
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                    <div className="p-2.5 bg-blue-500/10 rounded-xl">
                        <CalendarClock className="h-5 w-5 text-blue-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{upcomingBookings.length}</div>
                    {upcomingBookings.length > 0 ? (
                        <>
                            <p className="text-xs text-muted-foreground mt-1">
                                Next: {formatDate(new Date(upcomingBookings[0].scheduledDate))}
                            </p>
                            <div className="flex items-center gap-1.5 mt-3 text-xs text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2 py-1.5 rounded-md w-fit">
                                <Clock className="h-3 w-3" />
                                <span>{formatTime(new Date(upcomingBookings[0].scheduledDate))}</span>
                            </div>
                        </>
                    ) : (
                        <p className="text-xs text-muted-foreground mt-1">No upcoming sessions</p>
                    )}
                </CardContent>
            </Card>

            {/* Total Learning Hours */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                    <div className="p-2.5 bg-orange-500/10 rounded-xl">
                        <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{totalHours.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total hours booked
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" style={{ width: `${Math.min((totalHours / 100) * 100, 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium text-orange-600">{bookings.length} sessions</span>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews & Rating */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Reviews</CardTitle>
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{reviews.length > 0 ? averageRating.toFixed(1) : '0.0'}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} given
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
    )
}
