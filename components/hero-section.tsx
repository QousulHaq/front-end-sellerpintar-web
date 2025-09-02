"use client"
import React, { useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce';

import { Input } from '@/components/ui/input'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem
} from '@/components/ui/select'

import { Search } from 'lucide-react';

import type { Category } from '@/types/data';
type SearchTypes = {
    searchString: string;
    category: string;
}

const HeroSection = ({
    onFilter,
    loading,
    categories,
}: {
    onFilter: ({ searchString, category }: SearchTypes) => void,
    loading: boolean,
    categories: Category[]
}) => {
    const [category, setCategory] = useState('');
    const [searchString, setSearchString] = useState('');
    const [value] = useDebounce(searchString, 1000);

    useEffect(() => {
        onFilter({
            searchString: value,
            category
        })
    }, [value, category])

    return (
        <section className="hero-section relative bg-[url('/hero-image.jpg')] bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-[rgba(37,99,235,0.86)]"></div>
            <div className="hero-containers z-10 space-y-10">
                <div className="hero-content space-y-3">
                    <p className="text-white text-base font-bold leading-6">Blog genzet</p>
                    <h1 className="text-white text-5xl leading-12 font-medium max-w-[730px]">The Journal : Design Resources, Interviews, and Industry News</h1>
                    <h2 className="text-white text-2xl leading-8 font-normal">Your daily dose of design insights!</h2>
                </div>
                <div className="hero-filter-container bg-blue-500 rounded-2xl p-4 flex gap-2">
                    <Select disabled={loading} onValueChange={(data) => setCategory(data)}>
                        <SelectTrigger className='bg-white w-[180px] rounded-[6px]'>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                {
                                    categories.length !== 0 && (
                                        <>
                                            <SelectItem value={'none'} key={`category`}>{`All`}</SelectItem>
                                            {categories.map((category, index) => {
                                                if (category.id !== '') {
                                                    return (<SelectItem value={category.id !== '' ? category.id : category.name} key={`category-${index}`}>{category.name}</SelectItem>)
                                                }
                                                return
                                            })}
                                        </>
                                    )
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="input-icon-wrapper relative w-full">
                        <Input
                            id="search"
                            type={"text"}
                            placeholder="Search articles"
                            className='bg-white placeholder:text-slate-400 rounded-[6px] pl-8'
                            onChange={(e) => setSearchString(e.target.value)}
                        >
                        </Input>
                        <Search className='size-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
