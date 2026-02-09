'use client'

import { Button } from '@/components/ui/button'
import { AuthUser } from '@/types'
import { Tutor } from '@/types/tutorDetails.type'
import {
    Calendar,
    X,
    Clock,
    DollarSign,
    BookOpen,
    CheckCircle2,
    Loader2,
    AlertCircle
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, addDays, setHours, setMinutes, parse, isAfter, isBefore } from "date-fns"
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { createBooking } from '@/actions/booking.action'

// Zod validation schema
const bookingSchema = z.object({
    tutorProfileId: z.string().min(1, "Tutor profile is required"),
    scheduledDate: z.date().refine((date) => date !== undefined && date !== null, {
        message: "Please select a date and time"
    }),
    duration: z.number().min(30, "Minimum duration is 30 minutes").max(120, "Maximum duration is 2 hours"),
    totalPrice: z.string().min(1, "Price calculation error"),
    categoryId: z.string().min(1, "Please select a category"),
})

type BookingFormData = z.infer<typeof bookingSchema>

// Duration options (30 min to 2 hours)
const DURATION_OPTIONS = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
]

// Time slot options (every 30 minutes)
const generateTimeSlots = (startTime: string, endTime: string) => {
    const slots: string[] = []
    const start = parse(startTime, 'HH:mm', new Date())
    const end = parse(endTime, 'HH:mm', new Date())

    let current = start
    while (isBefore(current, end) || current.getTime() === end.getTime()) {
        slots.push(format(current, 'HH:mm'))
        current = addDays(setMinutes(current, current.getMinutes() + 30), 0)
    }
    return slots
}

