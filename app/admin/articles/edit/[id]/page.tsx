"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import axios from "axios"
import AxiosInstance from "@/lib/axios"
import { useArticletContext } from "@/context/ArticleContext"

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextEditor from "@/components/text-editor"
import ImageUploader from "@/components/image-uploader"

import { ArrowLeft } from "lucide-react"
import { CreateArticlesTypes, createArticlesSchema } from "@/types/form"
import { Category } from "@/types/data"

const Page = () => {
    const { setArticle, article } = useArticletContext()
    const { data: session } = useSession()
    const router = useRouter()
    const { id: articleId } = useParams()

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    const {
        register,
        control,
        handleSubmit,
        setError,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateArticlesTypes>({
        defaultValues:
            Object.values(article).every((val) => val !== "")
                ? article
                : {
                    title: "",
                    content: "",
                    categoryId: "",
                    imageUrl: "",
                },
        resolver: zodResolver(createArticlesSchema),
    })

    // Fetch single article
    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleId || !session?.user.accessToken) return

            setLoading(true)
            try {
                const res = await AxiosInstance.get(`/articles/${articleId}`, {
                    headers: { Authorization: `Bearer ${session.user.accessToken}` },
                })

                const { title, content, categoryId, imageUrl } = res.data
                reset({ title, content, categoryId, imageUrl })
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || error.message)
                } else {
                    console.error(error)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [articleId, session?.user.accessToken])

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            if (!session?.user.accessToken) return

            setLoading(true)
            try {
                const res = await AxiosInstance.get("/categories", {
                    headers: { Authorization: `Bearer ${session.user.accessToken}` },
                    params: { page: 1, limit: 25 },
                })

                setCategories(res.data.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || error.message)
                } else {
                    console.error(error)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [session?.user.accessToken])

    // Submit form
    const onSubmit: SubmitHandler<CreateArticlesTypes> = async (data) => {
        try {
            console.log("datayangdisubmit", data)
            // Uncomment untuk API call update
            await AxiosInstance.put(`/articles/${articleId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            })
            router.push("/admin/articles")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("root", { message: error.response?.data?.message || error.message })
            } else {
                console.error(error)
            }
        }
    }

    // Preview
    const onPreviewPage = () => {
        setArticle(getValues())
        router.push("/preview")
    }

    // Reset form
    const onResetForm = () => {
        reset({ title: "", content: "", categoryId: "", imageUrl: "" })
    }

    if (loading) {
        return (
            <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
                <p className="text-slate-900 text-lg font-medium leading-6 text-center">Loading...</p>
            </div>
        )
    }

    return (
        <div className="article-container bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden">
            {/* Header */}
            <div className="form-header">
                <div className="form-header-wrapper p-5 flex gap-2 items-center">
                    <Link href={"/admin/articles"}>
                        <ArrowLeft className="text-slate-900 size-5" />
                    </Link>
                    <p className="text-slate-900 text-base font-medium leading-6">Edit Articles</p>
                </div>
            </div>

            {/* Content */}
            <div className="form-content p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-article-data space-y-4">
                        {errors.root && (
                            <p className="error-message text-red-500 text-sm">{errors.root.message}</p>
                        )}

                        {/* Image */}
                        <div className="image-container">
                            <Controller
                                name="imageUrl"
                                control={control}
                                render={({ field }) => (
                                    <ImageUploader
                                        imageUrl={field.value}
                                        onImageChange={field.onChange}
                                        onErrorUpload={(msg) => setError("imageUrl", { message: msg })}
                                    />
                                )}
                            />
                            {errors.imageUrl && (
                                <p className="error-message text-red-500 text-sm">{errors.imageUrl.message}</p>
                            )}
                        </div>

                        {/* Title */}
                        <div className="input-title space-y-1">
                            <Label
                                className="text-slate-900 text-sm font-medium leading-5"
                                htmlFor="title"
                            >
                                Title
                            </Label>
                            <Input id="title" type="text" placeholder="Input title" {...register("title")} />
                            {errors.title && (
                                <p className="error-message text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="input-category space-y-1">
                            <Label
                                className="text-slate-900 text-sm font-medium leading-5"
                                htmlFor="category"
                            >
                                Category
                            </Label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={getValues("categoryId")}
                                    >
                                        <SelectTrigger
                                            className="bg-white rounded-[6px] w-full"
                                            id="category"
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {categories.map((category) =>
                                                    category.id ? (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ) : null
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errorMessage && (
                                <p className="error-message text-red-500 text-sm">{errorMessage}</p>
                            )}
                            <p className="text-slate-500 text-sm">
                                The existing category list can be seen in the{" "}
                                <span className="underline text-blue-600">category</span> menu
                            </p>
                        </div>

                        {/* Content */}
                        <div className="input-article-content bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden">
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <TextEditor
                                        onEditorChange={field.onChange}
                                        htmlString={field.value}
                                    />
                                )}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="button-group w-full py-4 flex gap-2 justify-end">
                            <Button
                                type="button"
                                className="py-2 px-4 rounded-[6px] bg-white border border-slate-200 text-slate-900 hover:bg-slate-200 cursor-pointer"
                                onClick={onResetForm}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="py-2 px-4 rounded-[6px] bg-slate-200 text-slate-900 hover:bg-slate-400 cursor-pointer"
                                onClick={onPreviewPage}
                            >
                                Preview
                            </Button>
                            <Button
                                type="submit"
                                className="py-2 px-4 rounded-[6px] bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
                            >
                                {isSubmitting ? "Uploading..." : "Upload"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
