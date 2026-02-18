'use server'

import { userService, UpdateStudentProfilePayload } from '@/services/user.service'

export const updateStudentProfile = async (payload: UpdateStudentProfilePayload) => {
    const res = await userService.updateStudentProfile(payload)
    return res
}
