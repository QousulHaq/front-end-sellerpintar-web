import React from 'react'

import Image from 'next/image'

import { Badge } from './ui/badge'

import type { Articles } from '@/types/data'

import { dateFormatter } from '@/lib/utils'

const Card = ({
    title,
    content,
    category,
    createdAt,
    imageUrl,
}: Articles) => {
    return (
        <div className="card-container space-y-4">
            <Image src={imageUrl ? imageUrl : "https://placehold.co/387x240/png"} width={386.67} height={240} className='rounded-[12px]' alt='card-image' />
            <div className="card-content space-y-2 max-w-[386.67px]">
                <p className='text-slate-600 text-sm font-normal leading-5'>{dateFormatter(createdAt)}</p>
                <h1 className='text-slate-900 text-lg font-semibold leading-7'>{title}</h1>
                <h3 className='text-slate-600 text-base font-normal leading-6'>{content}</h3>
                <div className="card-badge-container space-x-2">
                    <Badge className='bg-blue-200 text-blue-900 rounded-full '>{category.name}</Badge>
                </div>
            </div>
        </div>
    )
}

export default Card
