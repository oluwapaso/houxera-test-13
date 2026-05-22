'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { BsGear } from 'react-icons/bs';
import CustomLinkMain from '../CustomLink';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Helpers } from '@/_lib/helper';
import NeighCardVar1 from '../neighborhood-cards/NeighCardVar-1';
import BlogCardVar1 from '../blog-cards/BlogCardVar-1';

const helpers = new Helpers();
const BlogsVar1 = ({ is_theme = false, size = 4, raw_data = {} }: { is_theme?: boolean, size?: number, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [blogs, setBlogs] = useState<any[]>([]);
    const [blogsLoaded, setBlogsLoaded] = useState<boolean>(false);
    const [blogsError, setBlogsError] = useState("");
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "our_services",
                    "type": "section",
                    "component": "OurServicesVar1",
                    ...raw_data,
                }
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

    const handleHover = () => {
        setSectionHover(true);
    }

    const handleMouseExist = () => {
        setSectionHover(false);
    }


    const LoadBlogs = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "size": size,
            "skip": "0",
            "fields": "*"
        }

        const response = await window.MLS_Util.LoadBlogPosts(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setBlogs(response.data.all_posts);
        } else {
            setBlogsError(resp_message)
        }

        setBlogsLoaded(true);

    }

    useEffect(() => {
        LoadBlogs();
    }, [window.MLS_Util]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett) {
        return (
            <section className="w-full py-20 flex justify-center bg-gray-100 relative" data-show-blogs="Yes">
                <div className={`container flex flex-col 
                    ${(is_theme && sectionHover) ? "p-[10px] border-2 border-sky-800 transition-all duration-300" : null}`}>

                    <div className=' flex flex-col'>
                        <div className='font-semibold text-3xl flex items-center justify-between'>
                            <div>{raw_data.header || "Latest Real Estate News"}</div>
                            {raw_data?.show_more == "Yes" &&
                                <CustomLinkMain href={`${themeSett.theme_prefix}/blog-posts?page=1`} is_theme={is_theme}
                                    className={`px-7 py-4 text-sm bg-white border-2 border-${themeSett.primary_color} flex 
                                    items-center justify-center hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)} 
                                    text-${themeSett.primary_color} hover:text-white cursor-pointer rounded space-x-2.5 
                                    hover:shadow-2xl`}>
                                    <span>{raw_data?.show_more_text || 'Read Our Blog'}</span>
                                    <FaArrowRightLong size={18} />
                                </CustomLinkMain>
                            }
                        </div>
                        <div className='font-medium text-lg'>
                            {raw_data.sub_header || "Stay up to date with the latest happenings in the real estate market."}
                        </div>
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 lg:gap-x-6 xl:gap-x-6 mt-6'>
                        {!blogsLoaded && <div className='col-span-full h-[250px] flex items-center justify-center'>
                            <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                        </div>}

                        {(blogsLoaded && blogsError != "") &&
                            <div className='col-span-full h-[250px text-red-600 flex items-center justify-center'>
                                {blogsError}
                            </div>
                        }

                        {(blogsLoaded && Array.isArray(blogs) && blogs.length > 0) &&
                            (blogs.map((blog_post, index) => {
                                return <BlogCardVar1 key={index} blog_post={blog_post} is_theme={is_theme} />
                            }))
                        }
                    </div>

                </div>

                {is_theme && (
                    <div id='editor_settings' className=' absolute z-[1000] right-1.5 top-2 bg-gray-200 text-gray-800 flex items-center 
                        justify-center p-2 rounded cursor-pointer hover:shadow-2xl'
                        onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                        <BsGear size={17} />
                    </div>
                )}
            </section>
        )
    }
}


export default BlogsVar1