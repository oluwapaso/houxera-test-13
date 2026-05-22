"use client"

import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import PropCardVar1 from '@/components/property-cards/PropCardVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const FavoritesPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 30; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;
    // let all_favs: React.JSX.Element[] = [];

    const [favorite_listings, setFavoriteFavs] = useState<any[]>([]);
    const [fav_fetched, setFavFetched] = useState(false);
    const [favoritesError, setFavoritesError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);
    const [all_favs, setAllFavs] = useState<React.JSX.Element[]>([]);

    const no_fav_added = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No favorites added yet
    </div>

    const LoadFavorites = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "user_uid": user.user_info?.user_uid,
            "size": page_size,
            "skip": curr_page - 1
        }

        const response = await window.MLS_Util.LoadFavoriteLitings(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setFavoriteFavs(response.data.favorites);
            setTotalRecords(response.data.total_records);
        } else {
            setFavoritesError(resp_message);
        }

        setFavFetched(true);

    }

    // if (Array.isArray(favorite_listings)) {

    //     // setFavoritesError("");
    //     if (total_records > 0) {

    //         const total_returned = favorite_listings.length;
    //         total_page = Math.ceil(total_records / page_size);

    //         if (total_records > 0 && total_returned > 0) {

    //             all_favs = favorite_listings.map((fav, index) => {
    //                 return <PropCardVar1 key={index} pro_info={fav} />
    //             });

    //         } else {
    //             all_favs[0] = no_fav_added;
    //         }

    //     } else {

    //         //Making sure request has been sent
    //         if (fav_fetched) {
    //             all_favs[0] = no_fav_added
    //         } else {
    //             all_favs[0] = <div className='w-full flex justify-center items-center min-h-60'>
    //                 <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
    //             </div>
    //         }

    //     }

    // } else {
    //     //Making sure request has been sent
    //     if (fav_fetched) {
    //         all_favs[0] = no_fav_added
    //     } else {
    //         all_favs[0] = <div className='w-full flex justify-center items-center min-h-60'>
    //             <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
    //         </div>
    //     }
    // }

    useEffect(() => {
        if (Array.isArray(favorite_listings)) {

            setFavoritesError("")
            if (total_records > 0) {

                const total_returned = favorite_listings.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllFavs(favorite_listings.map((fav, index) => {
                        return <PropCardVar1 key={index} pro_info={fav} />
                    }));
                } else {
                    setAllFavs(() => [no_fav_added])
                }

            } else {

                //Making sure request has been sent
                if (fav_fetched) {
                    setAllFavs(() => [no_fav_added])
                } else {
                    setAllFavs(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (fav_fetched) {
                setAllFavs(() => [no_fav_added])
            } else {
                setAllFavs(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>])
            }
        }
    }, [favorite_listings]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadFavorites();
        }
    }, [window.MLS_Util, searchParams]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (!user.isLogged) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh]">
                    <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                        You need to login to access this page.
                    </div>
                </main>

                <FooterVar1 />
            </div>
        )
    }

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                {/**  ======================= Header Area Starts ====================== 
                <header className="w-full h-[25dvh] bg-gray-100 relative">

                    <div data-has-bg="yes" className=" h-full flex flex-col justify-end pb-6"
                        style={{
                            backgroundSize: `cover`,
                            backgroundPosition: `center`,
                            backgroundRepeat: `none`,
                            backgroundImage: `url(${(themeSett.favorites_header_image && themeSett.favorites_header_image != "")
                                ? `../../${themeSett?.favorites_header_image}` : "../gradient-background.jpg"})`, //Remove ../../, the  ../../ is added for testing
                        }}>

                        <div className={`container mx-auto max-w-[1200px] px-3 xl:px-0 text-left relative z-20 flex flex-col`}>
                            <div className={`w-full font-medium text-white text-6xl`}>Favorite Favs</div>
                        </div>
                    </div>

                    <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-black/80 from-10%"></div>
                </header>
                {/**  ======================= Header Area Ends ====================== **/}

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1150px]">

                            <div className=' flex flex-col mb-4'>
                                <div className='font-semibold text-3xl'>Favorite Listsings</div>
                                <div className='font-medium text-lg'>Manage your favorite listings.</div>
                            </div>

                            {!fav_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(fav_fetched) &&
                                <div className='w-full'>
                                    {(favoritesError == "" && Array.isArray(favorite_listings)) &&
                                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                            {all_favs}
                                        </div>
                                    }

                                    {(favoritesError == "" && total_page > 0) &&
                                        <ReactivePagination totalPage={total_page} curr_page={curr_page} changeTigger={setCurrPage}
                                            trigger_loader={setFavFetched} url_path={`${themeSett.theme_prefix}/favorites?`} />
                                    }

                                    {favoritesError != "" &&
                                        <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                            {favoritesError}
                                        </div>
                                    }
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

export default FavoritesPage