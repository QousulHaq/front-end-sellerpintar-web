"use client"
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image';

import axios from 'axios';
import AxiosInstance from '@/lib/axios';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { dateFormatter } from '@/lib/utils'

import AdminTable from '@/components/admin-table'
import AdminTableFilter from '@/components/admin-table-filter';
import PaginationComponent from '@/components/pagination';
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

import { Plus } from 'lucide-react';

import type { Articles, Category } from '@/types/data';
type PageCountTypes = {
    limit: number;
    total: number;
    page: number;
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Articles[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState({
        articles: true,
        categories: true,
    });
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [pageCount, SetPageCount] = useState<PageCountTypes>({ limit: 1, total: 1, page: 1 })

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentTitleFilter = searchParams.get('title') || '';
    const currentCategory = searchParams.get('category') || 'none';

    const { data: session } = useSession();

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading((prev) => ({ ...prev, articles: true }));
            try {
                const resArticles = await AxiosInstance.get("/articles", {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`,
                    },
                    params: {
                        ...(currentTitleFilter !== '' && { title: currentTitleFilter }),
                        ...(currentCategory !== 'none' && { category: currentCategory }),
                        page: currentPage,
                        limit: 10
                    }
                })
                setArticles(resArticles.data.data)
                SetPageCount({ total: resArticles.data.total, limit: resArticles.data.limit, page: resArticles.data.page })
                setLoading((prev) => ({ ...prev, articles: false }));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || error.message)
                    setLoading((prev) => ({ ...prev, articles: false }));
                    return
                }
                console.error(error)
                setLoading((prev) => ({ ...prev, articles: false }));
            }
        }

        if (session?.user.accessToken) {
            fetchArticles();
        }
    }, [session?.user.accessToken, currentTitleFilter, currentCategory, currentPage]);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading((prev) => ({ ...prev, categories: true }));
            try {
                const resCategories = await AxiosInstance.get("/categories", {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`,
                    },
                    params: {
                        page: 1,
                        limit: 25
                    }
                })
                setCategories(resCategories.data.data)
                setLoading((prev) => ({ ...prev, categories: false }));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || error.message)
                    setLoading((prev) => ({ ...prev, categories: false }));
                    return
                }
                console.error(error)
                setLoading((prev) => ({ ...prev, categories: false }));
            }
        }
        fetchCategories();
    }, [])

    const deleteArticles = async (id: string) => {
        try {
            await AxiosInstance.delete(`/articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            })
            setArticles(articles.filter((value) => value.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='article-container border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="table-header">
                <div className="article-amount bg-gray-50 border-b border-slate-200 p-6">
                    <p className='text-slate-800 text-base font-medium leading-6'>Total Articles : {pageCount.total}</p>
                </div>
                <div className="search-article bg-gray-50 border-b border-slate-200 p-6 flex flex-row justify-between items-center">
                    <AdminTableFilter
                        categories={categories}
                        loading={loading.categories}
                        onFilter={({ searchString, category }) => {
                            const params = new URLSearchParams(searchParams.toString());

                            params.set('title', searchString);
                            params.set('category', category);
                            params.set('page', '1');

                            router.push(`/admin/articles?${params.toString()}`);
                        }}
                    />
                    <div className="add-article-button">
                        <Link href={"/admin/articles/create"}><Button className='bg-blue-600 py-2 px-4 rounded-[6px] text-slate-50 text-sm font-medium leading-5 cursor-pointer hover:bg-blue-800'><Plus />Add Articles</Button></Link>
                    </div>
                </div>
            </div>
            <div className="table w-full">
                {
                    !(loading.articles && loading.categories) ? (
                        <AdminTable
                            data={articles}
                            columns={[
                                {
                                    key: 'imageUrl',
                                    header: 'Thumbnails',
                                    render(row) {
                                        return (
                                            <div className="image-wrapper w-[60px] h-[60px] rounded-[6px] overflow-hidden relative">
                                                <Image src={row.imageUrl ? row.imageUrl : "https://placehold.co/60x60/png"} alt='thumbnails' fill className='object-cover' />
                                            </div>
                                        )
                                    },
                                },
                                {
                                    key: 'title',
                                    header: 'Title',
                                    render(row) {
                                        return (
                                            <p className='text-slate-600 text-sm font-normal leading-5 w-full'>{row.title}</p>
                                        )
                                    },
                                },
                                {
                                    key: 'category',
                                    header: 'Category',
                                    render(row) {
                                        return (
                                            <p className='text-slate-600 text-sm font-normal leading-5'>{row.category.name}</p>
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
                                                <Link href={`/detail-content/${row.id}`} className='text-blue-600 text-sm font-normal leading-5 underline'>Preview</Link>
                                                <Link href={`/admin/articles/edit/${row.id}`} className='text-blue-600 text-sm font-normal leading-5 underline'>Edit</Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <p className='text-red-500 text-sm font-normal leading-5 underline cursor-pointer'>Delete</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                                                        <DialogHeader>
                                                            <DialogTitle>Delete Articles</DialogTitle>
                                                            <DialogDescription>
                                                                Deleting &quot;{row.title}&quot; is permanent and cannot be undone. All related content will be removed.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline" className='py-2 px-4 rounded-[6px] cursor-pointer'>Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="button" className='py-2 px-4 rounded-[6px] bg-red-600 cursor-pointer' onClick={() => deleteArticles(`${row.id}`)}>Delete</Button>
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
                    limit={pageCount.limit}
                    total={pageCount.total}
                    baseUrl='/admin/articles'
                />
            </div>
        </div>
    )
}

export default ArticlesPage
