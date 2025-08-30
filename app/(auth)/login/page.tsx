"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeOff, Eye } from 'lucide-react'

import Logo from "@/public/sellerpintarweb-logo.svg"

const page = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
    return (
        <div className='login-page w-screen h-screen flex justify-center items-center bg-[#F3F4F6]'>
            <div className="login-container w-[400px] bg-white px-4 py-10 rounded-2xl flex flex-col gap-6">
                <Image width={134} height={24} src={Logo} alt='company-logo' className='mx-auto' />
                <form action="" className="login-page-input">
                    <div className="flex flex-col gap-3">
                        <div className="grid gap-1">
                            <Label htmlFor='username' className='text-sm font-medium text-gray-900'>Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Input username"
                                required
                                className='border-slate-200 placeholder:text-slate-500 rounded-[6px]'
                            ></Input>
                            <p className="error-message text-red-500 text-sm">Error message for username</p>
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
                            <p className="error-message text-red-500 text-sm">Error message for password</p>
                        </div>
                    </div>
                </form>
                <Button className='bg-blue-600 rounded-[6px] font-archivo text-sm py-2'>Login</Button>
                <div className="register-nav">
                    <p className='text-sm text-slate-600 text-center'>Don’t have an account? <Link href={"/register"} className='text-blue-600 underline'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default page
