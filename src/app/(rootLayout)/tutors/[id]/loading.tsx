import { PageLoading } from '@/components/global/LoadingAnimation';
import React from 'react';

const loading = () => {
    return (
        <div>
            <PageLoading
                title="Loading Tutor Profile"
                description="Fetching detailed information and reviews"
                showProgress
            />
        </div>
    );
};

export default loading;