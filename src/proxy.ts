import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Get user session
    const { data } = await userService.getSession();
    const user = data?.user;

    const isAuthenticated = !!user;
    const isAdmin = user?.role === Roles.admin;
    const isTutor = user?.role === Roles.tutor;
    const isStudent = user?.role === Roles.student;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin routes
    if (pathname.startsWith('/admin-dashboard')) {
        if (!isAdmin) {
            const redirectTo = isTutor ? '/tutor-dashboard' : '/dashboard';
            return NextResponse.redirect(new URL(redirectTo, request.url));
        }
        return NextResponse.next();
    }

    // Tutor routes
    if (pathname.startsWith('/tutor-dashboard')) {
        if (!isTutor) {
            const redirectTo = isAdmin ? '/admin-dashboard' : '/dashboard';
            return NextResponse.redirect(new URL(redirectTo, request.url));
        }
        return NextResponse.next();
    }

    // Student routes
    if (pathname.startsWith('/dashboard')) {
        if (!isStudent) {
            const redirectTo = isAdmin ? '/admin-dashboard' : '/tutor-dashboard';
            return NextResponse.redirect(new URL(redirectTo, request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin-dashboard/:path*',
        '/tutor-dashboard/:path*',
    ]
};