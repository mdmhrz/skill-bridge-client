import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, MapPin, Phone, Send, Users } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Hero */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Get in Touch
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              We're Here to Help
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Have a question about tutoring, becoming a tutor, or anything else? Reach out — our team usually responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
                <p className="mt-3 text-muted-foreground">
                  Choose the option that works best for you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Best for general questions and support
                    </p>
                    <a
                      href="mailto:support@skillbridge.com"
                      className="mt-1.5 inline-block text-primary hover:underline"
                    >
                      support@skillbridge.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tutor & Student Support</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      For account, booking or payment issues
                    </p>
                    <Link
                      href="/help"
                      className="mt-1.5 inline-block text-primary hover:underline"
                    >
                      Visit Help Center →
                    </Link>
                  </div>
                </div>

                {/* Optional: Add phone or address if applicable */}
                {/* <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon–Fri, 9 AM – 6 PM (UTC+6)
                    </p>
                    <a
                      href="tel:+8801234567890"
                      className="mt-1.5 inline-block text-primary hover:underline"
                    >
                      +880 123 456 7890
                    </a>
                  </div>
                </div> */}

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dhaka, Bangladesh (remote-first team)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-3 border-border bg-card shadow-sm">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g. Question about tutor booking"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you today?"
                      className="min-h-[140px]"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optional small CTA / reassurance */}
      <section className="py-16 md:py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Prefer a quicker way?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Check our <Link href="/faq" className="text-primary hover:underline">FAQ</Link> or join our community discussions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;