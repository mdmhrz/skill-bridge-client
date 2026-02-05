import { TutorCard } from "@/components/modules/tutor/TutorCard"
import TutorFilters from "@/components/modules/tutor/TutorFilters"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import tutorServices from "@/services/tutor.service"
import { Tutor } from "@/types"
// import { div } from "framer-motion/client"




export default async function TutorsPage() {
    const { data, error } = await tutorServices.getTutors()

    if (error) {
        return (
            <div className="text-center text-muted-foreground">
                Failed to load tutors
            </div>
        )
    }



    return (
        <div className="container px-6 mx-auto">


            <div className="flex gap-6 h-[calc(100vh-84px)]">
                {/* Sidebar */}
                <aside className="hidden md:flex w-72 flex-col border-r bg-accent rounded-lg">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Filters</h2>
                    </div>

                    <Separator />

                    <ScrollArea className="flex-1 p-4">
                        <TutorFilters />
                    </ScrollArea>
                </aside>

                {/* Main content */}
                <main className="flex-1 py-6">
                    <div className="h-full flex flex-col gap-4 container">
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold">Find Tutors</h1>
                            <p className="text-muted-foreground">
                                Learn from verified and experienced tutors
                            </p>
                        </div>
                        <section className="container flex-1 overflow-y-auto no-scrollbar">


                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {data.data?.map((tutor: Tutor) => (
                                    <TutorCard key={tutor.id} tutor={tutor} />
                                ))}
                            </div>
                        </section>

                    </div>
                </main>
            </div>

        </div>
    )
}
