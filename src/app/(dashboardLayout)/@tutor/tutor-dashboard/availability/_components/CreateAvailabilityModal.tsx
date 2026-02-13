'use client';

import { Plus, Calendar, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createAvailability } from '@/actions/availability.action';

const CreateAvailabilityModal = (tutorProfileId: any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        ...tutorProfileId,
        dayOfWeek: '',
        startTime: '',
        endTime: '',
    });

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
            console.log(formData, 'before submit')
            const res = await createAvailability(formData)
            // console.log(res)


            if (!res || res.error) {
                toast.error(res?.error?.message || "Creating availabili failed", { id: toastId })
                return
            }

            if (!res.data) {
                toast.error("No response receivend from server", { id: toastId })
                return
            }

            toast.success("Availability Created Successfully", { id: toastId })

            setOpen(false);
            setFormData({ dayOfWeek: '', startTime: '', endTime: '', tutorProfileId });
            router.refresh();
        } catch (error) {
            toast.error('Failed to add availability');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Availability
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Add New Availability
                    </DialogTitle>
                    <DialogDescription>
                        Set your available teaching hours for a specific day of the week.
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

                    {/* Preview */}
                    {formData.dayOfWeek && formData.startTime && formData.endTime && (
                        <div className="p-4 bg-muted/50 rounded-lg border border-border">
                            <p className="text-sm font-medium mb-2">Preview:</p>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-medium">
                                    {formData.dayOfWeek.charAt(0) + formData.dayOfWeek.slice(1).toLowerCase()}
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{formData.startTime} - {formData.endTime}</span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Availability
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAvailabilityModal;