"use client"
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { register as registerAccount } from '@/services/auth'

import { registerSchema } from '@/types/form'
import { RegsiterFormTypes } from "@/types/form"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'

import { EyeOff, Eye } from 'lucide-react'

import Logo from "@/public/sellerpintarweb-logo.svg"

const Page = () => {

    const router = useRouter()
    const dialogTrigger = useRef<HTMLButtonElement>(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegsiterFormTypes>({
        defaultValues: {
            username: "",
            password: "",
            role: "User"
        },
        resolver: zodResolver(registerSchema)
    })

    const onSubmit: SubmitHandler<RegsiterFormTypes> = async (data) => {
        const res = await registerAccount(data);
        if (res.error) {
            setError("root", { message: res.error })
        } else {
            dialogTrigger.current && dialogTrigger.current.click();
        }
    }

    return (
        <div className='register-page w-screen h-screen flex justify-center items-center bg-[#F3F4F6]'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button ref={dialogTrigger} className='hidden'>Click</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Regsiter Succeed</DialogTitle>
                        <DialogDescription>
                            Press button below to login
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className='py-2 px-4 rounded-[6px] bg-blue-600 cursor-pointer' onClick={() => { router.push("/login") }}>Go to Login Page</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="register-container w-[400px] bg-white px-4 py-10 rounded-2xl flex flex-col gap-6">
                <Image width={134} height={24} src={Logo} alt='company-logo' className='mx-auto' />
                <form className="register-page-input" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <div className="grid gap-1">
                            <Label htmlFor='username' className='text-sm font-medium text-gray-900'>Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Input username"

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
                        <div className="grid gap-1">
                            <Label className='text-sm font-medium text-gray-900'>Role</Label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full border-slate-200 rounded-[6px]">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Role</SelectLabel>
                                                <SelectItem value="User">User</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && <p className="error-message text-red-500 text-sm">{errors.role.message}</p>}
                        </div>
                    </div>
                    <Button type='submit' className='bg-blue-600 rounded-[6px] font-archivo text-sm py-2 mt-6 w-full'>{isSubmitting ? "Processing" : "Register"}</Button>
                    {errors.root && <p className="error-message text-red-500 text-sm">{errors.root.message}</p>}
                </form>
                <div className="register-nav">
                    <p className='text-sm text-slate-600 text-center'>Already have an account? <Link href={"/login"} className='text-blue-600 underline'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Page
