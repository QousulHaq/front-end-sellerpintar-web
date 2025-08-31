"use client"
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Newspaper, Tag, LogOut } from 'lucide-react'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className='sidebar-container w-[267px] h-screen bg-blue-600 pt-6 pb-4 border-r space-y-6 sticky top-0'>
            <div className="logo-container px-8">
                <Image src={"/sellerpintarweb-logo-white.svg"} width={134} height={24} alt='Company Logo' />
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
                <div className="item flex gap-3 items-center justify-start rounded-[6px] px-4 py-2">
                    <LogOut className='text-white size-5' />
                    <p className='text-white text-base font-medium leading-6'>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
