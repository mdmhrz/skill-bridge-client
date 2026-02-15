import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '../ui/skeleton';
import { IconInbox } from '@tabler/icons-react';

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
        <Table className='border'>
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