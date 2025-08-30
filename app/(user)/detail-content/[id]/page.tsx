import React from 'react'

import Image from 'next/image'

import Card from '@/components/card'

import detailImage from "@/public/detail-card-placeholder.jpg"


const page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    return (
        <div className='detail-content-container'>
            <section className="featured-product py-10 px-40 space-y-10">
                <div className="detail-featured-product flex flex-col gap-4 justify-center items-center">
                    <div className="date-and-author space-x-2.5">
                        <span className='text-slate-600 text-sm font-medium leading-5'>February 4, 2025</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>•</span>
                        <span className='text-slate-600 text-sm font-medium leading-5'>Created by Admin</span>
                    </div>
                    <h1 className='text-slate-900 text-3xl font-semibold leading-9 max-w-[642px] text-center'>Figma's New Dev Mode: A Game-Changer for Designers & Developers</h1>
                </div>
                <Image src={detailImage} width={1120} height={480} alt='detail-content-image' className='rounded-[12px]' />
                <div className="article-content">
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>In the ever-evolving landscape of design and development, Figma has once again raised the bar with its latest feature: Dev Mode. This innovative addition is set to revolutionize the way designers and developers collaborate, streamlining workflows and enhancing productivity. In this article, we will delve into the key features of Figma's Dev Mode and explore how it can benefit both designers and developers alike.</p>
                    <h2 className='text-slate-900 text-2xl font-semibold leading-8 mt-8 mb-4'>Seamless Handoff</h2>
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>One of the standout features of Dev Mode is its seamless handoff capabilities. Designers can now easily share their designs with developers, complete with all the necessary specifications, assets, and code snippets. This eliminates the need for lengthy email threads or manual documentation, allowing for a more efficient transition from design to development.</p>
                    <h2 className='text-slate-900 text-2xl font-semibold leading-8 mt-8 mb-4'>Real-Time Collaboration</h2>
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>Dev Mode fosters real-time collaboration between designers and developers. Withboth parties able to work within the same environment, feedback and iterations can happen instantaneously. This not only speeds up the development process but also ensures that the final product aligns closely with the original design vision.</p>
                    <h2 className='text-slate-900 text-2xl font-semibold leading-8 mt-8 mb-4'>Code Generation</h2>
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>Figma's Dev Mode also introduces code generation capabilities, allowing developers to extract clean, production-ready code directly from design files. This feature supports various frameworks and languages, making it easier for developers to implement designs without the need for extensive manual coding.</p>
                    <h2 className='text-slate-900 text-2xl font-semibold leading-8 mt-8 mb-4'>Enhanced Design Systems</h2>
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>For teams utilizing design systems, Dev Mode offers enhanced support and integration. Designers can create and maintain design systems within Figma, while developers can easily access and implement these components in their codebase. This ensures consistency across projects and reduces the risk of design drift.</p>
                    <h2 className='text-slate-900 text-2xl font-semibold leading-8 mt-8 mb-4'>Conclusion</h2>
                    <p className='text-slate-700 text-base font-normal leading-7 max-w-[1120px]'>Figma's Dev Mode is a game-changer for the design and development community. By streamlining collaboration, enhancing handoff processes, and providing powerful code generation tools, it empowers teams to work more efficiently and effectively. As the digital landscape continues to evolve, tools like Dev Mode will undoubtedly play a crucial role in shaping the future of design and development workflows.</p>
                </div>
            </section>
            <section className="other-content pt-10 px-[180px] pb-[100px] space-y-6">
                <h1 className='text-slate-900 text-xl font-bold leading-7'>Other articles</h1>
                <div className="card-container grid grid-cols-3 gap-10">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
        </div>
    )
}

export default page
