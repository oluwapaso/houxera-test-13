"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'

const ReactivePagination = ({ totalPage, curr_page, url_path, scroll_to, is_path = true, on_click, changeTigger, trigger_loader }:
    {
        totalPage: number, curr_page: number, url_path: string, scroll_to?: string, is_path?: boolean,
        on_click?: (page_num: any) => void, changeTigger: React.Dispatch<React.SetStateAction<number>>,
        trigger_loader: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const active_link = '!bg-red-400 text-white rounded-full drop-shadow-xl hover:rounded-none'
    const prev_class = 'cursor-pointer mr-2 border-2 border-white hover:border-primary p-1'
    const next_class = 'cursor-pointer ml-2 border-2 border-white hover:border-primary p-1'
    const router = useRouter();
    const [canScroll, setCanScroll] = useState(false);

    const handleClick = (loc: string, new_page_num: number) => {
        setCanScroll(true);
        if (curr_page != new_page_num) {
            trigger_loader(false);
        }
        // router.push(loc, { scroll: false });
        history.pushState({}, "", loc);
        changeTigger(new_page_num);
    }

    useEffect(() => {
        // Scroll to the target component when the component mounts
        if (canScroll) {
            const element = document.getElementById(scroll_to as string);
            if (element) {

                const rect = element.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const finalOffset = rect.top + scrollTop - 180;

                window.scrollTo({
                    top: finalOffset,
                    behavior: 'smooth'
                });

            }
        }
    }, [curr_page]);

    return (
        <div className='w-full text-cent flex justify-end items-center mt-5'>
            {curr_page > 1 ? (
                <div onClick={() => {
                    if (is_path) {
                        handleClick(`${url_path}page=${curr_page - 1}`, curr_page - 1)
                    } else {
                        if (on_click) {
                            on_click(curr_page - 1)
                        }
                    }
                }} className={prev_class}>
                    <FaArrowLeftLong size={25} />
                </div>
            ) : (
                <div className={`${prev_class} !cursor-not-allowed !opacity-50`}>
                    <FaArrowLeftLong size={25} />
                </div>
            )}

            {[...Array(totalPage)].map((_elem, index) => {
                // Show first link
                if (index === 0) {
                    return (
                        <div key={index} onClick={() => {
                            if (is_path) {
                                handleClick(`${url_path}page=${index + 1}`, index + 1)
                            } else {
                                if (on_click) {
                                    on_click(index + 1)
                                }
                            }
                        }} className={`size-10 flex items-center 
                        justify-center font-medium bg-slate-200 cursor-pointer hover:bg-sky-400 hover:drop-shadow-xl mx-1 hover:scale-125 
                        transition-all duration-300 ${curr_page === index + 1 ? active_link : null}`}>{index + 1}
                        </div>
                    );
                }

                // Show ellipsis before the last link and after the first link
                if ((index === 1 && curr_page > 3) || (index === totalPage - 2 && curr_page < totalPage - 2)) {
                    return (
                        <div key={index} className="mx-1">...</div>
                    );
                }

                // Show current page link and nearby links
                if (index === totalPage - 1 || (index >= curr_page - 3 && index <= curr_page + 1)) {
                    return (
                        <div key={index} onClick={() => {
                            if (is_path) {
                                handleClick(`${url_path}page=${index + 1}`, index + 1)
                            } else {
                                if (on_click) {
                                    on_click(index + 1)
                                }
                            }
                        }} className={`size-10 flex items-center 
                        justify-center font-medium bg-slate-200 cursor-pointer hover:bg-sky-400 hover:drop-shadow-xl mx-1 hover:scale-125 
                        transition-all duration-300 ${curr_page === index + 1 ? active_link : null}`}>{index + 1}
                        </div>
                    );
                }

                return null; // Hide other links
            })}

            {curr_page < totalPage ? (
                <div onClick={() => {
                    if (is_path) {
                        handleClick(`${url_path}page=${curr_page + 1}`, curr_page + 1)
                    } else {
                        if (on_click) {
                            on_click(curr_page + 1)
                        }
                    }
                }} className={next_class}>
                    <FaArrowRightLong size={25} />
                </div>
            ) : (
                <div className={`${next_class} !cursor-not-allowed !opacity-50`}>
                    <FaArrowRightLong size={25} />
                </div>
            )}
        </div>
    );


}


export default ReactivePagination