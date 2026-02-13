import tutorServices from '@/services/tutor.service';
import { AlertCircle, Calendar, Clock, Plus } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CreateAvailabilityModal from './_components/CreateAvailabilityModal';
import AvailabilityCard from './_components/AvailabilityCard';



const AvailabilityPage = async () => {
    const { data, error } = await tutorServices.getTutorProfile();

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">Failed to load availability</p>
                </div>
            </div>
        );
    }

    const tutor = data;
    const availability = tutor.availability || [];

    // Sort availability by day of week
    const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const sortedAvailability = [...availability].sort((a, b) => {
        return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
    });

    // Calculate total hours
    const totalHours = availability.reduce((total: any, slot: any) => {
        const start = slot.startTime.split(':');
        const end = slot.endTime.split(':');
        const startHours = parseInt(start[0]) + parseInt(start[1]) / 60;
        const endHours = parseInt(end[0]) + parseInt(end[1]) / 60;
        return total + (endHours - startHours);
    }, 0);

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Calendar className="h-8 w-8 text-primary" />
                        </div>
                        My Availability
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your teaching schedule and available time slots
                    </p>
                </div>
                <CreateAvailabilityModal tutorProfileId={tutor.id} />
            </div>

            {/* Summary Card */}
            {availability.length > 0 && (
                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <CardTitle className="text-lg">Schedule Summary</CardTitle>
                        <CardDescription>Your weekly teaching availability</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <p className="text-xs font-medium text-muted-foreground">Available Days</p>
                                </div>
                                <p className="text-2xl font-bold">{availability.length}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <p className="text-xs font-medium text-muted-foreground">Total Hours/Week</p>
                                </div>
                                <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <p className="text-xs font-medium text-muted-foreground">Avg Hours/Day</p>
                                </div>
                                <p className="text-2xl font-bold">{(totalHours / availability.length).toFixed(1)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Availability List */}
            {availability.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
                        <Badge variant="outline" className="text-sm">
                            {availability.length} {availability.length === 1 ? 'slot' : 'slots'}
                        </Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {sortedAvailability.map((slot) => (
                            <AvailabilityCard key={slot.id} slot={slot} />
                        ))}
                    </div>
                </div>
            ) : (
                // Empty State
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
                            <div className="relative p-6 bg-primary/10 rounded-full">
                                <Calendar className="h-16 w-16 text-primary" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-2">No Availability Set</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                            You haven't added any availability slots yet. Set your teaching schedule to let students know when you're available for sessions.
                        </p>

                        <CreateAvailabilityModal />

                        <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-md">
                            <p className="text-sm text-muted-foreground text-center">
                                💡 <strong>Tip:</strong> Adding availability helps students book sessions at times that work for both of you!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AvailabilityPage;