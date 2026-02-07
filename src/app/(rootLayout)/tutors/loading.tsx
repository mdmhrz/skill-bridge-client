import { CardSkeletonLoader } from '@/components/global/LoadingAnimation';
import { MultiColumnSkeleton } from '@/components/global/SkeletonLoader';
import React from 'react';

const TutorProfilesLoading = () => {
    return (
        <div>
            {/* <CardSkeletonLoader count={3} variant="detailed" />  */}

            <MultiColumnSkeleton
                leftColumnWidth="4"  // 4/12 width (33%)
                rightRows={5}
            /> *
        </div>
    );
};

export default TutorProfilesLoading;