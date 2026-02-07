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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
    Search,
    ArrowUpDown,
    Star,
    Clock,
    DollarSign,
    Users,
    Calendar,
    TrendingUp,
    Filter,
    X,
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

    const clearAllFilters = () => {
        router.push(pathname)
    }

    const hasActiveFilters =
        searchParams.get("search") ||
        searchParams.get("experience") ||
        (searchParams.get("sortBy") && searchParams.get("sortBy") !== "createdAt") ||
        (searchParams.get("sortOrder") && searchParams.get("sortOrder") !== "desc")

    return (
        <div className="space-y-4 p-6 bg-card rounded-lg border shadow-sm flex flex-col min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Clear all
                    </Button>
                )}
            </div>

            {/* Active filters badges */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {searchParams.get("search") && (
                        <Badge variant="secondary" className="px-2 py-1 text-xs">
                            Search: {searchParams.get("search")}
                            <button
                                title="Search"
                                onClick={() => updateQuery("search", "")}
                                className="ml-1.5 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    {selectedExp.length > 0 && (
                        <Badge variant="secondary" className="px-2 py-1 text-xs">
                            {selectedExp.length} experience levels
                            <button
                                title="Experience"
                                onClick={() => updateQuery("experience", "")}
                                className="ml-1.5 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                </div>
            )}

            <Separator className="bg-border/50" />

            <div className="flex-1 overflow-y-auto space-y-4">
                {/* Search */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        Search tutors
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, title, skill..."
                            defaultValue={searchParams.get("search") ?? ""}
                            onChange={(e) =>
                                updateQuery("search", e.target.value)
                            }
                            className="pl-9 bg-background border-input focus:border-primary"
                        />
                    </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Sort */}
                <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        Sort options
                    </Label>

                    <div className="grid gap-3">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Sort by
                            </Label>
                            <Select
                                value={searchParams.get("sortBy") ?? "createdAt"}
                                onValueChange={(v) => updateQuery("sortBy", v)}
                            >
                                <SelectTrigger className="w-full bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="createdAt">
                                        <div className="flex items-center gap-2 py-1">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>Newest</span>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="rating">
                                        <div className="flex items-center gap-2 py-1">
                                            <Star className="h-4 w-4 text-muted-foreground" />
                                            <span>Rating</span>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="totalReviews">
                                        <div className="flex items-center gap-2 py-1">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span>Total reviews</span>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="experience">
                                        <div className="flex items-center gap-2 py-1">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span>Experience</span>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="hourlyRate">
                                        <div className="flex items-center gap-2 py-1">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span>Hourly rate</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Order
                            </Label>
                            <Select
                                value={searchParams.get("sortOrder") ?? "desc"}
                                onValueChange={(v) => updateQuery("sortOrder", v)}
                            >
                                <SelectTrigger className="w-full bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">
                                        <span className="py-1">Ascending</span>
                                    </SelectItem>
                                    <SelectItem value="desc">
                                        <span className="py-1">Descending</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Experience */}
                <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Experience level
                    </Label>

                    <div className="grid gap-2.5">
                        {[
                            { value: "1", label: "1+ years", description: "Entry level" },
                            { value: "3", label: "3+ years", description: "Intermediate" },
                            { value: "5", label: "5+ years", description: "Expert" },
                        ].map((exp) => (
                            <div
                                key={exp.value}
                                className={`
                                flex items-center gap-3 p-3 rounded-lg border 
                                transition-all hover:bg-accent/50 cursor-pointer
                                ${selectedExp.includes(exp.value)
                                        ? 'border-primary bg-primary/5'
                                        : 'border-input bg-background'}
                            `}
                                onClick={() => toggleExperience(exp.value)}
                            >
                                <Checkbox
                                    checked={selectedExp.includes(exp.value)}
                                    onCheckedChange={() => toggleExperience(exp.value)}
                                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                />
                                <div className="flex-1">
                                    <Label className="text-sm font-medium cursor-pointer">
                                        {exp.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {exp.description}
                                    </p>
                                </div>
                                {selectedExp.includes(exp.value) && (
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results summary */}
                <div className="pt-2">
                    <div className="text-xs text-muted-foreground text-center">
                        Filters update results in real-time
                    </div>
                </div>
            </div>
        </div>
    )
}