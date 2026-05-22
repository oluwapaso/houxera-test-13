"use client"

import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import NeighCardVar1 from '@/components/neighborhood-cards/NeighCardVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const NeighborhoodsPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 20; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;

    const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
    const [neighborhood_fetched, setNeighborhoodFetched] = useState(false);
    const [neighborhoodsError, setNeighborhoodsError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [all_neighborhoods, setAllNeighborhoods] = useState<React.JSX.Element[]>([]);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);

    const no_neighborhood_added = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No neighborhood added yet
    </div>

    const LoadNeighborhoods = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "size": page_size,
            "skip": curr_page - 1,
            "fields": "neighborhood_uid,excerpt,header_image_large,header_image_small,insight_type,slug,title,views,comments"
        }

        const response = await window.MLS_Util.LoadNeighborhoods(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setNeighborhoods(response.data.all_neighborhoods);
            setTotalRecords(response.data.total_records);
        } else {
            setNeighborhoodsError(resp_message);
        }

        setNeighborhoodFetched(true);

    }

    useEffect(() => {

        if (Array.isArray(neighborhoods)) {

            setNeighborhoodsError("");
            if (total_records > 0) {

                const total_returned = neighborhoods.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllNeighborhoods(neighborhoods.map((neighborhood, index) => {
                        return <NeighCardVar1 key={index} neigh_info={neighborhood} />
                    }));
                } else {
                    setAllNeighborhoods(() => [no_neighborhood_added]);
                }

            } else {

                //Making sure request has been sent
                if (neighborhood_fetched) {
                    setAllNeighborhoods(() => [no_neighborhood_added]);
                } else {
                    setAllNeighborhoods(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (neighborhood_fetched) {
                setAllNeighborhoods(() => [no_neighborhood_added]);
            } else {
                setAllNeighborhoods(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>]);
            }
        }

    }, [neighborhoods]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadNeighborhoods();
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

                {/**  ======================= Header Area Starts ====================== **/}
                <header className="w-full h-[25dvh] bg-gray-100 relative">

                    <div data-has-bg="yes" className=" h-full flex flex-col justify-end pb-6"
                        style={{
                            backgroundSize: `cover`,
                            backgroundPosition: `center`,
                            backgroundRepeat: `none`,
                            backgroundImage: `url(${(themeSett.neighborhoods_header_image && themeSett.neighborhoods_header_image != "")
                                ? `../../${themeSett?.neighborhoods_header_image}` : "../gradient-background.jpg"})`, //Remove ../../, the  ../../ is added for testing
                        }}>

                        <div className={`container mx-auto max-w-[1200px] px-3 xl:px-0 text-left relative z-20 flex flex-col`}>
                            <div className={`w-full font-medium text-white text-4xl`}>Neighborhoods</div>
                        </div>
                    </div>

                    <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-black/80 from-10%"></div>
                </header>
                {/**  ======================= Header Area Ends ====================== **/}

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1200px]">

                            {!neighborhood_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(neighborhood_fetched) &&
                                <div className='w-full'>
                                    {(neighborhoodsError == "" && Array.isArray(neighborhoods)) &&
                                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                            {all_neighborhoods}
                                        </div>
                                    }

                                    {(neighborhoodsError == "" && total_page > 0) &&
                                        <ReactivePagination totalPage={total_page} curr_page={curr_page}
                                            changeTigger={setCurrPage} trigger_loader={setNeighborhoodFetched}
                                            url_path={`${themeSett.theme_prefix}/neighborhoods?`} />
                                    }

                                    {neighborhoodsError != "" &&
                                        <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                            {neighborhoodsError}
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

export default NeighborhoodsPage