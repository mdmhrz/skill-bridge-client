import { NavigationItem } from "@/types/userRoute.type";
import {
    LayoutDashboard,
    Users,
    UserCog,
    CalendarCheck,
    Layers,
} from "lucide-react";

const adminRoutes: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "All Tutors",
        href: "/admin-dashboard/tutors",
        icon: Users,
    },
    {
        name: "Users",
        href: "/admin-dashboard/all-users",
        icon: UserCog, // better than BookOpen
    },
    {
        name: "Bookings",
        href: "/admin-dashboard/bookings",
        icon: CalendarCheck,
    },
    {
        name: "Categories",
        href: "/admin-dashboard/categories",
        icon: Layers,
    },
];


export default adminRoutes
