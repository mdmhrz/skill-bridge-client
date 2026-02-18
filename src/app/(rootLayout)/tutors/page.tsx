import { NothingFound } from "@/components/global/NothingFound"
import { PaginationControl } from "@/components/global/PaginationControl"
import { TutorCard } from "@/components/modules/tutor/TutorCard"
import TutorFilters from "@/components/modules/tutor/TutorFilters"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import tutorServices from "@/services/tutor.service"
import { Tutor } from "@/types"



export default async function TutorsPage(
    { searchParams }: {
        searchParams:
        Promise<{
            page: number;
            limit?: number;
            search?: string;
            sortBy?: string;
            sortOrder?: string;
            experience?: number
        }>
    }) {
    const { page, limit, search, sortBy, sortOrder, experience } = await searchParams;


    const { data, error } = await tutorServices.getTutors({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        experience
    })

    if (error) {
        return (
            <div className="text-center text-muted-foreground">
                Failed to load tutors
            </div>
        )
    }

    console.log(data, 'data')


    return (
        <div className="container px-6 mx-auto">


            <div className="flex flex-col gap-6 md:flex-row md:h-[calc(100vh-84px)]">
                {/* Sidebar */}
                <aside className="w-full md:flex md:w-72 md:pb-6">
                    <TutorFilters />
                </aside>

                {/* Main content */}
                <main className="flex-1 pb-6 md:py-6">
                    <div className="flex h-full flex-col gap-4 container">
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold">Find Tutors</h1>
                            <p className="text-muted-foreground">
                                Learn from verified and experienced tutors
                            </p>
                        </div>
                        <section className="container flex-1 overflow-y-auto no-scrollbar">


                            {data.data.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {data.data.map((tutor: Tutor) => (
                                        <TutorCard key={tutor.id} tutor={tutor} />
                                    ))}
                                </div>
                            ) : (
                                <NothingFound
                                    title="No tutors found"
                                    description="We couldn’t find any tutors matching your filters. Try changing search terms or experience level."
                                    actionLabel="Clear filters"
                                    className="h-full"
                                />
                            )}
                        </section>

                        {/* Pagination control */}
                        {data.meta.totalPages > 1 && data.meta.total > 0 && data.meta.limit > 0 &&
                            <PaginationControl meta={data.meta}></PaginationControl>}

                    </div>
                </main>
            </div>

        </div>
    )
}
