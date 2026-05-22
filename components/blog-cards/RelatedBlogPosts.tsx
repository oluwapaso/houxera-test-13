
"use client"
import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import CustomLinkMain from '../CustomLink';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import { FaArrowRightLong } from 'react-icons/fa6';

const RelatedBlogPosts = ({ category_name, post_uid }: { category_name: string, post_uid: string }) => {

    const [posts, setposts] = useState<any[]>([]);
    const [postsLoaded, setpostsLoaded] = useState<boolean>(false);
    const [postsError, setPostsError] = useState("");
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const FetchBlogPostsCats = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "category_name": category_name,
            "post_uid": post_uid,
        }

        const response = await window.MLS_Util.LoadRelatedBlogPosts(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setposts(response.data.related_posts);
        } else {
            setPostsError(resp_message);
        }

        setpostsLoaded(true);

    }

    useEffect(() => {
        FetchBlogPostsCats();
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    return (
        <div className='w-full mb-5'>
            <div className='w-full font-play-fair-display text-xl'>Related Blog Posts</div>

            {!postsLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
            </div>}

            {(postsLoaded && posts) &&
                <ul className='w-full *:border-b *:border-gray-300 *:cursor-pointer *:px-1 *:py-3'>
                    {posts.map((post) => {
                        //../../ in `../${blog_post.header_image_large}` is for testing, remove this in production
                        const header_image_large = post.header_image_large ? `../../${post.header_image_large}` : "../../no-image-found.jpg"
                        return (<CustomLinkMain href={`${themeSett.theme_prefix}/blog-post/${post.slug}`} key={post.post_uid}
                            className={`w-full grid grid-cols-10 gap-2 text-base font-normal hover:bg-gray-50`}>
                            <div className={` col-span-4 h-[85px] relative z-10 bg-center bg-cover bg-no-repeat cursor-pointer`}
                                style={{ backgroundImage: `url('${header_image_large}')` }}>
                            </div>
                            <div className=' col-span-6 flex flex-col'>
                                <span className='ml-1 flex-grow font-semibold text-sm'>{post.title}</span>
                                <span className='ml-1 flex-grow line-clamp-4 text-sm'>{post.summary}</span>

                                <div className={`px-2 mt-1 mb-2`}>
                                    <div className={`w-fit px-4 py-1 mt-1 text-sm bg-white border-1 border-${themeSett.primary_color}-600 flex 
                                    items-center justify-center hover:bg-${themeSett.primary_color}-600 text-${themeSett.primary_color}-600 
                                    hover:text-white cursor-pointer rounded space-x-2.5 hover:shadow-2xl`}>
                                        <span>Read Article</span>
                                        <FaArrowRightLong size={18} />
                                    </div>
                                </div>
                            </div>
                        </CustomLinkMain>)
                    })
                    }
                </ul>
            }

            {(postsLoaded && postsError != "") &&
                <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                    {postsError}
                </div>
            }
        </div>
    )
}

export default RelatedBlogPosts