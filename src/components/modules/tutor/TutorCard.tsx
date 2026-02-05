
import { Tutor } from "@/types"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TutorCardProps {
    tutor: Tutor
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">
                    {tutor.user.name}
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    {tutor.title}
                </p>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="text-sm line-clamp-3">
                    {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tutor.categories.map((item) => (
                        <Badge key={item.id} variant="secondary">
                            {item.category.icon} {item.category.name}
                        </Badge>
                    ))}
                </div>

                <div className="text-sm text-muted-foreground">
                    Experience: {tutor.experience} years
                </div>

                <div className="text-sm font-medium">
                    ${tutor.hourlyRate} / hour
                </div>
            </CardContent>

            <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                    <Link href={`/tutors/${tutor.id}`}>
                        View Profile
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
