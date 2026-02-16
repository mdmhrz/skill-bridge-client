import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Target, Heart, CheckCircle2, GraduationCap, Lightbulb, Star } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero / Introduction */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              About Skill Bridge
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Personalized Learning, Made Simple
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Skill Bridge connects curious learners with knowledgeable tutors in a space built around understanding, flexibility, and real progress — one meaningful session at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Our Purpose / Mission */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why We Exist
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Education should not be one-size-fits-all. We created Skill Bridge to remove barriers and bring high-quality, human-centered guidance to anyone who wants to grow — regardless of location, schedule, or starting point.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card className="border border-border bg-card shadow-sm hover:shadow transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                A world where every learner has access to the exact guidance they need to unlock their potential.
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm hover:shadow transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Empathy • Quality • Accessibility • Authentic connection in every interaction.
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm hover:shadow transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Promise</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Long-term relationships that inspire confidence, curiosity, and lasting change.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Skill Bridge Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A clear, human-centered process — designed for both learners and teachers.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">For Learners</h3>
              </div>
              <div className="space-y-6 pl-4 border-l-2 border-primary/30">
                {[
                  { icon: CheckCircle2, title: "Find the Right Match", desc: "Browse tutors by subject, teaching style, experience, and availability." },
                  { icon: CheckCircle2, title: "Schedule with Ease", desc: "Book sessions that fit your life — no rigid schedules." },
                  { icon: CheckCircle2, title: "Learn & Evolve", desc: "Get personalized support, feedback, and visible progress." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <item.icon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">For Tutors</h3>
              </div>
              <div className="space-y-6 pl-4 border-l-2 border-primary/30">
                {[
                  { icon: CheckCircle2, title: "Showcase Your Expertise", desc: "Create a profile that reflects your knowledge and teaching personality." },
                  { icon: CheckCircle2, title: "Set Your Terms", desc: "Choose your rates, hours, subjects, and session format." },
                  { icon: CheckCircle2, title: "Teach & Impact", desc: "Connect with motivated students and build a rewarding practice." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <item.icon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Growing Community
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real people creating real progress — together.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            <div>
              <p className="text-4xl font-bold text-primary">1,000+</p>
              <p className="mt-2 text-sm text-muted-foreground">Expert Tutors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">5,000+</p>
              <p className="mt-2 text-sm text-muted-foreground">Active Learners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">10,000+</p>
              <p className="mt-2 text-sm text-muted-foreground">Sessions Completed</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-4xl font-bold text-primary">4.8</p>
                <Star className="h-6 w-6 text-primary fill-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Begin?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Whether you're eager to learn something new or passionate about sharing what you know — Skill Bridge is here to help you connect.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/tutors">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Tutors
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/become-tutor">
                Become a Tutor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;