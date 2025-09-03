import React from 'react'

import Link from 'next/link'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'


const Page = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className='account-container'>
            <section className="featured-product px-5 py-10 md:px-40 h-[667px] flex justify-center items-center">
                <div className="profile-card-container flex flex-col gap-9 justify-center items-center">
                    <h1 className='text-slate-900 text-xl font-semibold leading-7'>User Profile</h1>
                    <div className="profile-card-content flex flex-col gap-6 justify-center items-center">
                        <Avatar className='size-[68px]'>
                            <AvatarImage src={"/user-image.jpg"} alt='user-image' />
                            <AvatarFallback className='text-blue-900 text-2xl font-medium leading-8 bg-blue-200'>{(session?.user.username)?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="profile-data space-y-3">
                            <div className="user-data bg-gray-100 border border-slate-200 py-2.5 px-3 w-[368px] flex">
                                <div className="data-label w-[97px] flex justify-between">
                                    <span className='text-gray-900 text-base font-semibold leading-6'>Username</span>
                                    <span className='text-gray-900 text-base font-normal leading-6'>:</span>
                                </div>
                                <span className='text-slate-900 text-base font-normal leading-6 text-center flex-1'>{session?.user.username}</span>
                            </div>
                            <div className="user-data bg-gray-100 border border-slate-200 py-2.5 px-3 w-[368px] flex">
                                <div className="data-label w-[97px] flex justify-between">
                                    <span className='text-gray-900 text-base font-semibold leading-6'>Password</span>
                                    <span className='text-gray-900 text-base font-normal leading-6'>:</span>
                                </div>
                                <span className='text-slate-900 text-base font-normal leading-6 text-center flex-1'>{session?.user.password}</span>
                            </div>
                            <div className="user-data bg-gray-100 border border-slate-200 py-2.5 px-3 w-[368px] flex">
                                <div className="data-label w-[97px] flex justify-between">
                                    <span className='text-gray-900 text-base font-semibold leading-6'>Role</span>
                                    <span className='text-gray-900 text-base font-normal leading-6'>:</span>
                                </div>
                                <span className='text-slate-900 text-base font-normal leading-6 text-center flex-1'>{session?.user.role}</span>
                            </div>
                        </div>
                    </div>
                    <Link href={"/"} className='w-full'><Button className='bg-blue-600 rounded-[6px] text-sm font-normal leading-5 w-full cursor-pointer'>Back to home</Button></Link>
                </div>
            </section>
        </div>
    )
}

export default Page
