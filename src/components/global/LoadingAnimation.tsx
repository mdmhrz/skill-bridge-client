// components/ui/loading-animation.tsx

interface LoadingAnimationProps {
    /**
     * Size of the loading animation
     * @default "md"
     */
    size?: "sm" | "md" | "lg" | "xl"
    /**
     * Type of loading animation
     * @default "spinner"
     */
    variant?: "spinner" | "pulse" | "dots" | "bars" | "gradient" | "modern"
    /**
     * Optional label to display
     */
    label?: string
    /**
     * Optional subtext
     */
    subtext?: string
    /**
     * Whether to show full screen overlay
     * @default false
     */
    fullScreen?: boolean
    /**
     * Custom className for the container
     */
    className?: string
}

export function LoadingAnimation({
    size = "md",
    variant = "spinner",
    label,
    subtext,
    fullScreen = false,
    className = "",
}: LoadingAnimationProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
        xl: "h-16 w-16 border-4",
    }

    const spinnerSizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
    }

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    }

    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        : "flex items-center justify-center"

    const Spinner = () => (
        <div className={`relative ${spinnerSizeClasses[size]}`}>
            <div
                className={`absolute inset-0 rounded-full border-2 border-muted ${sizeClasses[size]}`}
            />
            <div
                className={`absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin ${sizeClasses[size]}`}
            />
        </div>
    )

    const Pulse = () => (
        <div className={`relative ${spinnerSizeClasses[size]}`}>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className={`relative bg-primary rounded-full ${spinnerSizeClasses[size]}`} />
        </div>
    )

    const Dots = () => (
        <div className="flex items-center space-x-2">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={`bg-primary rounded-full animate-bounce ${size === "sm" ? "h-2 w-2" :
                        size === "md" ? "h-3 w-3" :
                            size === "lg" ? "h-4 w-4" :
                                "h-5 w-5"
                        }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
    )

    const Bars = () => (
        <div className="flex items-end space-x-1">
            {[0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4].map((height, i) => (
                <div
                    key={i}
                    className="bg-primary rounded-t"
                    style={{
                        width: size === "sm" ? "2px" :
                            size === "md" ? "3px" :
                                size === "lg" ? "4px" : "6px",
                        height: `${height * 100}%`,
                        animation: "pulse 1.5s ease-in-out infinite",
                        animationDelay: `${i * 0.1}s`,
                    }}
                />
            ))}
        </div>
    )

    const GradientSpinner = () => (
        <div className={`relative ${spinnerSizeClasses[size]}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin" />
            <div className="absolute inset-1 rounded-full bg-background" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-20 animate-pulse" />
        </div>
    )

    const ModernLoader = () => (
        <div className={`relative ${spinnerSizeClasses[size]}`}>
            {/* Outer ring */}
            <div
                className={`absolute inset-0 rounded-full border-2 ${sizeClasses[size]} border-transparent border-t-primary/30 border-r-primary/30 animate-spin`}
                style={{ animationDuration: "3s" }}
            />

            {/* Middle ring */}
            <div
                className={`absolute inset-1 rounded-full border-2 ${sizeClasses[size].replace('border-', 'border-')} border-transparent border-b-secondary/40 border-l-secondary/40 animate-spin`}
                style={{ animationDuration: "2s", animationDirection: "reverse" }}
            />

            {/* Inner dot */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse" />

            {/* Floating dots */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, i) => (
                <div
                    key={i}
                    className="absolute h-1 w-1 bg-primary rounded-full"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${degree}deg) translate(24px) rotate(-${degree}deg)`,
                        animation: "pulse 2s ease-in-out infinite",
                        animationDelay: `${i * 0.25}s`,
                    }}
                />
            ))}
        </div>
    )

    const VariantLoader = () => {
        switch (variant) {
            case "pulse":
                return <Pulse />
            case "dots":
                return <Dots />
            case "bars":
                return <Bars />
            case "gradient":
                return <GradientSpinner />
            case "modern":
                return <ModernLoader />
            default:
                return <Spinner />
        }
    }

    return (
        <div className={`${containerClasses} ${className}`}>
            <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <VariantLoader />

                {(label || subtext) && (
                    <div className="text-center space-y-2">
                        {label && (
                            <p className={`font-medium text-foreground ${textSizeClasses[size]}`}>
                                {label}
                            </p>
                        )}
                        {subtext && (
                            <p className={`text-muted-foreground ${size === "sm" ? "text-xs" : "text-sm"}`}>
                                {subtext}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

// Card Skeleton Loader
export function CardSkeletonLoader({
    count = 1,
    variant = "default",
}: {
    count?: number
    variant?: "default" | "compact" | "detailed"
}) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-card rounded-lg border border-border p-4 animate-pulse"
                >
                    {variant === "default" && (
                        <>
                            <div className="flex items-start space-x-4">
                                <div className="h-12 w-12 rounded-full bg-muted" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                    <div className="h-3 bg-muted rounded w-1/2" />
                                    <div className="h-3 bg-muted rounded w-5/6" />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                <div className="h-8 bg-muted rounded" />
                                <div className="h-8 bg-muted rounded" />
                                <div className="h-8 bg-muted rounded" />
                            </div>
                        </>
                    )}

                    {variant === "compact" && (
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-1/2" />
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-4/5" />
                        </div>
                    )}

                    {variant === "detailed" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-14 w-14 rounded-full bg-muted" />
                                    <div className="space-y-2">
                                        <div className="h-5 bg-muted rounded w-32" />
                                        <div className="h-4 bg-muted rounded w-24" />
                                    </div>
                                </div>
                                <div className="h-8 bg-muted rounded w-20" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-11/12" />
                                <div className="h-4 bg-muted rounded w-5/6" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-6 bg-muted rounded w-16" />
                                <div className="h-6 bg-muted rounded w-20" />
                                <div className="h-6 bg-muted rounded w-14" />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

// Page Loading Overlay
export function PageLoading({
    title = "Loading",
    description = "Please wait while we prepare your content",
    showProgress = false,
}: {
    title?: string
    description?: string
    showProgress?: boolean
}) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
            <div className="max-w-md w-full px-8 text-center">
                {/* Animated Logo/Icon */}
                <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin" />
                    <div className="absolute inset-6 rounded-full bg-background flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                {/* Progress Bar */}
                {showProgress && (
                    <div className="mt-8">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full animate-loading-progress" />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Loading resources...
                        </p>
                    </div>
                )}

                {/* Loading Indicator */}
                <div className="mt-12">
                    <div className="flex justify-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Inline Loading
export function InlineLoading({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="inline-flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{text}</span>
        </div>
    )
}




/*

==== Usage ====

 Simple spinner
 <LoadingAnimation /> 

 With label and size
<LoadingAnimation 
  size="lg"
  label="Processing..."
  subtext="This may take a moment"
/> 

 Full screen overlay
<LoadingAnimation 
  variant="modern"
  fullScreen
  label="Loading Application"
/> 

Card skeleton for content loading
 <CardSkeletonLoader count={3} variant="detailed" /> 

Page loading overlay
<PageLoading 
  title="TutorMatch Pro"
  description="Connecting you with expert educators"
  showProgress
/> 

*/