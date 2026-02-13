'use client';

import { Trash2, Calendar, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AvailabilitySlot {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

interface DeleteAvailabilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    slot: AvailabilitySlot;
}

const DeleteAvailabilityModal = ({ open, onOpenChange, slot }: DeleteAvailabilityModalProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formatDay = (day: string) => {
        return day.charAt(0) + day.slice(1).toLowerCase();
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            // TODO: Replace with your actual API call
            // const response = await tutorServices.deleteAvailability(slot.id);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Availability deleted successfully!');
            onOpenChange(false);
            router.refresh();
        } catch (error) {
            toast.error('Failed to delete availability');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <Trash2 className="h-5 w-5" />
                        Delete Availability
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove this availability slot?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Warning Alert */}
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            This action cannot be undone. Students will no longer be able to book sessions during this time slot.
                        </AlertDescription>
                    </Alert>

                    {/* Slot Details */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-3">
                        <p className="text-sm font-medium">Slot to be deleted:</p>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{formatDay(slot.dayOfWeek)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{slot.startTime} - {slot.endTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Impact Notice */}
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            <strong>Note:</strong> Any pending bookings for this time slot may be affected. Make sure to communicate with your students if necessary.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Availability
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAvailabilityModal;