'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Search, Zap, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How does Skill Bridge match me with a tutor?',
    answer: 'Our intelligent matching system analyzes your learning goals, subject requirements, schedule preferences, and learning style. We then connect you with tutors who specialize in your needs and have proven track records of success. You can review tutor profiles, read reviews, and even schedule a free consultation before committing.',
    category: 'Getting Started'
  },
  {
    id: 2,
    question: 'What subjects and levels do you support?',
    answer: 'We support over 50+ subjects across all academic levels - from elementary school to graduate programs. This includes math, sciences, languages, test prep (SAT, ACT, GRE, GMAT), programming, business, and more. Our tutors are qualified to teach everything from basic algebra to advanced quantum physics.',
    category: 'Getting Started'
  },
  {
    id: 3,
    question: 'Can I change my tutor if needed?',
    answer: 'Absolutely! We want you to have the perfect learning experience. If you feel your current tutor isn\'t the right fit, you can request a new match at any time at no additional cost. Your satisfaction and learning progress are our top priorities.',
    category: 'Getting Started'
  },
  {
    id: 4,
    question: 'How much does tutoring cost?',
    answer: 'Pricing varies based on subject complexity, tutor experience, and session length. Most sessions range from $30-80 per hour. We offer flexible packages: pay-as-you-go, monthly subscriptions, and bulk session discounts. Your first consultation is always free to ensure the right fit.',
    category: 'Pricing'
  },
  {
    id: 5,
    question: 'Do you offer refunds or satisfaction guarantees?',
    answer: 'Yes! We offer a 100% satisfaction guarantee on your first session. If you\'re not completely satisfied, we\'ll refund your payment in full. For ongoing sessions, if you\'re unhappy with your tutor, we\'ll either match you with a new one or provide a prorated refund for unused sessions.',
    category: 'Pricing'
  },
  {
    id: 6,
    question: 'How flexible is the scheduling?',
    answer: 'Extremely flexible! Our tutors are available 7 days a week, with many offering early morning, evening, and weekend slots. You can schedule sessions as far in advance or as last-minute as needed (subject to tutor availability). Rescheduling is easy through our platform with at least 24 hours notice.',
    category: 'Sessions'
  },
  {
    id: 7,
    question: 'Are sessions online or in-person?',
    answer: 'We primarily offer online sessions through our interactive virtual classroom with video, screen sharing, and a digital whiteboard. This allows you to learn from anywhere and gives you access to the best tutors regardless of location. Some tutors may offer in-person sessions in select cities.',
    category: 'Sessions'
  },
  {
    id: 8,
    question: 'What technology do I need for online sessions?',
    answer: 'You just need a computer or tablet with a stable internet connection, webcam, and microphone. Our platform works on any modern browser - no downloads required. We also have mobile apps for iOS and Android. We recommend headphones for better audio quality during sessions.',
    category: 'Technical'
  },
  {
    id: 9,
    question: 'How do I track my progress?',
    answer: 'Our platform includes a comprehensive progress dashboard where you can view session summaries, track goals, see improvement metrics, and access session recordings. Your tutor provides detailed notes after each session, and you\'ll receive regular progress reports showing your advancement.',
    category: 'Learning'
  },
  {
    id: 10,
    question: 'Can parents monitor their child\'s sessions?',
    answer: 'Yes! Parents have access to a parent dashboard where they can view upcoming sessions, review progress reports, read tutor notes, and even join sessions as observers. We send regular updates via email about your child\'s learning journey and achievements.',
    category: 'Learning'
  }
];

const categories = ['All', 'Getting Started', 'Pricing', 'Sessions', 'Technical', 'Learning'];

const FAQItem = ({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <motion.button
        onClick={onClick}
        className={`
          w-full text-left p-6 rounded-2xl border transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 shadow-lg' 
            : 'bg-background/50 border-border hover:border-primary/20 hover:bg-muted/30'
          }
        `}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <motion.h3 
              className="text-lg font-semibold text-foreground mb-1 pr-4"
              layout="position"
            >
              {faq.question}
            </motion.h3>
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {faq.category}
            </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`
              flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center
              ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}
              transition-colors duration-300
            `}
          >
            {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <motion.p 
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                className="text-foreground/80 leading-relaxed"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-muted-foreground/5">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 ">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold tracking-wide">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/60">
              Common Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Everything you need to know about Skill Bridge. Can't find what you're looking for? Contact our support team.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </motion.div>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 "
        >
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">No questions found matching your search.</p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-10 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Zap className="h-12 w-12 text-primary" />
            </motion.div>

            <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is here to help you 24/7. Get in touch and we'll respond within minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;