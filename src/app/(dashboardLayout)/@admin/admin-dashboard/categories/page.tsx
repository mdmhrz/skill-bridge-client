import categoryServices from '@/services/category.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconInbox, IconPlus } from '@tabler/icons-react';
import { TableGenerator } from '@/components/global/TableGenerator';
import PrimaryButton from '@/components/ButtonPrimary';

export const dynamic = 'force-dynamic';

const AllCategories = async () => {
    const { data, error } = await categoryServices.getCategories();

    // Loading fallback
    if (!data && !error) {
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
            header: 'Category',
            accessor: (row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-2xl">
                        {row.icon || '📁'}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-sm text-muted-foreground">{row.slug}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Description',
            accessor: (row: any) => (
                <span className="text-sm text-muted-foreground max-w-md line-clamp-2">
                    {row.description}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge className={row.isActive ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}>
                    {row.isActive ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            header: 'Created At',
            accessor: (row: any) =>
                new Date(row.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
        },
        {
            header: 'Updated At',
            accessor: (row: any) =>
                new Date(row.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                        Update
                    </Button>
                    <PrimaryButton className="text-white" size="sm" variant="destructive">
                        Delete
                    </PrimaryButton>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full min-h-screen py-12 px-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">All Categories</h1>
                <PrimaryButton className="text-white">Add Category <IconPlus></IconPlus></PrimaryButton>
            </div>
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
                <TableGenerator columns={columns} data={data} emptyMessage="No categories found" />
            </div>
        </div>
    );
};

export default AllCategories;