"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { dateFormatter } from '@/lib/utils'
import AxiosInstance from '@/lib/axios';

import AdminTable from '@/components/admin-table'
import AdminTableFilter from '@/components/admin-table-filter';
import PaginationComponent from '@/components/pagination';

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
import { Input } from '@/components/ui/input'

import { Plus } from 'lucide-react';

import { CreateCategoryTypes, createCategorySchema } from '@/types/form';
import type { Category } from '@/types/data'
type PageCountTypes = {
    limit?: number;
    total?: number;
    totalPages?: number;
    page: number;
}

const Page = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [pageCount, SetPageCount] = useState<PageCountTypes>({ limit: 1, total: 1, page: 1 })

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<CreateCategoryTypes>({
        resolver: zodResolver(createCategorySchema)
    })

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentTitleFilter = searchParams.get('search') || '';

    const { data: session } = useSession();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const resCategories = await AxiosInstance.get("/categories", {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`,
                    },
                    params: {
                        ...(currentTitleFilter && { search: currentTitleFilter }),
                        page: 1,
                        limit: 10
                    }
                })
                setCategories(resCategories.data.data)
                SetPageCount({ total: resCategories.data.totalData, totalPages: resCategories.data.totalPages, page: resCategories.data.currentPage })
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || error.message)
                    setLoading(false);
                    return
                }
                console.error(error)
                setLoading(false);
            }
        }
        fetchCategories();
    }, [currentTitleFilter, currentPage])

    const postCategory: SubmitHandler<CreateCategoryTypes> = async (data) => {
        try {
            const { category } = data
            await AxiosInstance.post(`/categories`, { name: category }, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            })
            window.location.href = "/admin/categories"
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("category", { message: error.response?.data?.message || error.message })
                return
            }
            console.error(error)
        }
    }

    const editCategory: SubmitHandler<CreateCategoryTypes> = async (data) => {
        try {
            const { category, id } = data
            await AxiosInstance.put(`/categories/${id}`, { name: category }, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            })
            window.location.href = "/admin/categories"
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("category", { message: error.response?.data?.message || error.message })
                return
            }
            console.error(error)
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            await AxiosInstance.delete(`/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            })
            window.location.href = "/admin/categories"
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='category-container border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="table-header">
                <div className="category-amount bg-gray-50 border-b border-slate-200 p-6">
                    <p className='text-slate-800 text-base font-medium leading-6'>Total Articles : {pageCount.total}</p>
                </div>
                <div className="search-category bg-gray-50 border-b border-slate-200 p-6 flex flex-row justify-between items-center">
                    <AdminTableFilter
                        loading={loading}
                        onFilter={({ searchString }) => {
                            const params = new URLSearchParams(searchParams.toString());

                            params.set('search', searchString);
                            params.set('page', '1');

                            router.push(`/admin/categories?${params.toString()}`);
                        }}
                    />
                    <div className="add-category-button">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='bg-blue-600 py-2 px-4 rounded-[6px] text-slate-50 text-sm font-medium leading-5 cursor-pointer hover:bg-blue-800'><Plus />Add Category</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                <form onSubmit={handleSubmit(postCategory)}>
                                    <DialogHeader>
                                        <DialogTitle className='pb-4 pt-2'>Add Category</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="category">Category</Label>
                                            <Input id="category" placeholder='Input Category' {...register("category")} />
                                            {errors.category && <p className="error-message text-red-500 text-sm">{errors.category.message}</p>}
                                        </div>
                                    </div>
                                    <DialogFooter className='mt-4'>
                                        <DialogClose asChild>
                                            <Button type={"button"} variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className='bg-blue-600 hover:bg-blue-800 cursor-pointer' disabled={isSubmitting}>{isSubmitting ? "Adding" : "Add"}</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="table w-full">
                {
                    !(loading) ? (
                        <AdminTable
                            data={categories}
                            columns={[
                                {
                                    key: 'name',
                                    header: 'Category',
                                    render(row) {
                                        return (
                                            <p className='text-slate-600 text-sm font-normal leading-5'>{row.name}</p>
                                        )
                                    },
                                },
                                {
                                    key: 'createdAt',
                                    header: 'Created At',
                                    render(row) {
                                        return (
                                            <p className='text-slate-600 text-sm font-normal leading-5'>{dateFormatter(row.createdAt, true)}</p>
                                        )
                                    },
                                },
                                {
                                    key: 'actions',
                                    header: 'Action',
                                    render(row) {
                                        return (
                                            <>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <p className='text-blue-600 text-sm font-normal leading-5 underline cursor-pointer'>Edit</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                                        <form onSubmit={handleSubmit((data) => editCategory(data))}>
                                                            <DialogHeader>
                                                                <DialogTitle className='pb-4 pt-2'>Edit Category</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="grid gap-4">
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="category">Category</Label>
                                                                    <Input id="id" placeholder='Input Category' {...register("id")} value={row.id} className='hidden' />
                                                                    <Input id="category" placeholder='Input Category' {...register("category")} />
                                                                    {errors.category && <p className="error-message text-red-500 text-sm">{errors.category.message}</p>}
                                                                </div>
                                                            </div>
                                                            <DialogFooter className='mt-4'>
                                                                <DialogClose asChild>
                                                                    <Button type='button' variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <Button type="submit" className='bg-blue-600 hover:bg-blue-800 cursor-pointer' disabled={isSubmitting}>{isSubmitting ? "Processing" : "Edit"}</Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <p className='text-red-500 text-sm font-normal leading-5 underline cursor-pointer'>Delete</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                                        <DialogHeader>
                                                            <DialogTitle>Delete Category</DialogTitle>
                                                            <DialogDescription>
                                                                Delete category “Technology”? This will remove it from master data permanently.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline" className='py-2 px-4 rounded-[6px]'>Cancel</Button>
                                                            </DialogClose>
                                                            <Button className='py-2 px-4 rounded-[6px] bg-red-600 hover:bg-red-800 cursor-pointer' onClick={() => deleteCategory(row.id)}>Delete</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </>
                                        )
                                    },
                                },
                            ]}
                        />
                    ) : (
                        <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
                            <p className="text-slate-900 text-lg font-medium leading-6 text-center">Loading...</p>
                        </div>
                    )
                }
                {errorMessage !== '' && <p className="error-message text-red-500 text-sm">{errorMessage}</p>}
            </div>
            <div className="table-footer bg-gray-50 border-b border-slate-200 py-6 px-4 flex flex-row justify-center items-center">
                <PaginationComponent
                    amountPages={pageCount.totalPages}
                    baseUrl='/admin/categories'
                />
            </div>
        </div >
    )
}

export default Page
