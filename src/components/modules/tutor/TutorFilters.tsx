"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import {
    Search,
    ArrowUpDown,
    Star,
    Clock,
    DollarSign,
    Users,
    Calendar,
    TrendingUp,
} from "lucide-react"

export default function TutorFilters() {
    return (
        <div className="space-y-6 p-4">
            {/* Search */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    Search tutors
                </Label>
                <Input placeholder="Search by name, title, skill..." />
            </div>

            <Separator />

            {/* Sort Section */}
            <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    Sort options
                </Label>

                {/* Sort By */}
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        Sort by
                    </Label>
                    <Select defaultValue="createdAt">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Newest
                                </div>
                            </SelectItem>

                            <SelectItem value="rating">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4" />
                                    Rating
                                </div>
                            </SelectItem>

                            <SelectItem value="totalReviews">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Total reviews
                                </div>
                            </SelectItem>

                            <SelectItem value="experience">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Experience
                                </div>
                            </SelectItem>

                            <SelectItem value="hourlyRate">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Hourly rate
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Order */}
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        Order
                    </Label>
                    <Select defaultValue="desc">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">
                                Ascending
                            </SelectItem>
                            <SelectItem value="desc">
                                Descending
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator />

            {/* Experience Filter */}
            <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Experience level
                </Label>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox id="exp-1" />
                        <Label htmlFor="exp-1" className="text-sm">
                            1+ years
                        </Label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="exp-3" />
                        <Label htmlFor="exp-3" className="text-sm">
                            3+ years
                        </Label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="exp-5" />
                        <Label htmlFor="exp-5" className="text-sm">
                            5+ years
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    )
}
