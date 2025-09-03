"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema } from '@/types/form'
import { LoginFormTypes } from '@/types/form'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { EyeOff, Eye } from 'lucide-react'
import Logo from "@/public/sellerpintarweb-logo.svg"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormTypes>({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<LoginFormTypes> = async (data) => {
        const result = await signIn("credentials", {
            redirect: false,
            username: data.username,
            password: data.password
        });
        if (result?.error) {
            setError("root", {
                message: result.error
            })
        } else {
            router.push("/"); // redirect ke halaman setelah login
        }
    }

    return (
        <div className='login-page w-screen h-screen flex justify-center items-center bg-[#F3F4F6]'>
            <div className="login-container w-[400px] bg-white px-4 py-10 rounded-2xl flex flex-col gap-6">
                <Image width={134} height={24} src={Logo} alt='company-logo' className='mx-auto' />
                <form className="login-page-input" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <div className="grid gap-1">
                            <Label htmlFor='username' className='text-sm font-medium text-gray-900'>Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Input username"
                                required
                                className='border-slate-200 placeholder:text-slate-500 rounded-[6px]'
                                {...register("username")}
                            ></Input>
                            {errors.username && <p className="error-message text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor='password' className='text-sm font-medium text-gray-900'>Password</Label>
                            <div className="input-icon-wrapper relative">
                                <Input
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Input password"
                                    required
                                    className='border-slate-200 placeholder:text-slate-500 rounded-[6px]'
                                    {...register("password")}
                                >
                                </Input>
                                <div className="show-password-button cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    {
                                        isPasswordVisible ?
                                            <EyeOff className='size-4 text-slate-600 absolute top-1/2 right-3 -translate-y-1/2' />
                                            :
                                            <Eye className='size-4 text-slate-600 absolute top-1/2 right-3 -translate-y-1/2' />
                                    }
                                </div>
                            </div>
                            {errors.password && <p className="error-message text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>
                    <Button className='bg-blue-600 rounded-[6px] font-archivo text-sm py-2 w-full mt-6' type='submit' disabled={isSubmitting}>{isSubmitting ? "Processing" : "Login"}</Button>
                    {errors.root && <p className="error-message text-red-500 text-sm">{errors.root.message}</p>}
                </form>
                <div className="register-nav">
                    <p className='text-sm text-slate-600 text-center'>Don’t have an account? <Link href={"/register"} className='text-blue-600 underline'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Page
