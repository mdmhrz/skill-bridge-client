
'use client'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import Link from "next/link"
import { authClient } from "@/lib/authClient"

import { redirect } from "next/navigation"
import { IconEye, IconEyeOff, IconLock, IconMail, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import PrimaryButton from "@/components/ButtonPrimary"
import SocialLogin from "../../signup/_components/SocialLogin"

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            // console.log("Submit Clicked", value)
            toast.promise(
                authClient.signIn.email(value),
                {
                    loading: "Signing In...",
                    success: (res) => {
                        if (res?.error) throw new Error(res.error.message)

                        router.push("/")
                        return "Signed In successfully"
                    },
                    error: (err) => err.message || "Something went wrong",
                }
            )
        }
    })

    return (
        <Card className="border-none bg-transparent shadow-none " {...props}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
                <CardDescription>
                    Enter your credentials to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="signup-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit()
                    }}>
                    <FieldGroup className="gap-5">

                        {/* Email Field */}
                        <form.Field name="email" children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <div

                                        className="
                                            flex items-center gap-4
                                            border px-4 py-1 rounded-md
                                            focus-within:ring-1
                                            focus-within:ring-primary
                                            focus-within:ring-offset-1
                                            data-[invalid=true]:border-destructive
                                            "
                                    >
                                        <IconMail className="text-muted-foreground" />

                                        <Input
                                            aria-invalid={isInvalid}
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Enter Your Email"
                                            className="
                                                flex-1
                                                border-0
                                                bg-transparent
                                                dark:bg-transparent
                                                shadow-none
                                                focus-visible:ring-0
                                                focus-visible:ring-offset-0
                                                focus:outline-none
                                                px-0
                                                placeholder:text-muted-foreground
                                            "
                                        />
                                    </div>

                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>

                            )
                        }} />


                        {/* Password Field */}
                        <form.Field name="password" children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                                    <div
                                        className="
                                            flex items-center gap-4
                                            border px-4 py-1 rounded-md
                                            focus-within:ring-1
                                            focus-within:ring-primary
                                            focus-within:ring-offset-1
                                            data-[invalid=true]:border-destructive
                                            "
                                    >
                                        <IconLock className="text-muted-foreground" />

                                        <Input
                                            aria-invalid={isInvalid}
                                            type={showPassword ? "text" : "password"}
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Enter Your Password"
                                            className="
                                                flex-1
                                                border-0
                                                bg-transparent
                                                dark:bg-transparent
                                                shadow-none
                                                focus-visible:ring-0
                                                focus-visible:ring-offset-0
                                                focus:outline-none
                                                px-0
                                                placeholder:text-muted-foreground
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-muted-foreground hover:text-primary transition"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                        </button>
                                    </div>

                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>

                            )
                        }} />

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2.5">
                <PrimaryButton className="w-full py-6 " form="signup-form" type="submit">Register</PrimaryButton>
                <SocialLogin></SocialLogin>
                <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link className="text-primary" href="/signup">Register</Link>
                </FieldDescription>
            </CardFooter>
        </Card>
    )
}