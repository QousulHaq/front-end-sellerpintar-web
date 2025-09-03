import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Card from '@/components/card'

import { getDetailArticles } from '@/services/articles'

import { dateFormatter } from '@/lib/utils'

import type { GetDetailArticlesResponses } from '@/types/data'


const page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const res: GetDetailArticlesResponses = await getDetailArticles(id);
    const detailArticles = res.data

    return (
        <div className='detail-content-container'>
            <section className="featured-product px-5 py-10 md:py-10 md:px-40 flex flex-col justify-center items-center gap-10">
                <div className="detail-featured-product flex flex-col gap-4 justify-center items-center">
                    <div className="date-and-author space-x-2.5">
                        <span className='text-slate-600 text-sm font-medium leading-5'>{dateFormatter(detailArticles?.createdAt ?? '')}</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>•</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>Created by {detailArticles?.user?.username}</span>
                    </div>
                    <h1 className='text-slate-900 text-3xl font-semibold leading-9 max-w-[642px] text-center'>{detailArticles?.title}</h1>
                </div>
                <Image src={detailArticles?.imageUrl || "https://placehold.co/1120x480/png"} width={1120} height={480} alt='detail-content-image' className='rounded-[12px]' />
                <div className="article-content">
                    <div className='max-w-[1120px]' dangerouslySetInnerHTML={{ __html: `${detailArticles?.content}` }} />
                </div>
            </section>
            <section className="other-content pt-10 px-5 pb-[60px] md:px-[180px] md:pb-[100px] space-y-6">
                <h1 className='text-slate-900 text-lg md:text-xl font-bold leading-7'>Other articles</h1>
                <div className="card-container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {
                        detailArticles?.otherArticles?.map((value, index) => (
                            <Link href={`/detail-content/${value.id}`} key={`card-${index}`}>
                                <Card title={value.title} content={value.content} category={value.category} createdAt={value.createdAt} imageUrl={value.imageUrl} />
                            </Link>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default page
