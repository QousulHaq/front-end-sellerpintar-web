import React from 'react'
import Image from 'next/image'
import { Badge } from './ui/badge'

const Card = () => {
    return (
        <div className="card-container space-y-4">
            <Image src={"/card-placeholder.jpg"} width={386.67} height={240} className='rounded-[12px]' alt='card-image' />
            <div className="card-content space-y-2 max-w-[386.67px]">
                <p className='text-slate-600 text-sm font-normal leading-5'>April 13, 2025</p>
                <h1 className='text-slate-900 text-lg font-semibold leading-7'>Cybersecurity Essentials Every Developer Should Know</h1>
                <h3 className='text-slate-600 text-base font-normal leading-6'>Protect your apps and users with these fundamental cybersecurity practices for developers.</h3>
                <div className="card-badge-container space-x-2">
                    <Badge className='bg-blue-200 text-blue-900 rounded-full '>Technology</Badge>
                    <Badge className='bg-blue-200 text-blue-900 rounded-full '>Design</Badge>
                </div>
            </div>
        </div>
    )
}

export default Card
