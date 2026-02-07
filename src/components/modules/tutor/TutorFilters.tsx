"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

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
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updateQuery = useCallback(
        (key: string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString())

            if (!value) {
                params.delete(key)
            } else {
                params.set(key, value)
            }

            // reset page on filter change
            params.set("page", "1")

            router.push(`${pathname}?${params.toString()}`)
        },
        [router, pathname, searchParams]
    )

    const selectedExp =
        searchParams.get("experience")?.split(",") ?? []

    const toggleExperience = (val: string) => {
        const next = selectedExp.includes(val)
            ? selectedExp.filter((v) => v !== val)
            : [...selectedExp, val]

        updateQuery(
            "experience",
            next.length ? next.join(",") : undefined
        )
    }

    return (
        <div className="space-y-6 p-4">
            {/* Search */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    Search tutors
                </Label>
                <Input
                    placeholder="Search by name, title, skill..."
                    defaultValue={searchParams.get("search") ?? ""}
                    onChange={(e) =>
                        updateQuery("search", e.target.value)
                    }
                />
            </div>

            <Separator />

            {/* Sort */}
            <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    Sort options
                </Label>

                {/* Sort by */}
                <Select
                    value={searchParams.get("sortBy") ?? "createdAt"}
                    onValueChange={(v) => updateQuery("sortBy", v)}
                >
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

                {/* Order */}
                <Select
                    value={searchParams.get("sortOrder") ?? "desc"}
                    onValueChange={(v) => updateQuery("sortOrder", v)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            {/* Experience */}
            <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Experience level
                </Label>

                {["1", "3", "5"].map((exp) => (
                    <div key={exp} className="flex items-center gap-2">
                        <Checkbox
                            checked={selectedExp.includes(exp)}
                            onCheckedChange={() =>
                                toggleExperience(exp)
                            }
                        />
                        <Label className="text-sm">
                            {exp}+ years
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}
