"use client"

import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import HeaderVar1 from '@/components/headers/HeaderVar-1';
import FeaturedListsingsVar1 from '@/components/featured-listings/FeaturedListsingsVar-1';
import OurServicesVar1 from '@/components/our-services/OurServicesVar-1';
import NeighbrhoodsVar1 from '@/components/neighbrhoods/NeighborhoodsVar-1';
import BlogsVar1 from '@/components/blogs/BlogsVar-1';

const HomePage = () => {

    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch<AppDispatch>();
    const [themeSett, setThemeSett] = useState<any | null>(null);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (!themeSett) {
        return (<div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
            <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
        </div>)
    }

    if (themeSett) {
        return (
            <div className="flex flex-col min-h-screen">
                <NavVar1 transparent={true} />
                <main className="w-full -mt-20">

                    {/**  ======================= Header Area Starts ====================== **/}
                    <HeaderVar1 />
                    {/**  ======================= Header Area Ends ====================== **/}

                    {/**  ======================= Featured Listsings Area Starts ====================== **/}
                    <FeaturedListsingsVar1 />
                    {/**  ======================= Featured Listsings Area Ends ====================== **/}

                    {/**  ======================= Our Services Area Starts ====================== **/}
                    <OurServicesVar1 />
                    {/**  ======================= Our Services Area Ends ====================== **/}

                    {/**  ======================= Neighbrhood Area Starts ====================== **/}
                    <NeighbrhoodsVar1 />
                    {/**  ======================= Neighbrhood Area Ends ====================== **/}

                    {/**  ======================= Blogs Area Starts ====================== **/}
                    <BlogsVar1 />
                    {/**  ======================= Blogs Area Ends ====================== **/}

                </main>
                <FooterVar1 />
            </div>
        )
    }
}

export default HomePage