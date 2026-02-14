'use client'

import { getCategories } from '@/actions/category.action';
import { createTutor } from '@/actions/tutor.action';
import PrimaryButton from '@/components/ButtonPrimary';
import Loader from '@/components/global/Loader';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/authClient';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    experience: z.number().min(0, 'Experience must be 0 or greater'),
    hourlyRate: z.number().min(0.01, 'Hourly rate must be greater than 0'),
    languages: z.array(z.string()).min(1, 'At least one language is required'),
    education: z.string().min(3, 'Education is required'),
    categories: z.array(z.number()).min(1, 'At least one category is required'),
});

type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

const BecomeATutor = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            bio: '',
            title: '',
            experience: 0,
            hourlyRate: 0,
            languages: [] as string[],
            education: '',
            categories: [] as number[],
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            setLoading(true);

            try {
                const toastId = toast.loading('Applying for becoming tutor');
                const res = await createTutor(value)

                if (!res || res.error) {
                    toast.error(res?.error?.message || 'Tutor profile creation failed', { id: toastId });
                    return;
                }

                if (!res.data) {
                    toast.error('No response received from server', { id: toastId });
                    return;
                }

                toast.success('Tutor Profile created successfully, Please login again', { id: toastId });
                handleClose();

                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/login")
                        },
                        onError: () => {
                            toast.error('Logout error')
                        },
                    },
                })
            } catch (error) {
                toast.error('Failed to create tutor profile');
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
    });

    const loadCategories = async () => {
        setLoading(true);

        try {
            const toastId = toast.loading('Getting Categories');
            const res = await getCategories();

            if (!res || res.error) {
                toast.error(res?.error?.message || 'Available categories retrieve failed', { id: toastId });
                return;
            }

            if (!res.data) {
                toast.error('No response received from server', { id: toastId });
                return;
            }

            setCategories(res.data);
            toast.success('Categories retrieved successfully', { id: toastId });
        } catch (error) {
            toast.error('Failed to retrieve categories');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && categories.length === 0) {
            loadCategories();
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        form.reset();
    };

    if (!open) {
        return (
            <PrimaryButton className='cursor-pointer text-white' onClick={() => setOpen(true)}>
                Become a Tutor
            </PrimaryButton>
        );
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div className='max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-background p-6 rounded-xl shadow-lg mx-4'>
                <h2 className='text-2xl font-bold mb-6'>Become a Tutor</h2>

                <form
                    id='tutor-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup className='gap-4'>
                        {/* Title Field */}
                        <form.Field name='title' children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Title *</FieldLabel>
                                    <Input
                                        aria-invalid={isInvalid}
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='e.g., Web Development Tutor'
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }} />

                        {/* Bio Field */}
                        <form.Field name='bio' children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Bio *</FieldLabel>
                                    <Textarea
                                        aria-invalid={isInvalid}
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Tell us about yourself and your teaching experience'
                                        rows={4}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }} />

                        {/* Experience & Hourly Rate */}
                        <div className='grid grid-cols-2 gap-4'>
                            <form.Field name='experience' children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Experience (years) *</FieldLabel>
                                        <Input
                                            aria-invalid={isInvalid}
                                            id={field.name}
                                            name={field.name}
                                            type='number'
                                            min='0'
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }} />

                            <form.Field name='hourlyRate' children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Hourly Rate ($) *</FieldLabel>
                                        <Input
                                            aria-invalid={isInvalid}
                                            id={field.name}
                                            name={field.name}
                                            type='number'
                                            step='0.01'
                                            min='0.01'
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }} />
                        </div>

                        {/* Education Field */}
                        <form.Field name='education' children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Education *</FieldLabel>
                                    <Input
                                        aria-invalid={isInvalid}
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='e.g., B.Sc. in Computer Science, North South University'
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }} />

                        {/* Languages Field */}
                        <form.Field name='languages' children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Languages (comma-separated) *</FieldLabel>
                                    <Input
                                        aria-invalid={isInvalid}
                                        id={field.name}
                                        name={field.name}
                                        defaultValue={field.state.value.join(', ')}
                                        onBlur={(e) => {
                                            const langs = e.target.value
                                                .split(',')
                                                .map(lang => lang.trim())
                                                .filter(Boolean);
                                            field.handleChange(langs);
                                        }}
                                        placeholder='e.g., English, Bengali'
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }} />

                        {/* Categories Field */}
                        <form.Field name='categories' children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Categories *</FieldLabel>
                                    <Select
                                        value={field.state.value[0]?.toString() || ''}
                                        onValueChange={(value) => field.handleChange([Number(value)])}
                                        disabled={loading}
                                    >
                                        <SelectTrigger id={field.name}>
                                            <SelectValue placeholder='Select a category' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.icon} {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }} />
                    </FieldGroup>

                    <div className='flex gap-3 pt-6'>
                        <Button
                            disabled={loading}
                            type='button' variant='outline' onClick={handleClose} className='flex-1'>
                            Cancel
                        </Button>
                        <Button disabled={loading} form='tutor-form' type='submit' className='flex-1'>
                            {loading ? <Loader text='Submitting...'></Loader> : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeATutor;