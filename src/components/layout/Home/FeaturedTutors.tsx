"use client";

import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TutorCard from "./TutorCard";
import { TutorProfile } from "@/types/featured-tutors.tytpe";


interface FeaturedTutorsProps {
  tutors: TutorProfile[];
}


//Animation Variants 
const sharedTransition: Transition = {
  duration: 0.5,
  ease: "easeOut",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sharedTransition,
  },
};





export default function FeaturedTutors({ tutors }: FeaturedTutorsProps) {
  const displayed = tutors.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Ambient top glow — uses only CSS variables */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--primary) / 0.06), transparent)",
        }}
      />

      <div className="container relative mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-3">
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
              >
                <motion.span
                  className="flex"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </motion.span>
                Featured Tutors
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
            >
              Learn from the{" "}
              <span className="text-primary">very best</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-base text-muted-foreground"
            >
              Hand-picked tutors across every subject — verified, rated, and
              ready to help you succeed.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="shrink-0">
            <Button variant="outline" asChild className="gap-2 rounded-xl">
              <Link href="/tutors">
                View all tutors
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayed.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 px-8 py-7 sm:flex-row sm:justify-between"
        >
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Can't find the right match?{" "}
            <span className="font-semibold text-foreground">500+ experts</span>{" "}
            are waiting across every subject.
          </p>
          <Button asChild className="shrink-0 gap-2 rounded-xl">
            <Link href="/tutors">
              Browse all tutors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}