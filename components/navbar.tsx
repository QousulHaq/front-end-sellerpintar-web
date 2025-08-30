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

const Navbar = () => {
    const pathname = usePathname();
    const isHomepage = pathname === '/';

    return (
        <nav className={`navbar ${isHomepage ? "absolute top-0 z-20" : "border-b border-slate-200"} py-8 px-[60px] flex justify-between items-center w-full`}>
            <Link href={"/"}>
                <Image src={isHomepage ? LogoWhite : Logo} height={24} width={134} alt='Company Logo' draggable={false}/>
            </Link>
            <div className="user-account flex gap-1.5">
                <Avatar className='size-8'>
                    <AvatarImage src={"/user-image.jpg"} alt='user-image' />
                    <AvatarFallback className='text-blue-900 bg-blue-200'>J</AvatarFallback>
                </Avatar>
                <Menubar className='bg-transparent focus:bg-transparent border-0 p-0 m-0 rounded-none shadow-none'>
                    <MenubarMenu>
                        <MenubarTrigger className='bg-transparent focus:bg-transparent data-[state=open]:bg-transparent border-0 p-0 m-0 rounded-none cursor-pointer'>
                            <p className={`${isHomepage ? "text-white" : "text-slate-900"} text-base font-medium leading-6 underline`}>James Dean</p>
                        </MenubarTrigger>
                        <MenubarContent className='border-slate-200' align='end'>
                            <Link href={"/account"}><MenubarItem className='text-slate-600 text-sm font-normal leading-5 cursor-pointer'>My Account</MenubarItem></Link>
                            <MenubarSeparator className='border border-slate-200' />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MenubarItem onSelect={(e) => e.preventDefault()} className='text-red-500 text-sm font-medium leading-5 focus:text-red-800 group/menubar cursor-pointer'><LogOut className='text-red-500 group-focus/menubar:text-red-800' strokeWidth={2.5} />Logout</MenubarItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                    <form>
                                        <DialogHeader>
                                            <DialogTitle>Logout</DialogTitle>
                                            <DialogDescription>
                                                Are you sure want to logout?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" className='py-2 px-4 rounded-[6px]'>Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" className='py-2 px-4 rounded-[6px] bg-blue-600'>Logout</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </nav>
    )
}

export default Navbar
