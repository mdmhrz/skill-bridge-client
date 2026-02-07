"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NothingFoundProps {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    className?: string
}

export function NothingFound({
    title = "Nothing found",
    description = "Try adjusting your search or filters to find what you’re looking for.",
    actionLabel,
    onAction,
    className,
}: NothingFoundProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center gap-4 rounded-lg border border-dashed p-10 bg-muted/40",
                className
            )}
        >
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm">
                <SearchX className="h-7 w-7 text-muted-foreground" />
            </div>

            {/* Text */}
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                    {description}
                </p>
            </div>

            {/* Optional action */}
            {actionLabel && onAction && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onAction}
                    className="mt-2"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}
