'use client'

import { Calendar, CalendarClock, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StudentBooking } from '@/types'
import { formatTime } from '@/utils/dateUtils'

interface UpcomingSessionsProps {
    upcomingBookings: StudentBooking[]
}

export function UpcomingSessions({ upcomingBookings }: UpcomingSessionsProps) {

    return (
        <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            Next Sessions
                        </CardTitle>
                        <CardDescription className="mt-1">Your upcoming schedule</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {upcomingBookings.length > 0 ? (
                    <div className="space-y-3">
                        {upcomingBookings.slice(0, 5).map((booking: StudentBooking, index: number) => {
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
                                            <Badge variant="outline" className="text-xs">
                                                {booking.duration} min
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                ৳{booking.totalPrice}
                                            </Badge>
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
                        <p className="text-xs text-muted-foreground mt-1">Book a session to get started!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
