'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { createReview } from '@/actions/review.action'

interface ReviewProps {
    // Pass props like bookingId, tutorId, or userId for API
    tutorId: string,
    categoryId: string
}

const ReviewModal: React.FC<ReviewProps> = ({ tutorId, categoryId }) => {
    // console.log(tutorId, categoryId)

    const [open, setOpen] = useState(false)
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
            categoryId
        }
    

        setIsSubmitting(true)
        const toastId = toast.loading('Creating Review...')
        try {


            const res = await createReview(payload)

            if (!res || res.error) {
                toast.error(res?.error?.message || "Revierw failed", { id: toastId })
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
            setOpen(false)
        } catch (error) {
            toast.error('Failed to submit review. Please try again.', { id: toastId })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full max-w-xs">
                    Write a Review
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg w-full p-6">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        Write a Review
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Rating */}
                    <div className="flex flex-col">
                        <Label className="mb-1">Rating</Label>
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        'w-6 h-6 cursor-pointer transition-colors',
                                        (hoverRating || rating) >= star ? 'text-yellow-500' : 'text-muted-foreground'
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
                        <Label className="mb-1">Review</Label>
                        <Textarea
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button
                        onClick={handleSubmit}
                        disabled={rating === 0 || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewModal
