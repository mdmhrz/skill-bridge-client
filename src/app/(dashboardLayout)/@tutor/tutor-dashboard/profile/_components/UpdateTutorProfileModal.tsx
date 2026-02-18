'use client'

import { updateTutorProfile } from '@/actions/tutor.action'
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
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Edit3, Loader2 } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type CategoryOption = {
    id: number
    name: string
    icon?: string
}

type TutorProfileForUpdate = {
    bio?: string
    title?: string
    experience?: number
    hourlyRate?: string | number
    languages?: string[]
    education?: string
    categories?: Array<{ category?: { id: number } }>
    user?: {
        name?: string
        phone?: string | null
        image?: string | null
    }
}

type Props = {
    tutor: TutorProfileForUpdate
    categories: CategoryOption[]
}

export default function UpdateTutorProfileModal({ tutor, categories }: Props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialCategoryIds = useMemo(
        () => tutor.categories?.map((item) => item.category?.id).filter((id): id is number => Boolean(id)) ?? [],
        [tutor.categories]
    )

    const [formData, setFormData] = useState({
        name: tutor.user?.name ?? '',
        phone: tutor.user?.phone ?? '',
        image: tutor.user?.image ?? '',
        title: tutor.title ?? '',
        bio: tutor.bio ?? '',
        experience: typeof tutor.experience === 'number' ? tutor.experience : 0,
        hourlyRate: Number(tutor.hourlyRate ?? 0),
        education: tutor.education ?? '',
        languagesText: (tutor.languages ?? []).join(', '),
        categories: initialCategoryIds,
    })

    const resetForm = () => {
        setFormData({
            name: tutor.user?.name ?? '',
            phone: tutor.user?.phone ?? '',
            image: tutor.user?.image ?? '',
            title: tutor.title ?? '',
            bio: tutor.bio ?? '',
            experience: typeof tutor.experience === 'number' ? tutor.experience : 0,
            hourlyRate: Number(tutor.hourlyRate ?? 0),
            education: tutor.education ?? '',
            languagesText: (tutor.languages ?? []).join(', '),
            categories: initialCategoryIds,
        })
    }

    const toggleCategory = (categoryId: number) => {
        setFormData((prev) => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId],
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const parsedLanguages = formData.languagesText
            .split(',')
            .map((lang) => lang.trim())
            .filter(Boolean)

        if (formData.experience < 0) {
            toast.error('Experience must be a positive number')
            return
        }

        if (formData.hourlyRate <= 0) {
            toast.error('Hourly rate must be greater than zero')
            return
        }

        if (parsedLanguages.length === 0) {
            toast.error('Please provide at least one language')
            return
        }

        if (!formData.name.trim()) {
            toast.error('Name is required')
            return
        }

        setIsSubmitting(true)

        try {
            const toastId = toast.loading('Updating profile...')

            const res = await updateTutorProfile({
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                image: formData.image.trim(),
                title: formData.title.trim(),
                bio: formData.bio.trim(),
                experience: formData.experience,
                hourlyRate: formData.hourlyRate,
                education: formData.education.trim(),
                languages: parsedLanguages,
                categories: formData.categories,
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
                <Button className='gap-2'>
                    <Edit3 className='h-4 w-4' />
                    Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Update Tutor Profile</DialogTitle>
                    <DialogDescription>
                        Update your public profile and teaching information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <ScrollArea className='h-[60vh] pr-4'>
                        <div className='space-y-4'>
                            <div className='grid gap-4 md:grid-cols-2'>
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
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='image'>Image URL</Label>
                                <Input
                                    id='image'
                                    value={formData.image}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                                />
                            </div>

                            <div className='grid gap-4 md:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='title'>Title</Label>
                                    <Input
                                        id='title'
                                        value={formData.title}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='education'>Education</Label>
                                    <Input
                                        id='education'
                                        value={formData.education}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='bio'>Bio</Label>
                                <Textarea
                                    id='bio'
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                                />
                            </div>

                            <div className='grid gap-4 md:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='experience'>Experience (years)</Label>
                                    <Input
                                        id='experience'
                                        type='number'
                                        min='0'
                                        value={formData.experience}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, experience: Number(e.target.value) }))
                                        }
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='hourlyRate'>Hourly Rate</Label>
                                    <Input
                                        id='hourlyRate'
                                        type='number'
                                        min='1'
                                        value={formData.hourlyRate}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, hourlyRate: Number(e.target.value) }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='languages'>Languages (comma separated)</Label>
                                <Input
                                    id='languages'
                                    value={formData.languagesText}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, languagesText: e.target.value }))
                                    }
                                    placeholder='English, Bangla'
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label>Categories</Label>
                                <div className='grid gap-2 sm:grid-cols-2'>
                                    {categories.map((category) => {
                                        const selected = formData.categories.includes(category.id)

                                        return (
                                            <button
                                                key={category.id}
                                                type='button'
                                                className={`rounded-md border p-2 text-left text-sm transition ${selected
                                                        ? 'border-primary bg-primary/10 text-foreground'
                                                        : 'border-border hover:bg-muted/60'
                                                    }`}
                                                onClick={() => toggleCategory(category.id)}
                                            >
                                                <span className='mr-1'>{category.icon || ''}</span>
                                                {category.name}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

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
                                'Update Profile'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
