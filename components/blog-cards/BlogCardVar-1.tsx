'use client';

import { RootState } from '@/app/GlobalRedux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaArrowRightLong, FaTag } from 'react-icons/fa6';
import { BiCalendar, BiTag } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';
import moment from 'moment';
import CustomLinkMain from '../CustomLink';

const BlogCardVar1 = ({ blog_post, is_theme = false }: { blog_post: any, is_theme?: boolean }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    //../ in `../${blog_post.header_image_large}` is for testing, remocve this in production
    const header_image_large = blog_post.header_image_large ? `../${blog_post.header_image_large}` : "../no-image-found.jpg"
    if (themeSett && themeSett != null) {
        return (
            <CustomLinkMain href={`${themeSett.theme_prefix}/blog-post/${blog_post.slug}`} is_theme={is_theme}
                className={`shadow-lg z-10 bg-center bg-cover bg-no-repeat border-2 border-gray-200 cursor-pointer rounded-md 
                overflow-hidden hover:shadow-2xl p-1.5 bg-white `}>
                <div className={`h-[250px] relative z-10 bg-center bg-cover bg-no-repeat cursor-pointer`}
                    style={{ backgroundImage: `url('${header_image_large}')` }}>
                </div>

                <div className=' w-full flex items-center px-2 space-x-3 mt-3 text-sm font-medium text-gray-600 '>
                    <div className=' flex items-center'>
                        <BiCalendar size={15} className='mr-1.5' />
                        <span className=' line-clamp-1 flex-nowrap'>{moment(blog_post.last_updated_on).format("Do MMM, YYYY")}</span>
                    </div>

                    <div className=' flex items-center'>
                        <BsTags size={15} className='mr-1.5 shrink-0' />
                        <span className=' line-clamp-1 flex-nowrap'>{blog_post.category_name}</span>
                    </div>
                </div>

                <div className={`text-${themeSett.primary_color} px-2 font-semibold text-base mt-1 line-clamp-2`}>
                    {blog_post.title}
                </div>

                <div className={`text-gray-600 px-2 text-sm mt-1 line-clamp-4`}>
                    {blog_post.summary}
                </div>

                <div className={`px-2 mt-1`}>
                    <div className={`w-fit px-4 py-1 mt-1 text-sm bg-white border-1 border-${themeSett.primary_color} flex 
                    items-center justify-center hover:bg-${themeSett.primary_color} text-${themeSett.primary_color} 
                    hover:text-white cursor-pointer rounded space-x-2.5 hover:shadow-2xl`}>
                        <span>Read Article</span>
                        <FaArrowRightLong size={18} />
                    </div>
                </div>
            </CustomLinkMain>
        )
    }
}

export default BlogCardVar1