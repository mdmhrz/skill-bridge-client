import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { authClient } from '@/lib/authClient';

import { IconBrandGoogleFilled } from '@tabler/icons-react';


const SocialLogin = () => {
    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: env.NEXT_PUBLIC_FRONTEND_BASE_URL,
        });
        console.log("Google login response:", data);
    };

    return (
        <div className="w-full space-y-4">
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
                className="w-full flex items-center gap-2"
            >
                <IconBrandGoogleFilled stroke={2} />
                <span>Continue with Google</span>
            </Button>
        </div>
    );
};

export default SocialLogin;