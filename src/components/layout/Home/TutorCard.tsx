"use client";

import {
  Star,
  Clock,
  BadgeCheck,
  ChevronRight,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TutorProfile } from "@/types/featured-tutors.tytpe";
import { getInitials } from "@/lib/utils/geInitials";
import { itemVariants } from "./FeaturedTutors";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const initials = getInitials(tutor.user.name);
  const rating = parseFloat(tutor.rating) || 0;
  const displayRating = rating > 0 ? rating.toFixed(1) : null;
  const firstCategory = tutor.categories[0]?.category;
  const experienceYrs =
    tutor.experience >= 1900
      ? new Date().getFullYear() - tutor.experience
      : tutor.experience;

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link
        href={`/tutors/${tutor.id}`}
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="group h-full rounded-2xl border bg-card py-0 transition-shadow duration-200 hover:shadow-md">
          <CardContent className="flex h-full flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <Avatar className="h-12 w-12 border bg-muted">
                    <AvatarImage
                      src={tutor.user.image ?? undefined}
                      alt={tutor.user.name}
                    />
                    <AvatarFallback className="font-semibold text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  {tutor.isVerified && (
                    <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border bg-background">
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 space-y-1">
                  <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {tutor.user.name}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {tutor.title}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-foreground">${tutor.hourlyRate}</p>
                <p className="text-[10px] text-muted-foreground">per hour</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {firstCategory ? (
                <Badge variant="outline" className="max-w-full gap-1 truncate">
                  <span aria-hidden>{firstCategory.icon}</span>
                  <span className="truncate">{firstCategory.name}</span>
                </Badge>
              ) : (
                <Badge variant="outline">General Tutor</Badge>
              )}
            </div>

            <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {tutor.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground">{displayRating ?? "New"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{experienceYrs} yrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{tutor._count.bookings} bookings</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-sm">
              <span className="font-medium text-foreground">View profile</span>
              <motion.div
                className="text-muted-foreground transition-colors group-hover:text-primary"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}