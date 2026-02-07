"use client"

import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PaginationControlProps {
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
    limitOptions?: number[]
}

export function PaginationControl({
    meta,
    limitOptions = [5, 10, 15, 20, 30, 50],
}: PaginationControlProps) {
    const { total, page, limit, totalPages } = meta

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const start = total === 0 ? 0 : (page - 1) * limit + 1
    const end = total === 0 ? 0 : Math.min(page * limit, total)

    const updateQuery = (nextPage: number, nextLimit = limit) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(nextPage))
        params.set("limit", String(nextLimit))
        router.push(`${pathname}?${params.toString()}`)
    }

    const isFirstPage = page <= 1
    const isLastPage = page >= totalPages || totalPages === 0

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Results info */}
            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{start}</span>{" "}
                to{" "}
                <span className="font-medium text-foreground">{end}</span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                    {total}
                </span>{" "}
                results
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Start */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuery(1)}
                    disabled={isFirstPage}
                    aria-label="First page"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuery(page - 1)}
                    disabled={isFirstPage}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page info */}
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    Page{" "}
                    <span className="font-medium text-foreground">
                        {totalPages === 0 ? 0 : page}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                        {totalPages}
                    </span>
                </div>

                {/* Next */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuery(page + 1)}
                    disabled={isLastPage}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* End */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuery(totalPages)}
                    disabled={isLastPage}
                    aria-label="Last page"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>

                {/* Limit */}
                <Select
                    value={String(limit)}
                    onValueChange={(value) =>
                        updateQuery(1, Number(value))
                    }
                >
                    <SelectTrigger className="w-[90px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {limitOptions.map((opt) => (
                            <SelectItem key={opt} value={String(opt)}>
                                {opt} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}