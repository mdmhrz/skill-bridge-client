import PrimaryButton from '@/components/ButtonPrimary';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen '>
            <div className='relative min-h-screen hidden md:block overflow-hidden bg-muted/50'>
                <div className='absolute left-1/2 z-20 top-8 w-full max-w-lg -translate-x-1/2 px-6 text-center'>
                    <p className='inline-block bg-accent rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm'>
                        Online Education Platform
                    </p>
                    <h2 className='mt-4 text-5xl font-extrabold leading-tight text-foreground/85'>
                        Learn smarter with Skill Bridge.
                    </h2>
                    <p className='mt-3 text-sm leading-6 text-muted-foreground/60'>
                        Connect with expert tutors, build real skills, and level up your future from anywhere.
                    </p>
                </div>
                <Image src="/auth-side.svg" priority alt="auth" width={500} height={500} className='object-contain object-left-bottom w-full h-full z-10 relative -bottom-4' />
            </div>

            <div className='flex flex-col gap-4 px-6 py-8'>
                {/* Header */}
                <div
                    className="flex items-center justify-between space-x-2"

                >
                    <Link
                        prefetch={false}
                        href="/"
                        className="flex items-center space-x-2"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-700">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-xl font-bold text-transparent">
                            Skill Bridge
                        </span>
                    </Link>

                    <PrimaryButton className='text-white'><Link href={"/"}>Back To Home</Link></PrimaryButton>
                </div>
                <div className='flex-1  flex items-center justify-center '>

                    {children}
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;