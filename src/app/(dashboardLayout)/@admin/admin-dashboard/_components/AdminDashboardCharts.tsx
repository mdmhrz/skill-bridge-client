'use client'

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

type TrendPoint = {
    label: string
    value: number
}

type BookingStatusPoint = {
    status: string
    value: number
}

type CategoryPoint = {
    label: string
    value: number
}

type Props = {
    usersTrend: TrendPoint[]
    bookingsTrend: TrendPoint[]
    reviewsTrend: TrendPoint[]
    bookingStatusBreakdown: BookingStatusPoint[]
    topCategoryBreakdown: CategoryPoint[]
}

export default function AdminDashboardCharts({
    usersTrend,
    bookingsTrend,
    reviewsTrend,
    bookingStatusBreakdown,
    topCategoryBreakdown,
}: Props) {
    const trendLabels = usersTrend.map((item) => item.label)

    const lineData = {
        labels: trendLabels,
        datasets: [
            {
                label: 'New Users',
                data: usersTrend.map((item) => item.value),
                borderColor: 'rgb(14, 116, 144)',
                backgroundColor: 'rgba(14, 116, 144, 0.15)',
                fill: true,
                tension: 0.35,
            },
            {
                label: 'New Bookings',
                data: bookingsTrend.map((item) => item.value),
                borderColor: 'rgb(30, 64, 175)',
                backgroundColor: 'rgba(30, 64, 175, 0.12)',
                fill: true,
                tension: 0.35,
            },
            {
                label: 'New Reviews',
                data: reviewsTrend.map((item) => item.value),
                borderColor: 'rgb(79, 70, 229)',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.35,
            },
        ],
    }

    const statusData = {
        labels: bookingStatusBreakdown.map((item) => item.status),
        datasets: [
            {
                label: 'Bookings',
                data: bookingStatusBreakdown.map((item) => item.value),
                backgroundColor: [
                    'rgba(250, 204, 21, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                    'rgb(202, 138, 4)',
                    'rgb(37, 99, 235)',
                    'rgb(22, 163, 74)',
                    'rgb(220, 38, 38)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const categoryData = {
        labels: topCategoryBreakdown.map((item) => item.label),
        datasets: [
            {
                label: 'Tutors in Category',
                data: topCategoryBreakdown.map((item) => item.value),
                backgroundColor: 'rgba(8, 145, 178, 0.75)',
                borderRadius: 8,
            },
        ],
    }

    return (
        <div className='grid gap-6 xl:grid-cols-12'>
            <Card className='xl:col-span-8 border-0 bg-linear-to-br from-cyan-50 via-white to-blue-50 shadow-md dark:from-cyan-950/20 dark:via-background dark:to-blue-950/20'>
                <CardHeader>
                    <CardTitle>Platform Growth (Last 6 Months)</CardTitle>
                    <CardDescription>Users, bookings, and review growth trends.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Line
                        data={lineData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: { precision: 0 },
                                },
                            },
                        }}
                    />
                </CardContent>
            </Card>

            <Card className='xl:col-span-4 border-0 bg-linear-to-br from-amber-50 via-white to-rose-50 shadow-md dark:from-amber-950/20 dark:via-background dark:to-rose-950/20'>
                <CardHeader>
                    <CardTitle>Booking Status Split</CardTitle>
                    <CardDescription>Current distribution by booking state.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Doughnut
                        data={statusData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        }}
                    />
                </CardContent>
            </Card>

            <Card className='xl:col-span-12 border-0 bg-linear-to-br from-sky-50 via-white to-emerald-50 shadow-md dark:from-sky-950/20 dark:via-background dark:to-emerald-950/20'>
                <CardHeader>
                    <CardTitle>Top Categories by Tutor Coverage</CardTitle>
                    <CardDescription>Most served subjects based on tutor-category mapping.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Bar
                        data={categoryData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: { precision: 0 },
                                },
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
