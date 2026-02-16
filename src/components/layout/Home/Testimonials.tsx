'use client'
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, ArrowUpRight, Sparkles } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  location: string;
  achievement: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Medical Student',
    content: 'The platform transformed how I study. My tutor adapted to my learning style perfectly, and my grades have never been better.',
    rating: 5,
    location: 'New York',
    achievement: '+42% improvement',
    color: 'from-primary/10 to-primary/5'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'High School Junior',
    content: 'I was struggling with calculus until I found this platform. The step-by-step guidance helped me actually understand math.',
    rating: 5,
    location: 'Toronto',
    achievement: 'D to A in 3 months',
    color: 'from-primary/5 to-transparent'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Language Learner',
    content: 'Learning Spanish became an exciting journey. The interactive sessions made me confident in speaking within just 3 months.',
    rating: 5,
    location: 'Miami',
    achievement: 'Fluent in 90 days',
    color: 'from-primary/15 to-primary/5'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'College Freshman',
    content: 'The personalized attention fit perfectly with my busy college life. Study strategies that changed everything.',
    rating: 5,
    location: 'Seoul',
    achievement: '4.0 GPA achieved',
    color: 'from-primary/8 to-transparent'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'MBA Candidate',
    content: 'Business tutoring helped me excel in my MBA program. Expert guidance exactly when I needed it most.',
    rating: 5,
    location: 'London',
    achievement: 'Top 5% ranking',
    color: 'from-primary/12 to-primary/3'
  },
  {
    id: 6,
    name: 'James Miller',
    role: 'Engineering Student',
    content: 'Complex physics concepts finally clicked. My tutor made difficult topics accessible and genuinely interesting.',
    rating: 5,
    location: 'Boston',
    achievement: 'A+ final grade',
    color: 'from-primary/6 to-transparent'
  }
];

const FloatingCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      <div className={`
        h-full rounded-3xl border bg-gradient-to-br ${testimonial.color}
        p-8 backdrop-blur-sm transition-all duration-500
        hover:shadow-2xl hover:border-primary/40
      `}>
        {/* Floating gradient orb */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: isHovered ? 1.2 : 0.8,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Header with avatar and rating */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-lg border border-primary/20"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </motion.div>
            <div>
              <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>

          <motion.div 
            className="flex gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.4 + i * 0.05,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                <Star className="h-4 w-4 fill-primary text-primary" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote */}
        <blockquote className="relative z-10 text-foreground/90 leading-relaxed mb-6 text-base">
          <span className="text-4xl text-primary/20 absolute -top-2 -left-1">"</span>
          <p className="pl-6">{testimonial.content}</p>
        </blockquote>

        {/* Achievement badge */}
        <motion.div
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-4"
          whileHover={{ scale: 1.05, x: 5 }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">{testimonial.achievement}</span>
        </motion.div>

        {/* Location */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{testimonial.location}</span>
          
          <motion.div
            className="opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
        />
      </div>
    </motion.div>
  );
};

const AnimatedTestimonials = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-background">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.15), transparent 50%)`,
        }}
      />

      <div className="absolute inset-0 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 3,
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-sm font-semibold tracking-wide">STUDENT TESTIMONIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl  font-semibold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              Success Stories
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real transformations from students who discovered their potential
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <FloatingCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl border bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm"
        >
          {[
            { label: 'Happy Students', value: '10,000+' },
            { label: 'Average Rating', value: '4.9/5' },
            { label: 'Subjects Covered', value: '50+' },
            { label: 'Success Rate', value: '98%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                className="text-4xl font-bold text-foreground mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Sora', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default AnimatedTestimonials;