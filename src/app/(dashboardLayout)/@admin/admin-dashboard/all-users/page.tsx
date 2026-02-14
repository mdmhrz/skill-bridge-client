import { userService } from '@/services/user.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils/geInitials';
import { IconInbox } from '@tabler/icons-react';
import { TableGenerator } from '@/components/global/TableGenerator';

export const dynamic = 'force-dynamic';

const AllUsersPage = async () => {
    const { data, error } = await userService.getAllUsers();

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
            header: 'User',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                        {row.image ? (
                            <img
                                src={row.image}
                                alt={row.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            getInitials(row.name)
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-sm text-muted-foreground">{row.email}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Role',
            accessor: (row: any) => {
                const roleColors: Record<string, string> = {
                    TUTOR: 'bg-accent text-accent-foreground',
                    STUDENT: 'bg-muted text-muted-foreground',
                    ADMIN: 'bg-primary text-primary-foreground',
                };
                return (
                    <Badge className={roleColors[row.role] || 'bg-muted text-muted-foreground'}>
                        {row.role}
                    </Badge>
                );
            },
        },
        {
            header: 'Created At',
            accessor: (row: any) => new Date(row.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        },
        {
            header: 'Updated At',
            accessor: (row: any) => new Date(row.updatedAt).toLocaleDateString('en-US', {
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
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
                <TableGenerator
                    columns={columns}
                    data={data}
                    emptyMessage="No users found"
                />
            </div>
        </div>
    );
};

export default AllUsersPage;