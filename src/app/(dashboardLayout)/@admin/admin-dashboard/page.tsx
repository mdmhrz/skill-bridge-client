import React from 'react'
import {
    AlertCircle,
    BadgeCheck,
    BookOpen,
    CalendarClock,
    CalendarRange,
    CircleSlash,
    DollarSign,
    GraduationCap,
    LayoutGrid,
    Star,
    Users,
    UserCheck,
} from 'lucide-react'
import { userService } from '@/services/user.service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminDashboardCharts from './_components/AdminDashboardCharts'

export const dynamic = 'force-dynamic'

type StatCard = {
    title: string
    value: string | number
    description: string
    icon: React.ReactNode
    accent: string
}

const AdminDashboard = async () => {
    const { data, error } = await userService.getAdminDashboardStats()

    if (error || !data) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center p-6'>
                <Card className='w-full max-w-lg border-destructive/30'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 text-destructive'>
                            <AlertCircle className='h-5 w-5' />
                            Failed to load admin dashboard
                        </CardTitle>
                        <CardDescription>
                            {error?.message || 'Unable to fetch dashboard statistics right now.'}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const { overview, charts } = data

    const primaryCards: StatCard[] = [
        {
            title: 'Total Users',
            value: overview.totalUsers,
            description: `${overview.activeUsers} active / ${overview.inactiveUsers} inactive`,
            icon: <Users className='h-5 w-5' />,
            accent: 'from-cyan-500/15 via-cyan-500/5 to-transparent border-cyan-500/20',
        },
        {
            title: 'Total Tutors',
            value: overview.totalTutors,
            description: `${overview.verifiedTutors} verified tutor profiles`,
            icon: <GraduationCap className='h-5 w-5' />,
            accent: 'from-violet-500/15 via-violet-500/5 to-transparent border-violet-500/20',
        },
        {
            title: 'Total Bookings',
            value: overview.totalBookings,
            description: `${overview.ongoingBookings} ongoing sessions`,
            icon: <CalendarRange className='h-5 w-5' />,
            accent: 'from-blue-500/15 via-blue-500/5 to-transparent border-blue-500/20',
        },
        {
            title: 'Total Reviews',
            value: overview.totalReviews,
            description: `${overview.visibleReviews} visible / ${overview.hiddenReviews} hidden`,
            icon: <BookOpen className='h-5 w-5' />,
            accent: 'from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20',
        },
    ]

    const secondaryCards: StatCard[] = [
        {
            title: 'Completed Revenue',
            value: `৳${overview.completedRevenue.toLocaleString()}`,
            description: 'Revenue from completed bookings',
            icon: <DollarSign className='h-5 w-5' />,
            accent: 'from-lime-500/15 via-lime-500/5 to-transparent border-lime-500/20',
        },
        {
            title: 'Average Rating',
            value: overview.averageRating.toFixed(2),
            description: 'Average student rating across reviews',
            icon: <Star className='h-5 w-5' />,
            accent: 'from-yellow-500/15 via-yellow-500/5 to-transparent border-yellow-500/20',
        },
        {
            title: 'Upcoming Bookings',
            value: overview.upcomingBookings,
            description: `${overview.pastBookings} past bookings on record`,
            icon: <CalendarClock className='h-5 w-5' />,
            accent: 'from-indigo-500/15 via-indigo-500/5 to-transparent border-indigo-500/20',
        },
        {
            title: 'Availability Slots',
            value: overview.totalAvailabilitySlots,
            description: `${overview.totalCategories} categories (${overview.activeCategories} active)`,
            icon: <LayoutGrid className='h-5 w-5' />,
            accent: 'from-pink-500/15 via-pink-500/5 to-transparent border-pink-500/20',
        },
    ]

    return (
        <div className='space-y-6 p-4 md:p-6 lg:p-8'>
            <section className='relative overflow-hidden rounded-2xl border bg-linear-to-br from-slate-50 via-white to-cyan-50 p-6 shadow-sm dark:from-slate-950/40 dark:via-background dark:to-cyan-950/30'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,116,144,0.2),transparent_55%)]' />
                <div className='relative flex flex-wrap items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Admin Dashboard</h1>
                        <p className='mt-1 text-sm text-muted-foreground md:text-base'>
                            Live operational view of users, tutors, bookings, reviews, and platform growth.
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        <Badge className='gap-1 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300'>
                            <UserCheck className='h-3.5 w-3.5' />
                            Students: {overview.totalStudents}
                        </Badge>
                        <Badge className='gap-1 bg-sky-500/10 text-sky-700 hover:bg-sky-500/15 dark:text-sky-300'>
                            <BadgeCheck className='h-3.5 w-3.5' />
                            Verified Tutors: {overview.verifiedTutors}
                        </Badge>
                        <Badge className='gap-1 bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 dark:text-rose-300'>
                            <CircleSlash className='h-3.5 w-3.5' />
                            Banned Users: {overview.bannedUsers}
                        </Badge>
                    </div>
                </div>
            </section>

            <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {primaryCards.map((item) => (
                    <Card
                        key={item.title}
                        className={`border bg-linear-to-br ${item.accent} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                    >
                        <CardHeader className='pb-2'>
                            <CardDescription className='text-xs uppercase tracking-wide'>{item.title}</CardDescription>
                            <CardTitle className='flex items-center justify-between text-2xl'>
                                {item.value}
                                <span className='text-muted-foreground'>{item.icon}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground'>{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <AdminDashboardCharts
                usersTrend={charts.usersTrend}
                bookingsTrend={charts.bookingsTrend}
                reviewsTrend={charts.reviewsTrend}
                bookingStatusBreakdown={charts.bookingStatusBreakdown}
                topCategoryBreakdown={charts.topCategoryBreakdown}
            />

            <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {secondaryCards.map((item) => (
                    <Card
                        key={item.title}
                        className={`border bg-linear-to-br ${item.accent} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                    >
                        <CardHeader className='pb-2'>
                            <CardDescription className='text-xs uppercase tracking-wide'>{item.title}</CardDescription>
                            <CardTitle className='flex items-center justify-between text-2xl'>
                                {item.value}
                                <span className='text-muted-foreground'>{item.icon}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground'>{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    )
}

export default AdminDashboard