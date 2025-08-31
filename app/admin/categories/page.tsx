import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
    "Category",
    "Created at",
    "Action",
]

const page = () => {
    return (
        <div className='category-container border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="table-header">
                <div className="category-amount bg-gray-50 border-b border-slate-200 p-6">
                    <p className='text-slate-800 text-base font-medium leading-6'>Total Articles : 25</p>
                </div>
                <div className="search-category bg-gray-50 border-b border-slate-200 p-6 flex flex-row justify-between items-center">
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
                    <div className="add-category-button">
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button className='bg-blue-600 py-2 px-4 rounded-[6px] text-slate-50 text-sm font-medium leading-5'><Plus />Add Category</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                    <DialogHeader>
                                        <DialogTitle className='pb-4 pt-2'>Add Category</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Category</Label>
                                            <Input id="name-1" name="name" placeholder='Input Category' />
                                            <p className="error-message text-red-500 text-sm">Category field cannot be empty</p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className='bg-blue-600'>Add</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="table w-full">
                <div className="table-header-row grid grid-cols-3">
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
                            <div className="table-content-row grid grid-cols-3 h-[84px]" key={`content-row-${index}`}>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <p className='text-slate-600 text-sm font-normal leading-5'>Technology</p>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center">
                                    <p className='text-slate-600 text-sm font-normal leading-5'>April 13, 2025 10:55:12</p>
                                </div>
                                <div className="content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center space-x-3">
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
