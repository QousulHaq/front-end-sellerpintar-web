"use client"
import React from 'react'

import Image from 'next/image'

import { dateFormatter } from '@/lib/utils'

import { useArticletContext } from '@/context/ArticleContext'
import { useSession } from 'next-auth/react'


const Page = () => {
    const { article } = useArticletContext()
    const { data: session } = useSession();

    return (
        <div className='detail-content-container'>
            <section className="featured-product py-10 px-40 flex flex-col justify-center items-center gap-10">
                <div className="detail-featured-product flex flex-col gap-4 justify-center items-center">
                    <div className="date-and-author space-x-2.5">
                        <span className='text-slate-600 text-sm font-medium leading-5'>{dateFormatter(`${new Date()}`)}</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>•</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>Created by {session?.user.username}</span>
                    </div>
                    <h1 className='text-slate-900 text-3xl font-semibold leading-9 max-w-[642px] text-center'>{article.title}</h1>
                </div>
                <Image src={article.imageUrl || "https://placehold.co/1120x480/png"} width={1120} height={480} alt='detail-content-image' className='rounded-[12px]' />
                <div className="article-content">
                    <div className='max-w-[1120px]' dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </section>
            {/* <section className="other-content pt-10 px-[180px] pb-[100px] space-y-6">
                <h1 className='text-slate-900 text-xl font-bold leading-7'>Other articles</h1>
                <div className="card-container grid grid-cols-3 gap-10">
                    {
                        Array(3).map((value, index) => (
                            <Link href={`/detail-content/${value.id}`} key={`card-${index}`}>
                                <Card title={value.title} content={value.content} category={value.category} createdAt={value.createdAt} imageUrl={value.imageUrl} />
                            </Link>
                        ))
                    }
                </div>
            </section> */}
        </div>
    )
}

export default Page
