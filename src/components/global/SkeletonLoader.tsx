// components/ui/skeleton-loader.tsx

export function SkeletonLoader({
    layout = "card",
    columns = 1,
    count = 1,
}: {
    layout?: "card" | "list" | "grid" | "sidebar" | "dashboard" | "profile" | "custom"
    columns?: number
    count?: number
}) {
    return (
        <div className={`grid grid-cols-${columns} gap-4 ${columns > 1 ? 'grid-cols-' + columns : ''}`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    {layout === "card" && <CardSkeleton />}
                    {layout === "list" && <ListSkeleton />}
                    {layout === "grid" && <GridSkeleton />}
                    {layout === "sidebar" && <SidebarSkeleton />}
                    {layout === "dashboard" && <DashboardSkeleton />}
                    {layout === "profile" && <ProfileSkeleton />}
                    {layout === "custom" && <CustomLayoutSkeleton />}
                </div>
            ))}
        </div>
    )
}

// Card Skeleton (1 column)
function CardSkeleton() {
    return (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-muted" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-11/12" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-7 bg-muted rounded w-16" />
                <div className="h-7 bg-muted rounded w-20" />
                <div className="h-7 bg-muted rounded w-14" />
            </div>
        </div>
    )
}

// List Skeleton
function ListSkeleton() {
    return (
        <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-card rounded border border-border">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                    <div className="h-8 bg-muted rounded w-20" />
                </div>
            ))}
        </div>
    )
}

// Grid Skeleton (for images/gallery)
function GridSkeleton() {
    return (
        <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded" />
            ))}
        </div>
    )
}

// Sidebar Skeleton
function SidebarSkeleton() {
    return (
        <div className="bg-card rounded-lg border border-border p-4 space-y-6">
            <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-1/2" />
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-2">
                        <div className="h-4 w-4 bg-muted rounded" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-1/2" />
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 bg-muted rounded" />
                ))}
            </div>
        </div>
    )
}

// Dashboard Skeleton
function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-card rounded-lg border border-border p-4">
                        <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                        <div className="h-8 bg-muted rounded w-3/4" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-card rounded-lg border border-border p-4 space-y-4">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    <div className="h-40 bg-muted rounded" />
                </div>
                <div className="bg-card rounded-lg border border-border p-4 space-y-4">
                    <div className="h-5 bg-muted rounded w-1/2" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="h-4 bg-muted rounded w-2/3" />
                                <div className="h-4 bg-muted rounded w-1/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile Skeleton
function ProfileSkeleton() {
    return (
        <div className="bg-card rounded-lg border border-border">
            {/* Header */}
            <div className="h-32 bg-muted rounded-t-lg" />

            <div className="p-6">
                {/* Profile Info */}
                <div className="flex items-start space-x-4 -mt-12 mb-6">
                    <div className="h-24 w-24 rounded-full border-4 border-card bg-muted" />
                    <div className="flex-1 space-y-3 pt-8">
                        <div className="h-6 bg-muted rounded w-1/3" />
                        <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                    <div className="h-10 bg-muted rounded w-32" />
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-muted rounded w-24" />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-6">
                        <div className="space-y-3">
                            <div className="h-5 bg-muted rounded w-1/4" />
                            <div className="h-32 bg-muted rounded" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-5 bg-muted rounded w-1/4" />
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-20 bg-muted rounded" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="h-5 bg-muted rounded w-1/2" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="h-4 bg-muted rounded w-2/3" />
                                        <div className="h-4 bg-muted rounded w-1/4" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-5 bg-muted rounded w-1/2" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-8 bg-muted rounded w-16" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Custom Layout Skeleton - Specifically for your requirement
function CustomLayoutSkeleton() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* First Column - Full Height */}
            <div className="col-span-4 bg-card rounded-lg border border-border p-6 space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-48 w-48 rounded-full bg-muted" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <div className="h-4 w-4 bg-muted rounded" />
                            <div className="h-4 bg-muted rounded w-2/3" />
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div className="space-y-4">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-8 bg-muted rounded w-20" />
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center p-3 bg-muted/20 rounded">
                            <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-1" />
                            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Column - 3 Rows */}
            <div className="col-span-8 space-y-6">
                {/* Row 1: About */}
                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-1/4" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 bg-muted rounded w-full" />
                        ))}
                        <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                </div>

                {/* Row 2: Experience & Education */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Experience */}
                    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                        <div className="h-6 bg-muted rounded w-1/2" />
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/3" />
                                    <div className="h-3 bg-muted rounded w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                        <div className="h-6 bg-muted rounded w-1/2" />
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 3: Reviews */}
                <div className="bg-card rounded-lg border border-border p-6 space-y-6">
                    <div className="h-6 bg-muted rounded w-1/4" />
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-3 p-4 border border-border rounded">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-muted" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded w-32" />
                                            <div className="h-3 bg-muted rounded w-24" />
                                        </div>
                                    </div>
                                    <div className="h-4 bg-muted rounded w-20" />
                                </div>
                                <div className="h-3 bg-muted rounded w-full" />
                                <div className="h-3 bg-muted rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Simplified Custom Layout for specific use cases
export function MultiColumnSkeleton({
    leftColumnWidth = "4",
    rightRows = 3,
}: {
    leftColumnWidth?: "3" | "4" | "5" | "6"
    rightRows?: number
}) {
    return (
        <div className={`grid grid-cols-12 gap-6`}>
            {/* Left Column - Fixed width */}
            <div className={`col-span-${leftColumnWidth}`}>
                <div className="bg-card rounded-lg border border-border p-6 space-y-6 h-full">
                    {/* Avatar */}
                    {/* <div className="flex flex-col items-center space-y-3">
                        <div className="h-32 w-32 rounded-full bg-muted" />
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                    </div> */}

                    {/* Quick Info */}
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="h-4 bg-muted rounded w-1/3" />
                                <div className="h-4 bg-muted rounded w-1/4" />
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-7 bg-muted rounded w-16" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column - Multiple rows */}
            <div className={`col-span-${12 - parseInt(leftColumnWidth)} space-y-6`}>
                {Array.from({ length: rightRows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="bg-card rounded-lg border border-border p-6">
                        <div className="h-6 bg-muted rounded w-1/4 mb-4" />
                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-4 bg-muted rounded" style={{ width: `${80 - i * 15}%` }} />
                            ))}
                        </div>
                        {rowIndex === 1 && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-20 bg-muted rounded" />
                                ))}
                            </div>
                        )}
                        {rowIndex === 2 && (
                            <div className="flex space-x-4 mt-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-8 bg-muted rounded flex-1" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}






/*
/ Your specific case - 1 column full height, 3 rows in second column
<MultiColumnSkeleton 
  leftColumnWidth="4"  // 4/12 width (33%)
  rightRows={3}
/>

// Or use the custom layout
<SkeletonLoader layout="custom" count={1} />

// For dashboard layout
<SkeletonLoader layout="dashboard" count={1} />

// For profile page
<SkeletonLoader layout="profile" count={1} />

// Grid of cards
<SkeletonLoader layout="card" columns={3} count={6} />

// List view
<SkeletonLoader layout="list" columns={1} count={4} />

*/