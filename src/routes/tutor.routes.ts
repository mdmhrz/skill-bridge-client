import { NavigationItem } from "@/types/userRoute.type";
import {
    LayoutDashboard,
    CalendarClock,
    User,
} from "lucide-react";

const tutorRoutes: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/tutor-dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Availability",
        href: "/tutor-dashboard/availability",
        icon: CalendarClock,
    },
    {
        name: "Profile",
        href: "/tutor-dashboard/profile",
        icon: User,
    },
];



export default tutorRoutes
