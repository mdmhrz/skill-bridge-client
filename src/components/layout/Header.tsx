'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ModeToggle } from './ModeToggle';
import { authClient } from '@/lib/authClient';
import PrimaryButton from '../ButtonPrimary';
import LogoutButton from '../modules/auth/LogoutButton';
import { AuthUser } from '@/types';
import { userService } from '@/services/user.service';
import Logo from '../global/Logo';

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  // { name: 'Features', href: '/features' },
  {
    name: 'Tutors',
    href: '/tutors',
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header({ user }: { user: AuthUser | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [themeFromStorage, setThemeFromStorage] = useState<string>('light');

  console.log("User data found", user)




  // read theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeFromStorage(savedTheme);

    // listen to localStorage changes from ModeToggle or elsewhere
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') setThemeFromStorage(e.newValue || 'light');
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isScrolled]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundStyle = {
    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
    backgroundColor: isScrolled
      ? themeFromStorage === 'dark'
        ? 'rgba(0,0,0,0.8)'
        : 'rgba(255,255,255,0.8)'
      : 'transparent',
    boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.1)' : 'none',
    transition: 'all 0.3s ease-in-out',
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };



  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={backgroundStyle}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link
              prefetch={false}
              href="/"
              className="flex items-center space-x-2"
            >
             <Logo></Logo>
            </Link>
          </motion.div>

          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
              >
                <Link
                  prefetch={false}
                  href={item.href}
                  className="text-foreground flex items-center space-x-1 font-medium transition-colors duration-200 hover:text-rose-500"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden items-center space-x-4 lg:flex">
            <ModeToggle></ModeToggle>
            <>
              {user ? (
                <LogoutButton></LogoutButton>
              ) :
                <Link
                  prefetch={false}
                  href="/login"
                  className="text-foreground font-medium transition-colors duration-200 hover:text-rose-500"
                >
                  <PrimaryButton className='text-white'>Log In</PrimaryButton>
                </Link>
              }
            </>
            {
              user &&
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  prefetch={false}
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-6 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            }
          </div>

          <div className='lg:hidden flex items-center gap-2'>
            <ModeToggle></ModeToggle>
            <motion.button
              className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 "
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>

        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg">
                {navItems.map((item) => (
                  <Link
                    prefetch={false}
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="space-y-2 px-4 py-2">

                  <>
                    {user ? (
                      <LogoutButton className='w-full mb-4' ></LogoutButton>
                    ) :
                      <Link
                        prefetch={false}
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-foreground font-medium transition-colors duration-200 hover:text-rose-500"
                      >
                        <PrimaryButton className='w-full py-6 text-white' >Log In</PrimaryButton>
                      </Link>
                    }
                  </>

                  {user &&
                    <Link
                      prefetch={false}
                      href="/dashboard"
                      className="block w-full rounded-lg bg-gradient-to-r from-rose-500 to-rose-700 py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
