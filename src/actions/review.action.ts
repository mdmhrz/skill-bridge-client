'use server'

import { reviewService } from "@/services/review.service";
import { reviewPayload } from "@/types"
import {  updateTag } from "next/cache";

export const createReview = async (reviewData: reviewPayload) => {
    const res = await reviewService.createBooking(reviewData)
    updateTag(`tutor-${reviewData.tutorProfileId}`)
    return res;
}