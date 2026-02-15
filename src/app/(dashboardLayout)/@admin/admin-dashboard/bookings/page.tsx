import { bookingService } from '@/services/booking.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconInbox } from '@tabler/icons-react';
import { TableGenerator } from '@/components/global/TableGenerator';

export const dynamic = 'force-dynamic';

const AllBookingsPage = async () => {
    const { bookingData, error } = await bookingService.getAllBookings();

    // Loading fallback
    if (!bookingData && !error) {
        return (
            <div className="w-full py-12 px-4">
                <TableGenerator columns={[]} data={null} isLoading />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-destructive">
                <IconInbox className="text-4xl mb-4" />
                <p>{error.message}</p>
            </div>
        );
    }

    const columns = [
        {
            header: 'Student',
            accessor: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.student.name}</span>
                    {row.student.phone && (
                        <span className="text-sm text-muted-foreground">{row.student.phone}</span>
                    )}
                </div>
            ),
        },
        {
            header: 'Tutor',
            accessor: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.tutorProfile.user.name}</span>
                    <span className="text-sm text-muted-foreground">
                        {row.tutorProfile.user.email}
                    </span>
                </div>
            ),
        },
        {
            header: 'Scheduled Date',
            accessor: (row: any) => new Date(row.scheduledDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        {
            header: 'Duration',
            accessor: (row: any) => `${row.duration} min`,
        },
        {
            header: 'Price',
            accessor: (row: any) => `৳${row.totalPrice}`,
        },
        {
            header: 'Status',
            accessor: (row: any) => {
                const statusColors: Record<string, string> = {
                    CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                    COMPLETED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                };
                return (
                    <Badge className={statusColors[row.status] || 'bg-muted text-muted-foreground'}>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                        View
                    </Button>
                    <Button size="sm" variant="outline">
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full min-h-screen py-12 px-4">
            <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
                <TableGenerator
                    columns={columns}
                    data={bookingData}
                    emptyMessage="No bookings found"
                />
            </div>
        </div>
    );
};

export default AllBookingsPage;