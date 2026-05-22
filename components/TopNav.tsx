import Image from 'next/image'
import React from 'react'
import CustomLinkMain from './CustomLink'

const TopNav = ({ transparent = false, has_backdrop = false, }: { transparent?: boolean, has_backdrop?: boolean }) => {
    return (

        <header className={`w-full flex justify-between items-center px-8 py-4 z-50 
        ${transparent ? "bg-transparent" : "bg-white shadow-md"}`}>
            <CustomLinkMain href={`/`} className="font-medium text-2xl">
                <Image src={`${has_backdrop ? "/logo-light.png" : "/logo.png"}`} height={50} width={150} className="" alt="Nigeria MLS and IDX provider" />
            </CustomLinkMain>
            <div className={`flex items-center *:flex *:items-center *:justify-center *:px-6 *:py-3 *:border-b-4 *:border-b-transparent 
            *:cursor-pointer ${has_backdrop ? "text-white" : ""}`}>
                <CustomLinkMain href={`/`} className={`${has_backdrop ? "hover:border-b-white" : "hover:border-b-green-400"} 
                transition-all ease-in hover:delay-150`}>Home</CustomLinkMain>
                <CustomLinkMain href={`/about-rar`} className={`${has_backdrop ? "hover:border-b-white" : "hover:border-b-green-400"} 
                transition-all ease-in hover:delay-150`}>Abount RaR</CustomLinkMain>
                <CustomLinkMain href={`/contact-us`} className={`${has_backdrop ? "hover:border-b-white" : "hover:border-b-green-400"} 
                transition-all ease-in hover:delay-150`}>Contact Us</CustomLinkMain>
            </div>
        </header>
    )
}

export default TopNav