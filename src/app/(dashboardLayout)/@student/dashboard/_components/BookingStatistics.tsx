'use client'

import { BarChart3, CheckCircle2, Clock, XCircle, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface BookingStatisticsProps {
    confirmedBookings: number
    completedBookings: number
    cancelledBookings: number
    totalSpent: number
    averageBookingPrice: number
}

export function BookingStatistics({
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalSpent,
    averageBookingPrice
}: BookingStatisticsProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Booking Statistics
                        </CardTitle>
                        <CardDescription className="mt-1">Overview of your tutoring sessions</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Status Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-900">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <p className="text-xs font-medium text-green-900 dark:text-green-100">Confirmed</p>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">{confirmedBookings}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Completed</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{completedBookings}</p>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-900">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <p className="text-xs font-medium text-red-900 dark:text-red-100">Cancelled</p>
                        </div>
                        <p className="text-2xl font-bold text-red-700 dark:text-red-300">{cancelledBookings}</p>
                    </div>
                </div>

                {/* Financial Overview */}
                <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            Financial Summary
                        </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                            <p className="text-2xl font-bold">৳{totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Avg per Session</p>
                            <p className="text-2xl font-bold">৳{averageBookingPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
