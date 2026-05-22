import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa6'

const Testimonials = ({ testi }: { testi: any }) => {
    return (
        <div>
            <div className="p-2 grid grid-cols-[2fr_50px_4fr] items-center space-x-4">
                <div className="">
                    <div className=" size-48 rounded-full border border-gray-300 p-3 relative"
                        style={{ boxShadow: `0 0 10px #cccccc` }}>
                        <Image src={testi.image} height={50} width={500} alt="Nigeria MLS and IDX provider"
                            className="size-full rounded-full" />
                        <div className=" absolute top-0 right-0 bg-white p-2 flex items-center justify-center size-14 rounded-full"
                            style={{ boxShadow: `1px 4px 20px -2px rgb(0 0 0 / 10%)` }}>
                            <FaQuoteLeft size={22} className=" text-icons-primary" />
                        </div>
                    </div>
                </div>
                <div className='h-full flex items-center justify-center'>
                    <div className='border-r border-gray-400 h-full'></div>
                </div>
                <div className="flex flex-col">
                    <div className=" leading-8 ">{testi.text}</div>

                    <div className="font-bold text-xl mt-3">{testi.name}</div>
                    <div className="pl-9 relative before:absolute before:left-0 before:w-8 
                          before:border-b before:border-gray-800 before:top-[50%]">{testi.position}: {testi.company}</div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials