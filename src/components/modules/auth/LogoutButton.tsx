"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { authClient } from "@/lib/authClient"
import PrimaryButton from "@/components/ButtonPrimary"

const LogoutButton = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const handleLogout = async () => {
        setLoading(true)

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login")
                },
                onError: () => {
                    setLoading(false)
                },
            },
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Logout</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You’ll need to sign in again to
                        access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction

                        onClick={handleLogout}
                        disabled={loading}
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                        {loading ? "Logging out..." : "Yes, logout"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutButton
