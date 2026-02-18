// app/student/profile/page.tsx
import { userService } from '@/services/user.service'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { CalendarDays, Mail, Phone, Shield, User, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { getInitials } from '@/lib/utils/geInitials'
import UpdateStudentProfileModal from './_components/UpdateStudentProfileModal'

export default async function StudentProfilePage() {
    // Fetch session
    const { data: session, error: sessionError } = await userService.getSession()

    if (!session || sessionError) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">Unauthorized or session not found</p>
                </div>
            </div>
        )
    }

    const userId = session.user?.id
    if (!userId) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">User ID not found</p>
                </div>
            </div>
        )
    }

    // Fetch user details
    const { userData: user, error } = await userService.getUserDetailsById(userId)

    if (error || !user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <XCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">{error?.message || 'Failed to load profile'}</p>
                </div>
            </div>
        )
    }

    const initials = getInitials(user.name)

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {/* Header with subtle pattern */}
            <div className="relative border-b border-border/40 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-xl">
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-2xl font-semibold text-primary">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{user.name}</h1>
                                <div className="flex gap-2">
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${user.status === 'ACTIVE'
                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                            } capitalize
                                        `}
                                    >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        {user.status.toLowerCase()}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 capitalize"
                                    >
                                        <Shield className="h-3 w-3 mr-1" />
                                        {user.role.toLowerCase()}
                                    </Badge>
                                    {user.isBanned && (
                                        <Badge variant="destructive" className="animate-pulse">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Banned
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                                {user.phone && (
                                    <>
                                        <span className="hidden sm:inline">•</span>
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="h-4 w-4" />
                                            <span>{user.phone}</span>
                                        </div>
                                    </>
                                )}
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column - Profile Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email Status</p>
                                        <p className="text-lg font-semibold">{user.emailVerified ? 'Verified' : 'Unverified'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                        <p className="text-lg font-semibold">{new Date(user.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Account Age</p>
                                        <p className="text-lg font-semibold">
                                            {Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Banned information if applicable */}
                        {user.isBanned && user.bannedReason && (
                            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-destructive/10 text-destructive shrink-0">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="font-semibold text-destructive">Account Restricted</h3>
                                        <p className="text-sm text-muted-foreground">{user.bannedReason}</p>
                                        <p className="text-xs text-muted-foreground/70 mt-1">
                                            If you believe this is a mistake, please contact support.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent activity placeholder */}
                        <div className="bg-card rounded-xl p-6 border border-border/50">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-muted-foreground">Account created</span>
                                    <span className="text-xs text-muted-foreground/70 ml-auto">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {user.emailVerified && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-muted-foreground">Email verified</span>
                                        <span className="text-xs text-muted-foreground/70 ml-auto">
                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column - Account Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Account Details
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Email</span>
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        {user.email}
                                        {user.emailVerified ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <XCircle className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Phone</span>
                                    <span className="text-sm font-medium">
                                        {user.phone || 'Not provided'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Account Status</span>
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${user.status === 'ACTIVE'
                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            } capitalize
                                        `}
                                    >
                                        {user.status.toLowerCase()}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Role</span>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-500/10 text-blue-600 dark:text-blue-400 capitalize"
                                    >
                                        {user.role.toLowerCase()}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-muted-foreground">Member Since</span>
                                    <span className="text-sm font-medium">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-3">
                                <UpdateStudentProfileModal
                                    user={{
                                        name: user.name,
                                        phone: user.phone,
                                        image: user.image,
                                    }}
                                />
                                <Button variant="outline" className="w-full">
                                    Security Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}