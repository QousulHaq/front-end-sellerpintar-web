import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from '@/components/ui/input'

import { Search, Plus } from 'lucide-react';

const articleHeaders = [
    "Thumbnails",
    "Title",
    "Category",
    "Created at",
    "Action",
]

const page = () => {
    return (
        <div className='article-container border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="table-header">
                <div className="article-amount bg-gray-50 border-b border-slate-200 p-6">
                    <p className='text-slate-800 text-base font-medium leading-6'>Total Articles : 25</p>
                </div>
                <div className="search-article bg-gray-50 border-b border-slate-200 p-6 flex flex-row justify-between items-center">
                    <div className="search-wrapper flex gap-2">
                        <Select>
                            <SelectTrigger className='bg-white rounded-[6px]'>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Role</SelectLabel>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="input-icon-wrapper relative w-60">
                            <Input
                                id="search"
                                type={"text"}
                                placeholder="Search by title"
                                required
                                className='bg-white placeholder:text-slate-400 rounded-[6px] pl-9 border-slate-300'
                            >
                            </Input>
                            <Search className='size-5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2' />
                        </div>
                    </div>
                    <div className="add-article-button">
                        <Link href={"/admin/articles/create"}><Button className='bg-blue-600 py-2 px-4 rounded-[6px] text-slate-50 text-sm font-medium leading-5'><Plus />Add Articles</Button></Link>
                    </div>
                </div>
            </div>
            <div className="table w-full">
                <div className="table-header-row grid grid-cols-5">
                    {
                        articleHeaders.map((header, index) => (
                            <div className="header-cell py-3 px-4 border-b border-slate-200 bg-gray-100" key={`header-${index}`}>
                                <p className='text-slate-900 text-sm font-medium leading-5 text-center'>{header}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="table-content">
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <div className="table-content-row grid grid-cols-5" key={`content-row-${index}`}>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <div className="image-wrapper w-[60px] h-[60px] rounded-[6px] overflow-hidden relative">
                                        <Image src={"/card-placeholder.jpg"} alt='thumbnails' fill className='object-cover' />
                                    </div>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <p className='text-slate-600 text-sm font-normal leading-5'>Cybersecurity Essentials Every Developer Should Know</p>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <p className='text-slate-600 text-sm font-normal leading-5'>Technology</p>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <p className='text-slate-600 text-sm font-normal leading-5'>April 13, 2025 10:55:12</p>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center space-x-3">
                                    <Link href={"#"} className='text-blue-600 text-sm font-normal leading-5 underline'>Preview</Link>
                                    <Link href={"#"} className='text-blue-600 text-sm font-normal leading-5 underline'>Edit</Link>
                                    <Link href={"#"} className='text-red-500 text-sm font-normal leading-5 underline'>Delete</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="table-footer bg-gray-50 border-b border-slate-200 py-6 px-4 flex flex-row justify-center items-center">
                <Pagination className='text-slate-900'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default page
