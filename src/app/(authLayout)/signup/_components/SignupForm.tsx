
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
import SocialLogin from "./SocialLogin"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            // console.log("Submit Clicked", value)
            toast.promise(
                authClient.signUp.email(value),
                {
                    loading: "Creating user...",
                    success: (res) => {
                        if (res?.error) throw new Error(res.error.message)

                        router.push("/")
                        return "User created successfully. Check your email."
                    },
                    error: (err) => err.message || "Something went wrong",
                }
            )
        }
    })

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="signup-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit()
                    }}>
                    <FieldGroup>

                        {/* Name field */}
                        <form.Field name="name" children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Enter Your Name"
                                        aria-invalid={isInvalid}
                                    ></Input>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }} />

                        {/* Email Field */}
                        <form.Field name="email" children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        type="email"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Enter Your Email"
                                        aria-invalid={isInvalid}
                                    ></Input>
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
                                    <Input
                                        type="password"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Enter Your Password"
                                        aria-invalid={isInvalid}
                                    ></Input>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }} />

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2.5">
                <Button className="w-full" form="signup-form" type="submit">Register</Button>
                <SocialLogin></SocialLogin>
                <FieldDescription className="text-center">
                    Already registerd? <Link href="/login">Login</Link>
                </FieldDescription>
            </CardFooter>
        </Card>
    )
}