import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconSearchOff } from '@tabler/icons-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-border shadow-lg">
                <CardContent className="pt-12 pb-8 px-6 text-center">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">

                            <IconSearchOff size={96} stroke={1.5} />
                        </div>
                    </div>

                    {/* Error Code */}
                    <div className="mb-2">
                        <h1 className="text-6xl font-bold text-foreground">404</h1>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-foreground mb-3">
                        Page Not Found
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Please check the URL or return to the homepage.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                            <Link href="/">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg>
                                Back to Home
                            </Link>
                        </Button>
                        <Button className="w-full sm:w-auto" asChild>
                            <Link href="/contact">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 9h8" />
                                    <path d="M8 13h6" />
                                    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                                </svg>
                                Contact Support
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}