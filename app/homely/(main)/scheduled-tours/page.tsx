"use client"

import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { updateDataCounts } from '@/app/GlobalRedux/user/userSlice';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import PropCardVar1 from '@/components/property-cards/PropCardVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import StatusFilter from '@/components/tours/StatusFilter';
import TourCardVar1 from '@/components/tours/TourCardVar-1';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const ScheduledToursPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 20; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;
    const status_param = searchParams?.get("status") as string || "Upcoming";

    const [scheduled_tours, setScheduledTours] = useState<any[]>([]);
    const [tour_fetched, setTourFetched] = useState(false);
    const [toursError, setTourError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [status, setStatus] = useState(status_param);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);
    const [all_tours, setAllTours] = useState<React.JSX.Element[]>([]);
    const [is_menu_shown, setIsMenuShown] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [refresh_page, setRefreshPage] = useState(false);

    const no_tour_added = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No tour scheduled yet
    </div>

    const LoadTours = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "user_uid": user.user_info?.user_uid,
            "status": status,
            "size": page_size,
            "skip": curr_page - 1
        }

        const response = await window.MLS_Util.LoadScheduledTours(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setScheduledTours(response.data.tours);
            setTotalRecords(response.data.total_records);

            if (status == "Upcoming") {
                dispatch(updateDataCounts({ "upcoming_tours": response.data.total_records }));
            }

        } else {
            setTourError(resp_message);
        }

        setTourFetched(true);

    }

    const TriggerStatus = (new_status: string) => {
        console.log("new_status != status_param", new_status != status_param, new_status, status_param)
        if (new_status != status_param) {
            setStatus(new_status); // Update the type state to trigger useEffect

            let link = `${themeSett.theme_prefix}/scheduled-tours?status=${new_status}&page=1`;

            setTourFetched(false);
            setRefreshPage(true);
            window.history.replaceState({}, '', link); // Use pushState to change URL without reloading
        }
    }

    useEffect(() => {
        if (Array.isArray(scheduled_tours)) {

            setTourError("")
            if (total_records > 0) {

                const total_returned = scheduled_tours.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllTours(scheduled_tours.map((tour, index) => {
                        return <TourCardVar1 key={index} tour_info={tour} />
                    }));
                } else {
                    setAllTours(() => [no_tour_added])
                }

            } else {

                //Making sure request has been sent
                if (tour_fetched) {
                    setAllTours(() => [no_tour_added])
                } else {
                    setAllTours(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (tour_fetched) {
                setAllTours(() => [no_tour_added])
            } else {
                setAllTours(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>])
            }
        }
    }, [scheduled_tours]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadTours();
        }
    }, [window.MLS_Util, searchParams]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    useEffect(() => {
        if (refresh_page) {
            LoadTours();
        }
    }, [refresh_page]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuShown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

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

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1150px]">

                            <div className=' flex justify-between mb-4'>
                                <div className=' flex flex-col'>
                                    <div className='font-semibold text-3xl'>Scheduled Tours</div>
                                    <div className='font-medium text-lg'>Manage your upcoming/past property tour.</div>
                                </div>

                                <div className='ml-2 flex items-center'>
                                    <div className='flex items-center group px-3 bg-white border border-zinc-900 cursor-pointer 
                                    h-[40px] rounded min-w-[100px] hover:shadow-xl *:font-medium relative mr-2'
                                        ref={menuRef} onClick={() => setIsMenuShown(true)}>
                                        <div className='flex justify-between w-full items-center text-base'>
                                            <span><span className='font-semibold'>Status:</span> {status}</span>
                                            <span className={`${is_menu_shown && "rotate-180"} transition-all duration-300`}>
                                                <MdOutlineKeyboardArrowDown size={20} />
                                            </span>
                                        </div>

                                        {is_menu_shown &&
                                            <div className='w-[240px] absolute top-[104%] right-0 shadow-2xl rounded-md bg-white z-30'>
                                                <div className='w-full flex flex-col max-h-[400px] font-normal text-base'>
                                                    <StatusFilter onFilterUpdates={TriggerStatus} curr_value={status} activeClass="bg-primary text-white"
                                                        selectClass="w-full py-4 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50" />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            {!tour_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(tour_fetched) &&
                                <div className='w-full'>
                                    {(toursError == "" && Array.isArray(scheduled_tours)) &&
                                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                                            {all_tours}
                                        </div>
                                    }

                                    {(toursError == "" && total_page > 0) &&
                                        <ReactivePagination totalPage={total_page} curr_page={curr_page} changeTigger={setCurrPage}
                                            trigger_loader={setTourFetched} url_path={`${themeSett.theme_prefix}/scheduled-tours?status=${status}&`} />
                                    }

                                    {toursError != "" &&
                                        <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                            {toursError}
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

export default ScheduledToursPage