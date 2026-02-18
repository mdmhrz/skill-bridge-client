'use client'

import { updateStudentProfile } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit3, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

type StudentProfileInfo = {
    name: string
    phone: string | null
    image: string | null
}

type Props = {
    user: StudentProfileInfo
}

export default function UpdateStudentProfileModal({ user }: Props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone ?? '',
        image: user.image ?? '',
    })

    const resetForm = () => {
        setFormData({
            name: user.name,
            phone: user.phone ?? '',
            image: user.image ?? '',
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const name = formData.name.trim()
        const phone = formData.phone.trim()
        const image = formData.image.trim()

        if (!name) {
            toast.error('Name is required')
            return
        }

        setIsSubmitting(true)

        try {
            const toastId = toast.loading('Updating profile...')

            const res = await updateStudentProfile({
                name,
                phone,
                image,
            })

            if (!res || res.error) {
                toast.error(res?.error?.message || 'Failed to update profile', { id: toastId })
                return
            }

            toast.success('Profile updated successfully', { id: toastId })
            setOpen(false)
            router.refresh()
        } catch (error) {
            toast.error('Failed to update profile')
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) {
                    resetForm()
                }
            }}
        >
            <DialogTrigger asChild>
                <Button className='w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-base shadow-lg hover:shadow-xl transition-all duration-200'>
                    <Edit3 className='mr-2 h-4 w-4' />
                    Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        Change your name, phone number, and profile image URL.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input
                            id='phone'
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder='e.g. +8801XXXXXXXXX'
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='image'>Image URL</Label>
                        <Input
                            id='image'
                            value={formData.image}
                            onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                            placeholder='https://...'
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            disabled={isSubmitting}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