const BookSessions = ({ tutor, user }: { tutor: Tutor; user: AuthUser }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form state
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedAvailability, setSelectedAvailability] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<string>('')
    const [selectedDuration, setSelectedDuration] = useState<number>(60)

    // Reset form
    const resetForm = () => {
        setSelectedCategory('')
        setSelectedAvailability('')
        setSelectedDate(undefined)
        setSelectedTime('')
        setSelectedDuration(60)
    }

    const handleSessionBookOpen = () => {
        if (!user) {
            toast.error("Please login first to make booking")
            return
        }
        setOpen(!open)
        if (!open) {
            resetForm()
        }
    }

    // Get available days from tutor availability
    const availableDays = useMemo(() => {
        return tutor.availability?.map(slot => slot.dayOfWeek) || []
    }, [tutor.availability])



    // Get selected availability slot details
    const selectedSlot = useMemo(() => {
        return tutor.availability?.find(slot => slot.id === selectedAvailability)
    }, [selectedAvailability, tutor.availability])

    // Generate time slots for selected availability
    const availableTimeSlots = useMemo(() => {
        if (!selectedSlot) return []
        return generateTimeSlots(selectedSlot.startTime, selectedSlot.endTime)
    }, [selectedSlot])

    // Calculate total price
    const totalPrice = useMemo(() => {
        const hourlyRate = parseFloat(tutor.hourlyRate || '0')
        const hours = selectedDuration / 60
        return (hourlyRate * hours).toFixed(2)
    }, [tutor.hourlyRate, selectedDuration])

    // Check if form is valid
    const isFormValid = useMemo(() => {
        return !!(
            selectedCategory &&
            selectedAvailability &&
            selectedDate &&
            selectedTime &&
            selectedDuration
        )
    }, [selectedCategory, selectedAvailability, selectedDate, selectedTime, selectedDuration])

    // Disable dates that don't match tutor availability
    const disableDate = (date: Date) => {
        const dayName = format(date, 'EEEE').toUpperCase()
        const isPast = isBefore(date, new Date())
        const isAvailable = availableDays.includes(dayName as any)

        return isPast || !isAvailable
    }

    // Handle booking submission
    const handleBooking = async () => {
        // Validate all fields are filled
        if (!isFormValid) {
            toast.error("Please fill all required fields")
            return
        }

        const toastId = toast.loading("Creating Booking...")

        try {
            // Combine date + time (local)
            const [hours, minutes] = selectedTime.split(':').map(Number)
            const localDateTime = setMinutes(setHours(selectedDate!, hours), minutes)

            // Convert LOCAL → UTC manually
            const utcDate = new Date(
                localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60 * 1000
            )

            // Final payload (server-ready)
            const finalPayload = {
                tutorProfileId: tutor.id,
                scheduledDate: utcDate.toISOString(),
                duration: selectedDuration,
                totalPrice,
                categoryId: selectedCategory,
            }

            console.log(finalPayload)

            setIsLoading(true)

            const res = await createBooking(finalPayload)
            console.log('API Response:', res) // Debug log

            if (!res || res.error) {
                toast.error(res?.error?.message || "Booking failed", { id: toastId })
                return
            }

            if (!res.data) {
                toast.error("No data received from server", { id: toastId })
                return
            }

            toast.success("Booking Created Successfully", {
                description: `Your session is scheduledd for ${format(
                    utcDate,
                    "PPP"
                )} at ${selectedTime}`,
                id: toastId,
            })

            setOpen(false)
            resetForm()

            // Optionally refresh the page or update UI
            // router.refresh()

        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                id: toastId,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* Book Session Button */}
            <Button
                onClick={handleSessionBookOpen}
                size="lg"
                className="flex-1 min-w-[200px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
            >
                <Calendar className="mr-2 h-5 w-5" />
                Book Session
            </Button>

            {/* Booking Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar border-2">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-background border-b z-10 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Book a Session</h2>
                                        <p className="text-sm text-muted-foreground">
                                            with {tutor.user?.name}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setOpen(false)}
                                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Tutor Info Card */}
                            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
                                <CardContent className="">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Tutor</p>
                                            <p className="text-xl font-bold">{tutor.user?.name}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{tutor.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                                            <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                {tutor.hourlyRate}/hr
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Booking Form */}
                            <div className="space-y-5">
                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        Select Category
                                    </Label>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger
                                            id="category"
                                            className={cn(
                                                "h-12 text-base border-2 transition-all",
                                                selectedCategory && "border-primary/50"
                                            )}
                                        >
                                            <SelectValue placeholder="Choose a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tutor.categories?.map((cat) => (
                                                <SelectItem
                                                    key={cat.category.id}
                                                    value={cat.category.id.toString()}
                                                    className="text-base py-3"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{cat.category.name}</span>

                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Availability Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="availability" className="text-base font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        Select Day of Week
                                    </Label>
                                    <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                                        <SelectTrigger
                                            id="availability"
                                            className={cn(
                                                "h-12 text-base border-2 transition-all",
                                                selectedAvailability && "border-primary/50"
                                            )}
                                        >
                                            <SelectValue placeholder="Choose available day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tutor.availability?.map((slot) => (
                                                <SelectItem
                                                    key={slot.id}
                                                    value={slot.id}
                                                    className="text-base py-3"
                                                >
                                                    <div className="flex items-center justify-between gap-4 w-full">
                                                        <span className="font-medium">{slot.dayOfWeek}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {slot.startTime} - {slot.endTime}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        Select Date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full h-12 justify-start text-left font-normal text-base border-2 transition-all",
                                                    !selectedDate && "text-muted-foreground",
                                                    selectedDate && "border-primary/50"
                                                )}
                                                disabled={!selectedAvailability}
                                            >
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                disabled={disableDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {selectedAvailability && (
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            Only {selectedSlot?.dayOfWeek}s are available for this tutor
                                        </p>
                                    )}
                                </div>

                                {/* Time Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="time" className="text-base font-semibold flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        Select Time
                                    </Label>
                                    <Select
                                        value={selectedTime}
                                        onValueChange={setSelectedTime}
                                        disabled={!selectedSlot}
                                    >
                                        <SelectTrigger
                                            id="time"
                                            className={cn(
                                                "h-12 text-base border-2 transition-all",
                                                selectedTime && "border-primary/50"
                                            )}
                                        >
                                            <SelectValue placeholder="Choose a time slot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableTimeSlots.map((time) => (
                                                <SelectItem
                                                    key={time}
                                                    value={time}
                                                    className="text-base py-3"
                                                >
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Duration Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="duration" className="text-base font-semibold flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        Session Duration
                                    </Label>
                                    <Select
                                        value={selectedDuration.toString()}
                                        onValueChange={(value) => setSelectedDuration(Number(value))}
                                    >
                                        <SelectTrigger
                                            id="duration"
                                            className="h-12 text-base border-2 border-primary/50"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DURATION_OPTIONS.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value.toString()}
                                                    className="text-base py-3"
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            {/* Price Summary */}
                            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-50/30 dark:from-emerald-950/20 dark:to-emerald-950/5 border-emerald-200 dark:border-emerald-900">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Booking Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Hourly Rate:</span>
                                        <span className="font-semibold">${tutor.hourlyRate}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Duration:</span>
                                        <span className="font-semibold">
                                            {DURATION_OPTIONS.find(d => d.value === selectedDuration)?.label}
                                        </span>
                                    </div>
                                    <Separator className="bg-emerald-200 dark:bg-emerald-900" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total Price:</span>
                                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                            ${totalPrice}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 border-2"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    onClick={handleBooking}
                                    disabled={!isFormValid || isLoading}
                                    className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Booking...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="mr-2 h-5 w-5" />
                                            Confirm Booking
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Helper Text */}
                            {!isFormValid && (
                                <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Please fill all fields to proceed with booking
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookSessions