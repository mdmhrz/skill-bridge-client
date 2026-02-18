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
            <div className='overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm'>
                <Table>
                    <TableHeader>
                        <TableRow className='border-border/70 bg-muted/65 hover:bg-muted/65'>
                            {columns.map((col, idx) => (
                                <TableHead key={idx} className='h-12 px-4 text-[12px] font-semibold tracking-wide text-foreground/85 uppercase'>
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 6 }).map((_, rowIdx) => (
                            <TableRow key={rowIdx} className='border-border/60'>
                                {columns.map((_, colIdx) => (
                                    <TableCell key={colIdx} className='px-4 py-3'>
                                        <Skeleton
                                            className={`h-4 rounded-md ${colIdx % 3 === 0 ? 'w-[85%]' : colIdx % 3 === 1 ? 'w-[70%]' : 'w-[55%]'
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className='flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/15 px-6 py-16 text-center'>
                <div className='mb-4 rounded-full border border-border/60 bg-background p-3 shadow-sm'>
                    <IconInbox className='h-7 w-7 text-muted-foreground' />
                </div>
                <p className='text-base font-medium text-foreground'>Nothing to show yet</p>
                <p className='mt-1 text-sm text-muted-foreground'>{emptyMessage || 'No data available'}</p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm'>
            <Table>
                <TableHeader>
                    <TableRow className='border-border/70 bg-muted/65 hover:bg-muted/65'>
                        {columns.map((col, idx) => (
                            <TableHead key={idx} className='h-12 px-4 text-[12px] font-semibold tracking-wide text-foreground/85 uppercase'>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow
                            key={idx}
                            className='border-border/60 odd:bg-background even:bg-muted/[0.18] hover:even:bg-muted/40 hover:odd:bg-muted/25'
                        >
                            {columns.map((col, cidx) => (
                                <TableCell key={cidx} className='px-4 py-3 align-middle'>
                                    {col.accessor(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}