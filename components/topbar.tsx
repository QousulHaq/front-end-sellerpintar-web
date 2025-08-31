"use client"
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LogOut } from 'lucide-react'

import LogoWhite from "@/public/sellerpintarweb-logo-white.svg"
import Logo from "@/public/sellerpintarweb-logo.svg"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
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
import { Button } from '@/components/ui/button'

const Topbar = () => {
    const pathname = usePathname();
    const isHomepage = pathname === '/';

    return (
        <nav className={`topbar pt-5 pb-4 px-6 border-b border-slate-200 bg-gray-50 flex justify-between items-center w-full`}>
            <h1 className='text-slate-900 text-xl font-semibold leading-7'>Article</h1>
            <div className="user-account flex gap-1.5">
                <Avatar className='size-8'>
                    <AvatarImage src={"/user-image.jpg"} alt='user-image' />
                    <AvatarFallback className='text-blue-900 bg-blue-200'>J</AvatarFallback>
                </Avatar>
                <Menubar className='bg-transparent focus:bg-transparent border-0 p-0 m-0 rounded-none shadow-none'>
                    <MenubarMenu>
                        <MenubarTrigger className='bg-transparent focus:bg-transparent data-[state=open]:bg-transparent border-0 p-0 m-0 rounded-none cursor-pointer'>
                            <p className={`text-slate-900 text-sm font-medium leading-5 underline`}>James Dean</p>
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-200' align='end'>
                            <Link href={"/admin/account"}><MenubarItem className='text-slate-600 text-sm font-normal leading-5 cursor-pointer'>My Account</MenubarItem></Link>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </nav>
    )
}

export default Topbar
