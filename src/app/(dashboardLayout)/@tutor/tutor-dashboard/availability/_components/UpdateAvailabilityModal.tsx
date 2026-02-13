'use client';

import { Pencil, Calendar, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateAvailability } from '@/actions/availability.action';

interface AvailabilitySlot {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

interface UpdateAvailabilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    slot: AvailabilitySlot;
}

const UpdateAvailabilityModal = ({ open, onOpenChange, slot }: UpdateAvailabilityModalProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
    });

    // Reset form when slot changes or modal opens
    useEffect(() => {
        if (open) {
            setFormData({
                dayOfWeek: slot.dayOfWeek,
                startTime: slot.startTime,
                endTime: slot.endTime,
            });
        }
    }, [open, slot]);

    const daysOfWeek = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
    ];

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        // Validation
        if (!formData.dayOfWeek || !formData.startTime || !formData.endTime) {
            toast.error('Please fill in all fields');
            return;
        }

        // Validate time range
        if (formData.startTime >= formData.endTime) {
            toast.error('End time must be after start time');
            return;
        }

        setLoading(true);

        try {

            const toastId = toast.loading("Updating availability...")

            const res = await updateAvailability(slot.id, formData)
            console.log(res)


            if (!res || res.error) {
                toast.error(res?.error?.message || "Update failed", { id: toastId })
                return
            }

            if (!res.data) {
                toast.error("No response receivend from server", { id: toastId })
                return
            }

            toast.success("Availability Updated Successfully", { id: toastId })
            onOpenChange(false);
            router.refresh();
        } catch (error) {
            toast.error('Failed to update availability');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Pencil className="h-5 w-5 text-primary" />
                        Update Availability
                    </DialogTitle>
                    <DialogDescription>
                        Modify your teaching hours for this time slot.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Day of Week */}
                    <div className="space-y-2">
                        <Label htmlFor="dayOfWeek">Day of Week</Label>
                        <Select
                            value={formData.dayOfWeek}
                            onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                        >
                            <SelectTrigger id="dayOfWeek">
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent>
                                {daysOfWeek.map((day) => (
                                    <SelectItem key={day} value={day}>
                                        {day.charAt(0) + day.slice(1).toLowerCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime" className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                Start Time
                            </Label>
                            <Input
                                id="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endTime" className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                End Time
                            </Label>
                            <Input
                                id="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Preview of Changes */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-3">
                        <p className="text-sm font-medium">Updated Schedule:</p>

                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                                {formData.dayOfWeek.charAt(0) + formData.dayOfWeek.slice(1).toLowerCase()}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formData.startTime} - {formData.endTime}</span>
                        </div>

                        {/* Show if changed */}
                        {(formData.dayOfWeek !== slot.dayOfWeek ||
                            formData.startTime !== slot.startTime ||
                            formData.endTime !== slot.endTime) && (
                                <div className="pt-3 border-t text-xs text-muted-foreground">
                                    Previous: {slot.dayOfWeek.charAt(0) + slot.dayOfWeek.slice(1).toLowerCase()} • {slot.startTime} - {slot.endTime}
                                </div>
                            )}
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
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Update Availability
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateAvailabilityModal;