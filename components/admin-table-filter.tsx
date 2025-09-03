import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { useDebounce } from 'use-debounce';

import { Search } from 'lucide-react';

import { Category } from '@/types/data'
type SearchTypes = {
    searchString: string;
    category: string;
}

const AdminTableFilter = ({
    onFilter,
    loading,
    categories,
}: {
    onFilter: ({ searchString, category }: SearchTypes) => void,
    loading: boolean,
    categories?: Category[]
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
        <div className="search-wrapper flex gap-2">
            {
                categories ? (
                    <Select disabled={loading} onValueChange={(data) => setCategory(data)}>
                        <SelectTrigger className='bg-white rounded-[6px]'>
                            <SelectValue placeholder="Category" />
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
                ) : ""
            }
            <div className="input-icon-wrapper relative w-60">
                <Input
                    id="search"
                    type={"text"}
                    placeholder="Search by title"
                    required
                    className='bg-white placeholder:text-slate-400 rounded-[6px] pl-9 border-slate-300'
                    onChange={(e) => setSearchString(e.target.value)}
                >
                </Input>
                <Search className='size-5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2' />
            </div>
        </div>
    )
}

export default AdminTableFilter
