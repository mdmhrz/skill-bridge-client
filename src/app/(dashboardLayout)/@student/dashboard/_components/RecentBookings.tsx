'use client'

import { Activity, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StudentBooking } from '@/types'
import { formatDate, getRelativeTime } from '@/utils/dateUtils'

interface RecentBookingsProps {
    bookings: StudentBooking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Bookings
                </CardTitle>
                <CardDescription>Your latest booking activities</CardDescription>
            </CardHeader>
            <CardContent>
                {bookings.length > 0 ? (
                    <div className="space-y-3">
                        {bookings.slice(0, 4).map((booking: StudentBooking) => {
                            const bookingDate = new Date(booking.scheduledDate);
                            const createdDate = new Date(booking.createdAt);

                            return (
                                <div key={booking.id} className="flex gap-3 items-start p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className={`p-2 rounded-lg ${booking.status === 'CONFIRMED' ? 'bg-green-500/10' :
                                        booking.status === 'COMPLETED' ? 'bg-blue-500/10' :
                                            'bg-red-500/10'
                                        }`}>
                                        {booking.status === 'CONFIRMED' && <Calendar className="h-4 w-4 text-green-600" />}
                                        {booking.status === 'COMPLETED' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                                        {booking.status === 'CANCELLED' && <XCircle className="h-4 w-4 text-red-600" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-sm font-medium">Booking {booking.status.toLowerCase()}</p>
                                            <Badge variant={
                                                booking.status === 'CONFIRMED' ? 'default' :
                                                    booking.status === 'COMPLETED' ? 'secondary' :
                                                        'destructive'
                                            } className="text-xs">
                                                {booking.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDate(bookingDate)} • {booking.duration} min • ৳{booking.totalPrice}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Booked {getRelativeTime(createdDate)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                            <Activity className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">No bookings yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
