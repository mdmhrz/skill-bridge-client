import Header from '@/components/layout/Header';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='min-h-[80px]'>
                <Header></Header>
            </div>
            {children}
        </div>
    );
};

export default RootLayout;