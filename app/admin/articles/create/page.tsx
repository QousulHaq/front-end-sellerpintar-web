"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import AxiosInstance from '@/lib/axios'

import { useArticletContext } from '@/context/ArticleContext'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TextEditor from '@/components/text-editor'
import ImageUploader from '@/components/image-uploader'

import { ArrowLeft } from 'lucide-react';

import { CreateArticlesTypes, createArticlesSchema } from '@/types/form'
import { Category } from '@/types/data'

const Page = () => {
    const { setArticle, article } = useArticletContext()
    const { data: session } = useSession();
    const router = useRouter()

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
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
    }, [])

    const {
        register,
        control,
        handleSubmit,
        setError,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<CreateArticlesTypes>({
        defaultValues: {
            ...(Object.values(article).every(val => val !== "") ? article : {
                title: '',
                content: '',
                categoryId: '',
                imageUrl: '',
            }),
        },
        resolver: zodResolver(createArticlesSchema)
    })

    const onSubmit: SubmitHandler<CreateArticlesTypes> = async (data) => {
        setLoading(true)
        try {
            console.log("isi data", data)
            const res = await AxiosInstance.post("/articles",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${session?.user.accessToken}`
                    }
                }
            )
            console.log("response submit articles", res)
            router.push("/admin/articles")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("root", error)
                setLoading(false)
                return
            }
            console.error(error)
            setLoading(false)
        }
    }

    const onPreviewPage = () => {
        const articleData = getValues();
        setArticle(articleData);
        router.push("/preview")
    }

    const onResetForm = () => {
        setValue("imageUrl", "")
        setValue("title", "")
        setValue("categoryId", "")
        setValue("content", "")
    }

    return (
        <div className='article-container bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="form-header">
                <div className="form-header-wrapper p-5 flex gap-2 justify-start items-center">
                    <Link href={"/admin/articles"}>
                        <ArrowLeft className='text-slate-900 size-5' />
                    </Link>
                    <p className='text-slate-900 text-base font-medium leading-6'>Create Articles</p>
                </div>
            </div>
            <div className="form-content p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-article-data space-y-4">
                        {errors.root && <p className="error-message text-red-500 text-sm">{errors.root.message}</p>}
                        <div className="image-container">
                            <Controller
                                name="imageUrl"
                                control={control}
                                render={({ field }) => (
                                    <ImageUploader imageUrl={field.value} onImageChange={(data) => field.onChange(data)} onErrorUpload={(data) => setError("imageUrl", { message: data })} />
                                )} />
                            {errors.imageUrl && <p className="error-message text-red-500 text-sm">{errors.imageUrl.message}</p>}
                        </div>
                        <div className="input-title space-y-1">
                            <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='title'>Title</Label>
                            <Input id='title' type='text' placeholder='Input title' {...register("title")}></Input>
                            {errors.title && <p className="error-message text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        <div className="input-category space-y-1">
                            <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='category'>Category</Label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({ field }) => (
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className='bg-white rounded-[6px] w-full' id='category'>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {
                                                    !loading ? (
                                                        <>
                                                            {
                                                                categories.map((category, index) => {
                                                                    if (category.id !== '') {
                                                                        return (<SelectItem value={category.id !== '' ? category.id : category.name} key={`category-${index}`}>{category.name}</SelectItem>)
                                                                    }
                                                                    return
                                                                })
                                                            }
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )} />
                            {errorMessage !== '' && <p className="error-message text-red-500 text-sm">{errorMessage}</p>}
                            <p className='text-slate-500 text-sm font-normal leading-5'>The existing category list can be seen in the <span className='underline text-blue-600'>category</span> menu</p>
                        </div>
                        <div className="input-article-content bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden ">
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <TextEditor onEditorChange={(data) => field.onChange(data)} />
                                )} />
                        </div>
                        <div className="button-group w-full py-4 flex gap-2 justify-end items-center">
                            <Button type='button' className='py-2 px-4 rounded-[6px] bg-white border border-slate-200 text-slate-900 hover:bg-slate-200 cursor-pointer' onClick={() => onResetForm()}>Cancel</Button>
                            <Button type='button' className='py-2 px-4 rounded-[6px] bg-slate-200 text-slate-900 hover:bg-slate-400 cursor-pointer' onClick={() => onPreviewPage()}>Preview</Button>
                            <Button type='submit' className='py-2 px-4 rounded-[6px] bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'>{isSubmitting ? "Uploading..." : "Upload"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Page
