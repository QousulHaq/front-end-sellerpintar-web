"use client"
import React, { useState, useRef } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import TextEditor from '@/components/text-editor'

import { ArrowLeft, ImagePlus } from 'lucide-react';

const articleHeaders = [
    "Thumbnails",
    "Title",
    "Category",
    "Created at",
    "Action",
]

const page = () => {

    const [imageUrl, setImageUrl] = useState<string>("")
    const imageInputRef = useRef<HTMLInputElement>(null)

    const pictureInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }

    return (
        <div className='article-container bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden'>
            <div className="form-header">
                <div className="form-header-wrapper p-5 flex gap-2 justify-start items-center">
                    <ArrowLeft className='text-slate-900 size-5' />
                    <p className='text-slate-900 text-base font-medium leading-6'>Create Articles</p>
                </div>
            </div>
            <div className="form-content p-6 space-y-6">
                <div className="input-article-data space-y-4">
                    <div className="input-img space-y-1 w-[223px]">
                        <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='picture'>Thumbnails</Label>
                        <Input id='picture' type='file' className='hidden' ref={imageInputRef} onChange={pictureInputHandler}></Input>
                        <div className="photo-input p-3 flex flex-col justify-center items-center gap-2 cursor-pointer h-[163px] border border-dashed border-slate-300 rounded-[8px] relative overflow-hidden" onClick={() => { imageInputRef.current?.click() }}>
                            {
                                imageUrl !== "" ? (
                                    <>
                                        <Image src={imageUrl} fill className='absolute object-cover' alt='image-input' />
                                    </>
                                ) : (
                                    <>
                                        <ImagePlus className='size-5 text-slate-500' />
                                        <div className="input-image-text-wrapper space-y-1">
                                            <p className='text-slate-500 text-xs font-normal leading-4 underline text-center'>Click to select files</p>
                                            <p className='text-slate-500 text-xs font-normal leading-4 text-center'>Suport File Type : jpg or png</p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="input-title space-y-1">
                        <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='title'>Title</Label>
                        <Input id='title' type='text' placeholder='Input title'></Input>
                    </div>
                    <div className="input-category space-y-1">
                        <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='category'>Category</Label>
                        <Select>
                            <SelectTrigger className='bg-white rounded-[6px] w-full' id='category'>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className='text-slate-500 text-sm font-normal leading-5'>The existing category list can be seen in the <span className='underline text-blue-600'>category</span> menu</p>
                    </div>
                </div>
                <div className="input-article-content bg-gray-50 border border-slate-200 rounded-[12px] overflow-hidden">
                    <TextEditor />
                </div>
            </div>
        </div >
    )
}

export default page
