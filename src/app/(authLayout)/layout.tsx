import PrimaryButton from '@/components/ButtonPrimary';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen '>
            <div className='min-h-screen hidden md:block'>
                <Image src="/login.jpg" priority alt="auth" width={500} height={500} className='object-cover w-full h-full ' />
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