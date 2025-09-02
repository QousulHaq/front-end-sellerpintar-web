"use client"
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Newspaper, Tag, LogOut } from 'lucide-react'

import Logo from "@/public/sellerpintarweb-logo-white.svg"

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className='sidebar-container w-[267px] h-screen bg-blue-600 pt-6 pb-4 border-r space-y-6 sticky top-0'>
            <div className="logo-container px-8">
                <Image src={Logo} width={134} height={24} alt='Company Logo' />
            </div>
            <div className="lists-menu px-4 space-y-2">
                <Link href={'/admin/articles'}>
                    <div className={`item flex gap-3 items-center justify-start rounded-[6px] px-4 py-2 ${pathname === '/admin/articles' ? 'bg-blue-500' : ''}`}>
                        <Newspaper className='text-white size-5' />
                        <p className='text-white text-base font-medium leading-6'>Articles</p>
                    </div>
                </Link>
                <Link href={'/admin/categories'}>
                    <div className={`item flex gap-3 items-center justify-start rounded-[6px] px-4 py-2 ${pathname === '/admin/categories' ? 'bg-blue-500' : ''}`}>
                        <Tag className='text-white size-5' />
                        <p className='text-white text-base font-medium leading-6'>Category</p>
                    </div>
                </Link>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="item flex gap-3 items-center justify-start rounded-[6px] px-4 py-2 cursor-pointer">
                            <LogOut className='text-white size-5' />
                            <p className='text-white text-base font-medium leading-6'>Logout</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                        <DialogHeader>
                            <DialogTitle>Logout</DialogTitle>
                            <DialogDescription>
                                Are you sure want to logout?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className='py-2 px-4 rounded-[6px] cursor-pointer'>Cancel</Button>
                            </DialogClose>
                            <Button className='py-2 px-4 rounded-[6px] bg-blue-600 cursor-pointer' onClick={() => { signOut({ callbackUrl: "/login", redirect: true }) }}>Logout</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Sidebar
