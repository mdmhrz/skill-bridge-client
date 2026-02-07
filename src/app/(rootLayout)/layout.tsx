import Header from '@/components/layout/Header';
import { userService } from '@/services/user.service';
import React from 'react';

export const dynamic = 'force-dynamic';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await userService.getSession();
    console.log(user,"user from layout");

    return (
        <div>
            <div className='min-h-[84px]'>
                <Header user={user?.data?.user}></Header>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default RootLayout;