// components/HowItWorks.tsx
import React from 'react';
import { UserPlus, Search, CalendarCheck, Video } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Register',
    description: 'Create your free account in seconds and set up your learning profile.',
    icon: UserPlus,
  },
  {
    number: 2,
    title: 'Find Your Tutor',
    description: 'Browse expert tutors, read reviews, check availability and teaching style.',
    icon: Search,
  },
  {
    number: 3,
    title: 'Book Session',
    description: 'Choose convenient time slot and instantly confirm your lesson.',
    icon: CalendarCheck,
  },
  {
    number: 4,
    title: 'Start Learning',
    description: 'Join your live personalized session and begin improving right away.',
    icon: Video,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-muted-foreground/5 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just a few simple steps and begin your personalized learning journey.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Curved connecting line (background path) */}
          <div className="absolute inset-0 top-1/2 h-1 hidden md:block">
            <svg
              className="w-full h-24"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M100,50 C300,10 500,90 700,50 C900,10 1100,90 1200,50"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="3"
                strokeDasharray="8 6"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center shadow-sm transition-all duration-300 hover:border-primary/60 hover:shadow-md group">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <step.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                    </div>

                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-semibold mb-2.5 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Optional small footer text */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to begin? <span className="text-primary font-medium">Sign up free today</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;