'use client'

import { searchTutors } from "@/actions/tutor.action"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, BookOpen, Users, Star, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import PrimaryButton from "@/components/ButtonPrimary"
import { useRouter } from "next/navigation"
import { Tutor } from "@/types"
import Link from "next/link"
import { toast } from "sonner"

export function SkillBridgeBanner() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [results, setResults] = useState<Tutor[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [searchError, setSearchError] = useState("")
    const searchAreaRef = useRef<HTMLDivElement | null>(null)

    const popularSubjects = [
        "Mathematics",
        "English Speaking",
        "Programming",
        "IELTS Preparation"
    ]

    const buildTutorsSearchUrl = (search: string) => {
        const params = new URLSearchParams({
            page: "1",
            limit: "12",
            search,
            sortBy: "createdAt",
            sortOrder: "desc",
        })

        return `/tutors?${params.toString()}`
    }

    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            if (!searchAreaRef.current?.contains(event.target as Node)) {
                setIsPopupOpen(false)
            }
        }

        document.addEventListener("mousedown", onClickOutside)
        return () => document.removeEventListener("mousedown", onClickOutside)
    }, [])

    useEffect(() => {
        const keyword = searchQuery.trim()

        if (!keyword) {
            setResults([])
            setSearchError("")
            setIsPopupOpen(false)
            return
        }

        const timer = setTimeout(async () => {
            setIsSearching(true)
            setSearchError("")

            const res = await searchTutors({
                page: 1,
                limit: 6,
                search: keyword,
                sortBy: "createdAt",
                sortOrder: "desc",
            })

            if (res.error || !res.data) {
                setResults([])
                setSearchError(res.error?.message || "Failed to search tutors")
                setIsPopupOpen(true)
                setIsSearching(false)
                return
            }

            setResults(res.data.data || [])
            setIsPopupOpen(true)
            setIsSearching(false)
        }, 350)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const keyword = searchQuery.trim()
        if (!keyword) return

        setIsPopupOpen(false)
        router.push(buildTutorsSearchUrl(keyword))
    }

    const handleTutorRedirect = (id: string) => {
        setIsPopupOpen(false)
        router.push(`/tutors/${id}`)
    }

    const handleSubjectClick = (subject: string) => {
        setSearchQuery(subject)
        setIsPopupOpen(true)
    }

    return (
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 md:min-h-[calc(100vh-84px)] flex items-center justify-center">
            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Heading */}
                        <div className="space-y-4 animate-fade-in-up animation-delay-200">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                Bridge the Gap to
                                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
                                    Your Success
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up animation-delay-400">
                                Connect with expert tutors for personalized online learning sessions.
                                Master any skill, at your own pace, from anywhere.
                            </p>
                        </div>


                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link href="/tutors">
                                <PrimaryButton size="lg" className="px-8 h-12 font-medium text-white">
                                    Find a Tutor
                                </PrimaryButton>
                            </Link>
                            <Link href="/dashboard">
                                <Button
                                    onClick={() => {
                                        toast.info("You can apply to become a tutor from your dashboard.")
                                    }}
                                    size="lg"
                                    variant="outline"
                                    className="px-8 h-12 font-medium border-2"
                                >
                                    Become a Tutor
                                </Button>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div ref={searchAreaRef} className="relative">
                            <form onSubmit={handleSearchSubmit} className="bg-background focus-within:outline focus-within:outline-primary border-2 border-border rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Input
                                            type="text"
                                            placeholder="Search By Subjects, Tutors or Skills"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => {
                                                if (searchQuery.trim()) setIsPopupOpen(true)
                                            }}
                                            className="border-0 bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0
                                                focus:outline-none px-4 h-12 pl-4 placeholder:text-muted-foreground
                                            "
                                        />
                                    </div>
                                    <PrimaryButton type="submit" size="lg" className="h-12 px-6">
                                        <Search className="h-5 w-5 text-white" />
                                    </PrimaryButton>
                                </div>
                            </form>

                            {isPopupOpen && (
                                <div className="absolute top-[calc(100%+10px)] left-0 right-0 z-30 rounded-xl border border-border bg-popover shadow-lg">
                                    <div className="max-h-80 overflow-y-auto p-2">
                                        {isSearching ? (
                                            <p className="px-3 py-6 text-sm text-muted-foreground text-center">Searching tutors...</p>
                                        ) : searchError ? (
                                            <p className="px-3 py-6 text-sm text-destructive text-center">{searchError}</p>
                                        ) : results.length > 0 ? (
                                            <ul className="space-y-1">
                                                {results.map((tutor) => (
                                                    <li key={tutor.id}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTutorRedirect(tutor.id)}
                                                            className="w-full rounded-lg px-3 py-2 text-left hover:bg-accent transition-colors"
                                                        >
                                                            <p className="text-sm font-semibold text-foreground">{tutor.user?.name}</p>
                                                            <p className="text-xs text-muted-foreground line-clamp-1">{tutor.title}</p>
                                                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                                                {tutor.categories?.map((item) => item.category.name).join(", ") || "No categories"}
                                                            </p>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="px-3 py-6 text-sm text-muted-foreground text-center">No tutors found</p>
                                        )}
                                    </div>

                                    {!!searchQuery.trim() && !isSearching && (
                                        <div className="border-t border-border p-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="w-full justify-center"
                                                onClick={() => {
                                                    setIsPopupOpen(false)
                                                    router.push(buildTutorsSearchUrl(searchQuery.trim()))
                                                }}
                                            >
                                                View all results for "{searchQuery.trim()}"
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Popular Subjects */}
                        <div className="flex flex-wrap items-center gap-3">
                            {popularSubjects.map((subject) => (
                                <button
                                    key={subject}
                                    className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted hover:border-primary/50 transition-all text-sm font-medium flex items-center gap-2 group"
                                    onClick={() => handleSubjectClick(subject)}
                                >
                                    {subject}
                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative hidden lg:block">
                        <div className="relative">
                            {/* Main Image Container with rounded blob shape */}
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-muted">
                                {/* Placeholder for tutor image - replace with actual image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <Users className="h-32 w-32 text-muted-foreground/20" />
                                </div>


                                <Image
                                    src="/banner.jpg"
                                    alt="Tutor teaching online"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Badge - Complete Sessions */}
                            <div className="absolute top-8 -left-4 bg-background border-2 border-border rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 animate-float">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Complete Sessions</p>
                                    <p className="text-xs text-muted-foreground">5,000+ Completed</p>
                                </div>
                            </div>

                            {/* Floating Badge - Active Students */}
                            <div className="absolute bottom-8 -right-4 bg-background border-2 border-border rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 animate-float animation-delay-500">
                                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Active Students</p>
                                    <p className="text-xs text-muted-foreground">10,000+ Learning</p>
                                </div>
                            </div>

                            {/* Floating Badge - Top Rated */}
                            <div className="absolute top-1/2 -right-6 bg-background border-2 border-border rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 animate-float animation-delay-1000">
                                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">4.9 Rating</p>
                                    <p className="text-xs text-muted-foreground">From Students</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
        </div>
    )
}