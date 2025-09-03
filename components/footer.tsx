import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className='footer w-full bg-[rgba(37,99,235,0.86)] flex justify-center items-center h-[100px]'>
            <div className="footer-container flex gap-2 md:gap-4 md:flex-row flex-col justify-center items-center">
                <Image src={"/sellerpintarweb-logo-white.svg"} width={133.4} height={24} alt='Company Logo White' draggable={false} className='md:w-[133.4px] md:h-[24px] w-[122px] h-[22px]' />
                <span className='text-white text-sm md:text-base font-normal leading-5 md:leading-6'>© 2025 Blog genzet. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer
