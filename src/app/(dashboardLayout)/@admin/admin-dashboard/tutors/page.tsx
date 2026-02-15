import tutorServices from '@/services/tutor.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils/geInitials';
import { IconInbox } from '@tabler/icons-react';
import { TableGenerator } from '@/components/global/TableGenerator';
import PrimaryButton from '@/components/ButtonPrimary';

export const dynamic = 'force-dynamic';

const AllTutorsPage = async () => {
    const { data, error } = await tutorServices.getTutors();

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
            header: 'Tutor',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                        {row.user.image ? (
                            <img
                                src={row.user.image}
                                alt={row.user.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            getInitials(row.user.name)
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.user.name}</span>
                        <span className="text-xs text-muted-foreground">{row.user.email}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Title',
            accessor: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-medium text-sm">{row.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{row.bio}</span>
                </div>
            ),
        },
        {
            header: 'Categories',
            accessor: (row: any) => (
                <div className="flex flex-wrap gap-1">
                    {row.categories.map((cat: any) => (
                        <Badge key={cat.id} variant="outline" className="text-xs">
                            {cat.category.icon} {cat.category.name}
                        </Badge>
                    ))}
                </div>
            ),
        },
        {
            header: 'Experience',
            accessor: (row: any) => (
                <span className="text-sm">{row.experience} {row.experience === 1 ? 'year' : 'years'}</span>
            ),
        },
        {
            header: 'Rate',
            accessor: (row: any) => <span className="font-medium">${row.hourlyRate}/hr</span>,
        },
        {
            header: 'Rating',
            accessor: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">⭐ {row.rating}</span>
                    <span className="text-xs text-muted-foreground">({row.totalReviews} reviews)</span>
                </div>
            ),
        },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge className={row.isVerified ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}>
                    {row.isVerified ? 'Verified' : 'Pending'}
                </Badge>
            ),
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                        View
                    </Button>
                    {!row.isVerified && (
                        <PrimaryButton className="text-white" size="sm">
                            Verify
                        </PrimaryButton>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="w-full min-h-screen py-12 px-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">All Tutors</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Total: {data.length} tutors
                    </p>
                </div>
            </div>
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
                <TableGenerator columns={columns} data={data.data} emptyMessage="No tutors found" />
            </div>
        </div>
    );
};

export default AllTutorsPage;