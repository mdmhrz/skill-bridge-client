'use client'

import { MessageSquare, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Review } from '@/types'
import { getRelativeTime } from '@/utils/dateUtils'

interface UserReviewsProps {
    reviews: Review[]
}

export function UserReviews({ reviews }: UserReviewsProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-yellow-500" />
                    Your Reviews
                </CardTitle>
                <CardDescription>Feedback you've given to tutors</CardDescription>
            </CardHeader>
            <CardContent>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review: Review) => {
                            const reviewDate = new Date(review.createdAt);

                            return (
                                <div key={review.id} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted fill-muted'}`}
                                                />
                                            ))}
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {review.rating}/5
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-foreground/90 mb-2 italic">"{review.comment}"</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            {getRelativeTime(reviewDate)}
                                        </p>
                                        {review.isVisible && (
                                            <Badge variant="secondary" className="text-xs">
                                                Visible
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="inline-flex p-3 bg-muted rounded-full mb-3">
                            <MessageSquare className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">No reviews yet</p>
                        <p className="text-xs text-muted-foreground mt-1">Complete a session to leave your first review</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
