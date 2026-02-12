// app/student/bookings/page.tsx
import { bookingService } from '@/services/booking.service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getInitials } from '@/lib/utils/geInitials'
import { Skeleton } from '@/components/ui/skeleton'
import { IconInbox } from '@tabler/icons-react'


export const dynamic = 'force-dynamic'

// Reusable TableGenerator with loading & empty states
interface TableGeneratorProps<T> {
    columns: { header: string; accessor: (row: T) => React.ReactNode }[]
    data: T[] | null
    isLoading?: boolean
    emptyMessage?: string
}

export const TableGenerator = <T,>({ columns, data, isLoading, emptyMessage }: TableGeneratorProps<T>) => {
    if (isLoading) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead key={idx}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, rowIdx) => (
                        <TableRow key={rowIdx}>
                            {columns.map((_, colIdx) => (
                                <TableCell key={colIdx}>
                                    <Skeleton className="h-4 w-full rounded-md" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <IconInbox className="text-4xl mb-4" />
                <p>{emptyMessage || 'No data available'}</p>
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((col, idx) => (
                        <TableHead key={idx}>{col.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx}>
                        {columns.map((col, cidx) => (
                            <TableCell key={cidx}>{col.accessor(row)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const StudentBookings = async () => {
    // Fetch bookings
    const { bookingData, error } = await bookingService.getMyBookings()

    // Loading fallback for server component: simulate suspense
    if (!bookingData && !error) {
        return (
            <div className="w-full py-12 px-4">
                <TableGenerator columns={[]} data={null} isLoading />
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-destructive">
                <IconInbox className="text-4xl mb-4" />
                <p>{error.message}</p>
            </div>
        )
    }

    const columns = [
        {
            header: 'Tutor',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                        {row.tutorProfile.user.image
                            ? <img src={row.tutorProfile.user.image} alt={row.tutorProfile.user.name} className="w-full h-full object-cover rounded-full" />
                            : getInitials(row.tutorProfile.user.name)
                        }
                    </div>
                    <span>{row.tutorProfile.user.name}</span>
                </div>
            ),
        },
        {
            header: 'Scheduled Date',
            accessor: (row: any) => new Date(row.scheduledDate).toLocaleString(),
        },
        {
            header: 'Duration',
            accessor: (row: any) => `${row.duration} mins`,
        },
        {
            header: 'Price',
            accessor: (row: any) => `$${row.totalPrice}`,
        },
        {
            header: 'Status',
            accessor: (row: any) => {
                const statusColors: Record<string, string> = {
                    CONFIRMED: 'bg-accent text-accent-foreground',
                    CANCELLED: 'bg-destructive text-destructive-foreground',
                    COMPLETED: 'bg-success text-success-foreground',
                }
                return <Badge className={statusColors[row.status] || 'bg-muted text-muted-foreground'}>{row.status}</Badge>
            },
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    {row.status === 'CONFIRMED' && <Button size="sm" variant="destructive">Cancel</Button>}
                </div>
            ),
        },
    ]

    return (
        <div className="w-full min-h-screen py-12 px-4">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
                <TableGenerator columns={columns} data={bookingData} emptyMessage="No bookings found" />
            </div>
        </div>
    )
}

export default StudentBookings
