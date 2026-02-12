'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createReview } from '@/actions/review.action'

interface ReviewProps {
    tutorId: string
}

const ReviewSection: React.FC<ReviewProps> = ({ tutorId }) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const MAX_RATING = 5

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Please provide a rating before submitting.')
            return
        }

        const payload = {
            rating,
            comment: reviewText,
            tutorProfileId: tutorId,
        }

        setIsSubmitting(true)
        const toastId = toast.loading('Creating Review...')

        try {
            const res = await createReview(payload)

            if (!res || res.error) {
                toast.error(res?.error?.message || "Review failed", { id: toastId })
                return
            }

            if (!res.data) {
                toast.error("No data received from server", { id: toastId })
                return
            }

            toast.success("Your review has been submitted successfully!", { id: toastId })

            // Reset form
            setRating(0)
            setHoverRating(0)
            setReviewText('')
        } catch (error) {
            toast.error('Failed to submit review. Please try again.', { id: toastId })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full space-y-6 p-6 border rounded-2xl bg-background shadow-sm">
            <h2 className="text-xl font-semibold">Write a Review</h2>

            {/* Rating */}
            <div className="flex flex-col">
                <Label className="mb-2">Rating</Label>
                <div className="flex items-center space-x-1">
                    {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((star) => (
                        <Star
                            key={star}
                            className={cn(
                                'w-6 h-6 cursor-pointer transition-colors',
                                (hoverRating || rating) >= star
                                    ? 'text-yellow-500'
                                    : 'text-muted-foreground'
                            )}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
            </div>

            {/* Review Text */}
            <div className="flex flex-col">
                <Label className="mb-2">Review</Label>
                <Textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="resize-none"
                />
            </div>

            <Button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitting}
                className="w-[300px]"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </div>
    )
}

export default ReviewSection
