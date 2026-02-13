'use client'

import { Award, Calendar, CheckCircle2, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StudentUser } from '@/types'

interface AccountSummaryProps {
    user: StudentUser
    accountAge: number
}

export function AccountSummary({ user, accountAge }: AccountSummaryProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Account Summary
                </CardTitle>
                <CardDescription>Your membership details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                        <div className="p-2.5 bg-background rounded-lg shadow-sm">
                            <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Member Since</p>
                            <p className="text-sm font-bold">
                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                            <p className="text-xs text-muted-foreground">{accountAge} days</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl border border-green-500/20">
                        <div className="p-2.5 bg-background rounded-lg shadow-sm">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Email Status</p>
                            <Badge variant={user.emailVerified ? 'default' : 'secondary'} className="mt-1">
                                {user.emailVerified ? 'Verified' : 'Not Verified'}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl border border-blue-500/20">
                        <div className="p-2.5 bg-background rounded-lg shadow-sm">
                            <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Role</p>
                            <Badge variant="outline" className="mt-1 font-semibold">
                                {user.role}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-xl border border-purple-500/20">
                        <div className="p-2.5 bg-background rounded-lg shadow-sm">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <Badge variant={user.status === 'ACTIVE' ? 'default' : 'secondary'} className="mt-1">
                                {user.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
