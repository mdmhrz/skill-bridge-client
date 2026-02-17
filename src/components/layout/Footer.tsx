// 'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Send
} from "lucide-react"
import Logo from "../global/Logo"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        students: [
            { label: "Find Tutors", href: "/find-tutors" },
            { label: "Browse Subjects", href: "/subjects" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Pricing", href: "/pricing" },
            { label: "Success Stories", href: "/testimonials" }
        ],
        tutors: [
            { label: "Become a Tutor", href: "/become-tutor" },
            { label: "Tutor Resources", href: "/resources" },
            { label: "Tutor Guidelines", href: "/guidelines" },
            { label: "Earnings", href: "/earnings" },
            { label: "Support", href: "/support" }
        ],
        company: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" },
            { label: "Press", href: "/press" },
            { label: "Contact", href: "/contact" }
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Refund Policy", href: "/refund" }
        ]
    }

    const socialLinks = [
        { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
    ]

    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <Link href="/" className="inline-block">
                                <Logo></Logo>
                            </Link>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                                Connecting students with expert tutors for personalized online learning.
                                Bridge the gap to your success with quality education.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-2 pt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>support@skillbridge.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>123 Learning St, Education City</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* For Students */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">For Students</h4>
                            <ul className="space-y-3">
                                {footerLinks.students.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Tutors */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">For Tutors</h4>
                            <ul className="space-y-3">
                                {footerLinks.tutors.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>



                {/* Bottom Bar */}
                <div className="border-t border-border py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© {currentYear} Skill Bridge. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                Terms
                            </Link>
                            <Link href="/sitemap" className="hover:text-primary transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}