'use client';

import { Calendar, Clock, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import UpdateAvailabilityModal from './UpdateAvailabilityModal';
import DeleteAvailabilityModal from './DeleteAvailabilityModal';


interface AvailabilitySlot {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

interface AvailabilityCardProps {
    slot: AvailabilitySlot;
}

const AvailabilityCard = ({ slot }: AvailabilityCardProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Format day name
    const formatDay = (day: string) => {
        return day.charAt(0) + day.slice(1).toLowerCase();
    };

    // Calculate duration
    const calculateDuration = () => {
        const start = slot.startTime.split(':');
        const end = slot.endTime.split(':');
        const startHours = parseInt(start[0]) + parseInt(start[1]) / 60;
        const endHours = parseInt(end[0]) + parseInt(end[1]) / 60;
        const duration = endHours - startHours;

        if (duration === 1) return '1 hour';
        if (duration < 1) return `${Math.round(duration * 60)} minutes`;
        return `${duration.toFixed(1)} hours`;
    };

    // Get day color
    const getDayColor = (day: string) => {
        const colors: Record<string, string> = {
            SUNDAY: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
            MONDAY: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
            TUESDAY: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400',
            WEDNESDAY: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400',
            THURSDAY: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
            FRIDAY: 'bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400',
            SATURDAY: 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
        };
        return colors[day] || 'bg-muted text-muted-foreground';
    };

    return (
        <>
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary group">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-lg ${getDayColor(slot.dayOfWeek)}`}>
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{formatDay(slot.dayOfWeek)}</h3>
                                    <p className="text-xs text-muted-foreground">Weekly schedule</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setShowUpdateModal(true)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Time Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{slot.startTime}</span>
                                <span className="text-muted-foreground">to</span>
                                <span className="font-medium">{slot.endTime}</span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                                <Badge variant="secondary" className="font-normal">
                                    {calculateDuration()}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    Available for booking
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modals */}
            <UpdateAvailabilityModal
                open={showUpdateModal}
                onOpenChange={setShowUpdateModal}
                slot={slot}
            />
            <DeleteAvailabilityModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                slot={slot}
            />
        </>
    );
};

export default AvailabilityCard;