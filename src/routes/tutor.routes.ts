import { NavigationItem } from "@/types/userRoute.type";
import {
    LayoutDashboard,
    CalendarClock,
    User,
} from "lucide-react";

 const tutorRoutes: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard/tutor-dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Availability",
        href: "/dashboard/availability",
        icon: CalendarClock,
    },
    {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];



export default tutorRoutes
