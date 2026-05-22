"use client"

import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import BlogCardVar1 from '@/components/blog-cards/BlogCardVar-1';
import BlogCategoryLists from '@/components/blog-cards/BlogCategoryLists';
import BlogSearch from '@/components/blog-cards/BlogSearch';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const SearchBlogPostsPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 20; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;
    const keyword_params = searchParams?.get("keyword") as string || "";
    // let all_posts: React.JSX.Element[] = [];

    const [blog_posts, setBlogPosts] = useState<any[]>([]);
    const [post_fetched, setPostFetched] = useState(false);
    const [blogsError, setBlogsError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [all_posts, setAllPosts] = useState<React.JSX.Element[]>([]);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);
    const [keyword, setKeyword] = useState(keyword_params);

    const no_post_found = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No blog post found
    </div>

    const LoadBlogs = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "keyword": keyword,
            "size": page_size,
            "skip": curr_page - 1
        }

        const response = await window.MLS_Util.LoadBlogPosts(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setBlogPosts(response.data.all_posts);
            setTotalRecords(response.data.total_records);
        } else {
            setBlogsError(resp_message);
        }

        setPostFetched(true);

    }

    useEffect(() => {

        if (Array.isArray(blog_posts)) {

            setBlogsError("");
            if (total_records > 0) {

                const total_returned = blog_posts.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllPosts(blog_posts.map((post) => {
                        return <BlogCardVar1 key={post.draft_id} blog_post={post} />
                    }));
                } else {
                    setAllPosts(() => [no_post_found]);
                }

            } else {

                //Making sure request has been sent
                if (post_fetched) {
                    setAllPosts(() => [no_post_found]);
                } else {
                    setAllPosts(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (post_fetched) {
                setAllPosts(() => [no_post_found]);
            } else {
                setAllPosts(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>]);
            }
        }

    }, [blog_posts]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadBlogs();
        }
    }, [window.MLS_Util, searchParams]);


    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1150px]">

                            <div className=' flex flex-col mb-4'>
                                <div className='font-semibold text-3xl'>Search Results</div>
                            </div>

                            {!post_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(post_fetched) &&
                                <div className='w-full grid grid-cols-1 lg:grid-cols-6 gap-6 mt-0'>
                                    <div className='lg:col-span-4'>
                                        {(blogsError == "" && Array.isArray(blog_posts)) &&
                                            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                                                {all_posts}
                                            </div>
                                        }

                                        {(blogsError == "" && total_page > 0) &&
                                            <ReactivePagination totalPage={total_page} curr_page={curr_page}
                                                changeTigger={setCurrPage} trigger_loader={setPostFetched}
                                                url_path={`${themeSett.theme_prefix}/search-posts?keyword=${keyword}`} />
                                        }

                                        {blogsError != "" &&
                                            <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                                {blogsError}
                                            </div>
                                        }
                                    </div>

                                    <div className='hidden lg:block lg:col-span-2'>

                                        <BlogSearch keyword={keyword} setKeyword={setKeyword} setBlogPostLoaded={setPostFetched} />

                                        <div className='w-full'>
                                            <BlogCategoryLists />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </main>

                <FooterVar1 />
            </div>
        )
    }
}

export default SearchBlogPostsPage