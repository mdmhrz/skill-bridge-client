import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { authClient } from '@/lib/authClient';

import Image from 'next/image';


const SocialLogin = () => {
    const handleGoogleLogin = () => {
        window.location.href =
            "https://skill-bridge-backend-server.vercel.app/api/auth/sign-in/social?provider=google&callbackURL=https://skill-bridge-client-server.vercel.app";
    };

    return (
        <div className="w-full space-y-4 mt-2">
            {/* OR Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase">
                    or
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google Button */}
            <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="w-full flex items-center gap-2 py-5.5"
            >
                <Image priority src="/google_logo.svg" alt="google" width={20} height={20} />
                <span>Continue with Google</span>
            </Button>
        </div>
    );
};

export default SocialLogin;