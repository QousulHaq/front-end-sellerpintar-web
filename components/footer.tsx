import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className='footer w-full bg-[rgba(37,99,235,0.86)] flex justify-center items-center h-[100px]'>
            <div className="footer-container flex gap-4">
                <Image src={"/sellerpintarweb-logo-white.svg"} width={133.4} height={24} alt='Company Logo White' draggable={false} />
                <span className='text-white text-base font-normal leading-6'>© 2025 Blog genzet. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer
