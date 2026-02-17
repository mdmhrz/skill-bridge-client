"use client";

import {
  Star,
  Clock,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
        <Card className="group py-0 relative h-full rounded-2xl border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">

          {/* ── Coloured left stripe ── */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-border group-hover:bg-primary transition-colors duration-300" />

          <CardContent className="pl-7 pr-5 py-5 flex flex-col gap-4 h-full">

            {/* ── TOP: Avatar + identity + rate ── */}
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11 rounded-xl">
                  <AvatarImage
                    src={tutor.user.image ?? undefined}
                    alt={tutor.user.name}
                  />
                  <AvatarFallback className="rounded-xl bg-muted font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {tutor.isVerified && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-1 ring-border">
                    <BadgeCheck className="h-3 w-3 text-primary" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate leading-snug group-hover:text-primary transition-colors duration-200">
                  {tutor.user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {tutor.title}
                </p>
              </div>

              {/* Rate pill */}
              <div className="shrink-0 rounded-lg bg-muted px-3 py-1.5 text-center">
                <p className="text-sm font-bold text-foreground leading-none">
                  ${tutor.hourlyRate}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">/ hr</p>
              </div>
            </div>

            {/* ── Category ── */}
            {firstCategory && (
              <Badge
                variant="outline"
                className="w-fit gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
              >
                <span aria-hidden>{firstCategory.icon}</span>
                {firstCategory.name}
              </Badge>
            )}

            {/* ── Bio ── */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {tutor.bio}
            </p>

            <Separator />

            {/* ── BOTTOM: three inline stats + caret ── */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary shrink-0" />
                  <span className="font-semibold text-foreground">
                    {displayRating ?? "New"}
                  </span>
                </div>

                {/* Divider dot */}
                <span className="h-1 w-1 rounded-full bg-border" aria-hidden />

                {/* Experience */}
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{experienceYrs} yrs</span>
                </div>

                {/* Divider dot */}
                <span className="h-1 w-1 rounded-full bg-border" aria-hidden />

                {/* Sessions */}
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{tutor._count.bookings}</span>
                </div>
              </div>

              {/* Animated caret */}
              <motion.div
                className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
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