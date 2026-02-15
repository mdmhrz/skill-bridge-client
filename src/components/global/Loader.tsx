"use client";

import { Loader2 } from "lucide-react";

interface LoaderProps {
    text?: string;
}

const Loader = ({ text = "Please wait..." }: LoaderProps) => {
    return (
        <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {text}
        </span>
    );
};

export default Loader;
