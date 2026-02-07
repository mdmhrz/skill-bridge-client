import { NavigationItem } from "@/types/userRoute.type";
import {
    LayoutDashboard,
    User,
    Calendar,
} from "lucide-react";

const studentRoutes: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        name: "Bookings",
        href: "/dashboard/bookings",
        icon: Calendar,
    },
];


export default studentRoutes
