import { LucideIcon } from "lucide-react"

export function EmptyState({
    icon: Icon,
    message,
}: {
    icon: LucideIcon
    message: string
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground">
            <Icon className="h-8 w-8" />
            <p className="text-sm text-center">{message}</p>
        </div>
    )
}
